using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _24SevenOfficeForum.Models;
using _24SevenOfficeForum.Utility;

namespace _24SevenOfficeForum.Controllers
{
	[Produces("application/json")]
	[Route("api/Questions")]

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
		public async Task<IEnumerable<Question>> Get(string searchString, int? page, string sortOrder, bool ascending)
		{
			var sort = _context.Question.AsQueryable();
			if (sortOrder == null)
			{
				sortOrder = "created_desc";
			}
			if (ascending)
			{
				if (sortOrder == "header_asc") sort = sort.OrderBy(s => s.Header);
				else if (sortOrder == "created_asc") sort = sort.OrderBy(s => s.QuestionCreated);
			}
			else
			{
				if (sortOrder == "header_desc") sort = sort.OrderByDescending(s => s.Header);
				else if (sortOrder == "created_desc") sort = sort.OrderByDescending(s => s.QuestionCreated);
			}

			if (page == null) page = 1;
			int pageSize = 10;
			int skipRows = (page.Value - 1) * pageSize;
			var questions = await _context.Question
				.Skip(skipRows)
				.Take(pageSize)
				.Include(x => x.Answer).OrderBy(s => s.QuestionCreated).AsNoTracking().ToListAsync();

			//This releases the self reference between question and answer
			Cleaner.CleanQuestions(questions);

			return questions;
		}

		///<Summary>
		/// Gets the Question by Id
		///</Summary>
		[HttpGet("{catId}")]
		public async Task<IEnumerable<Question>> GetQuestions([FromRoute] int catId)
		{
			var questions = await _context.Question.Where(x => x.CategoryId == catId).Include(x => x.Answer).ToListAsync();

			//This releases the self reference between question and answer
			Cleaner.CleanQuestions(questions);

			return questions;
		}

		[HttpGet("{catId}/{qId}")]
		public async Task<Question> GetQuestion([FromRoute] int catId, int qId)
		{
			var question = await _context.Question.Include(x => x.Answer)
				.Where(x => x.CategoryId == catId && x.Id == qId).FirstOrDefaultAsync();

			return question;
		}

		// PUT: api/Questions/5
		[HttpPut("{id}")]
		public async Task<IActionResult> PutQuestion([FromRoute] int id, [FromBody] Question question)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			if (id != question.Id)
			{
				return BadRequest();
			}

			_context.Entry(question).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!QuestionExists(id))
				{
					return NotFound();
				}
				else
				{
					throw;
				}
			}

			return NoContent();
		}
		// POST: api/Questions
		[HttpPost]
		public async Task<IActionResult> PostQuestion([FromBody] Question question)
		{
			_context.Question.Add(question);
			_context.SaveChanges();


			return Ok(question);

			//if (!ModelState.IsValid)
			//{
			//    return BadRequest(ModelState);
			//}
			//
			//_context.Question.Add(question);
			//try
			//{
			//    await _context.SaveChangesAsync();
			//}
			//catch (DbUpdateException)
			//{
			//    if (QuestionExists(question.Id))
			//    {
			//        return new StatusCodeResult(StatusCodes.Status409Conflict);
			//    }
			//    else
			//    {
			//        throw;
			//    }
			//}
			//
			//return CreatedAtAction("GetQuestion", new { id = question.Id });
		}

		// DELETE: api/Questions/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteQuestion([FromRoute] int id)
		{
			if (!ModelState.IsValid)
			{
				return BadRequest(ModelState);
			}

			var question = await _context.Question.SingleOrDefaultAsync(m => m.Id == id);
			if (question == null)
			{
				return NotFound();
			}

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
		public async Task <IActionResult> PatchQuestion(int Id, [FromBody] PatchQuestion model)
		{
			var question = await _context.Question.FirstOrDefaultAsync(e => e.Id == Id);
			if (question == null)
				return BadRequest("Kan ikke oppdatere spørsmålet");
			else
			{
				if (model.Header != null) question.Header = model.Header;

				if (model.Body != null) question.Body = model.Body;

				await _context.SaveChangesAsync();
			}
			return Ok();
		}
	}
}