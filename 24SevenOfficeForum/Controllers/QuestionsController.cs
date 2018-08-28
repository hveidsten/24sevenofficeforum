using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _24SevenOfficeForum.Models;
using _24SevenOfficeForum.Models.ViewModels;

namespace _24SevenOfficeForum.Controllers
{
	[Produces("application/json")]
	[Route("api/[controller]")]


	[EnableCors("CorsPolicy")]
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
		//[Authorize("read:questions")]
		public async Task<IEnumerable<QuestionViewModel>>GetQuestions(int? page, string sortOrder, int? categoryId)
		{
			var sort = categoryId != null ? _context.Question.Where(q => q.CategoryId == categoryId).AsQueryable(): _context.Question.AsQueryable();
			if (sortOrder == "created_asc") sort = sort.OrderBy(s => s.QuestionCreated);
				else if (sortOrder == "vote_asc") sort = sort.OrderBy(s => s.Upvote);
				else if (sortOrder == "vote_desc") sort = sort.OrderByDescending(s => s.Upvote);
				else if (sortOrder == "count_asc") sort = sort.OrderBy(s => s.AnswerCount);
				else if (sortOrder == "count_desc") sort = sort.OrderByDescending(s => s.AnswerCount);
				else  sort = sort.OrderByDescending(s => s.QuestionCreated);

			if (page == null) page = 1;
			int pageSize = 10;
			int skipRows = (page.Value - 1) * pageSize;
			var questions = await sort
				.Skip(skipRows)
				.Take(pageSize)
				.AsNoTracking()
				.Select(q => new QuestionViewModel()
				{
					Id = q.Id,
					Upvote = q.Upvote,
					Header = q.Header,
					Body = q.Body,
					CategoryId = q.CategoryId,
					QuestionCreated = q.QuestionCreated,
					AnswerCount = q.AnswerCount,
				})
				.ToListAsync();


			//This releases the self reference between question and answer
			//Cleaner.CleanQuestions(questions);

			return questions;
		}

		[HttpGet("{qId}")]
		//{catId}/
		public async Task<QuestionViewModel> GetQuestion([FromRoute] int catId, int qId)
		{
			var question = await _context.Question
				.Select(q => new QuestionViewModel()
				{
					Id = q.Id,
					Upvote = q.Upvote,
					Header = q.Header,
					Body = q.Body,
					CategoryId = q.CategoryId,
					QuestionCreated = q.QuestionCreated,
					AnswerCount = q.AnswerCount,
				})
				.Where(x =>  x.Id == qId).FirstOrDefaultAsync();
			return question;
		}

		// PUT: api/Questions/
		[HttpPut("{id}")]
		public async Task<IActionResult> PutQuestion([FromRoute] int id, [FromBody] Question model)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			if (id != model.Id)
				return BadRequest();

			_context.Entry(model).State = EntityState.Modified;

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
		public async Task<IActionResult> PostQuestion([FromBody] Question model)
		{
			var setdate = model;

			DateTime localDate = Convert.ToDateTime(DateTime.Now.ToString("G"));
			setdate.QuestionCreated = localDate;
			if (model != null)
			{
				_context.Question.Add(setdate);
				await _context.SaveChangesAsync();

				return Ok(setdate);

			}

			return BadRequest();
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
		public async Task<IActionResult> PatchQuestion(int id, [FromBody] PatchQuestion model)
		{

			var question = await _context.Question.FirstOrDefaultAsync(e => e.Id == id);
			if (question == null)
				return BadRequest("Could not update question");
			if (model.Header != null) question.Header = model.Header;

			if (model.Body != null) question.Body = model.Body;

			if (model.UpVote != 0) question.Upvote = model.UpVote;

			if (model.CategoryId != 0) question.CategoryId = model.CategoryId;

			await _context.SaveChangesAsync();
			return Ok(question);
		}
	}
}