using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _24SevenOfficeForum.Models;
using _24SevenOfficeForum.Utility;

namespace _24SevenOfficeForum.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]")]

	public class QuestionsController : Controller
	{
		private readonly _24hOfficeforumContext _context;

		///<Summary>
		///</Summary>
		public QuestionsController(_24hOfficeforumContext context)
		{
			_context = context;
		}

		///<Summary>
		/// Gets the Question, Sorts it and paging it
		///</Summary>
		// GET: api/Questions
		[HttpGet]
		//[Route("private-scoped")]
		//[Authorize("read:questions")]
		public async Task<IEnumerable<Question>> GetQuestions(int? page, string sortOrder, int? categoryId)
		{
			var sort = categoryId != null ? _context.Question.Where(q => q.CategoryId == categoryId).AsQueryable() : _context.Question.AsQueryable();
			if (sortOrder == "created_asc") sort = sort.OrderBy(s => s.QuestionCreated);
				else if (sortOrder == "vote_asc") sort = sort.OrderBy(s => s.Upvote);
				else if (sortOrder == "vote_desc") sort = sort.OrderByDescending(s => s.Upvote);
				else  sort = sort.OrderByDescending(s => s.QuestionCreated);

			if (page == null) page = 1;
			int pageSize = 10;
			int skipRows = (page.Value - 1) * pageSize;
			var questions = await sort
				.Skip(skipRows)
				.Take(pageSize)
				.AsNoTracking().ToListAsync();

			//This releases the self reference between question and answer
			Cleaner.CleanQuestions(questions);

			return questions;
		}

		[HttpGet("{qId}")]
		//{catId}/
		public async Task<Question> GetQuestion([FromRoute] int catId, int qId)
		{
			var question = await _context.Question
				.Where(x =>  x.Id == qId).FirstOrDefaultAsync();
			return question;
		}

		// PUT: api/Questions/5
		[HttpPut("{id}")]
		public async Task<IActionResult> PutQuestion([FromRoute] int id, [FromBody] Question question)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			if (id != question.Id)
				return BadRequest();

			_context.Entry(question).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!QuestionExists(id))
					return NotFound();
				throw;
			}

			return NoContent();
		}
		// POST: api/Questions
		[HttpPost]
		public async Task<IActionResult> PostQuestion([FromBody] Question question)
		{
			_context.Question.Add(question);
			await _context.SaveChangesAsync();

			return Ok(question);
		}

		// DELETE: api/Questions/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteQuestion([FromRoute] int id)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var question = await _context.Question.SingleOrDefaultAsync(m => m.Id == id);
			if (question == null)
				return NotFound();

			_context.Question.Remove(question);
			await _context.SaveChangesAsync();

			return Ok(question);
		}

		private bool QuestionExists(int id)
		{
			return _context.Question.Any(e => e.Id == id);
		}

		// PATCH: api/Queistions/5
		[HttpPatch("{id}")]
		//[EnableCors("AllowAll")]
		public async Task<IActionResult> PatchQuestion(int id, [FromBody] PatchQuestion model)
		{
			var question = await _context.Question.FirstOrDefaultAsync(e => e.Id == id);
			if (question == null)
				return BadRequest("Could not update question");
			if (model.Header != null) question.Header = model.Header;

			if (model.Body != null) question.Body = model.Body;

			if (model.UpVote != 0) question.Upvote = model.UpVote;

			await _context.SaveChangesAsync();
			return Ok(question);
		}
	}
}