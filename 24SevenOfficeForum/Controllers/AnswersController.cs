using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _24SevenOfficeForum.Models;
using _24SevenOfficeForum.Models.ViewModels;

namespace _24SevenOfficeForum.Controllers
{
	[Produces("application/json")]
	[Route("api/Answers")]

	[EnableCors("CorsPolicy")]
	public class AnswersController : Controller
	{
		private readonly _24hOfficeforumContext _context;

		public AnswersController(_24hOfficeforumContext context)
		{
			_context = context;
		}

		// GET: api/Answers
		[HttpGet]
		public async Task<List<AnswerViewModel>> GetAnswers(int? page, string sortOrder, int questionId)
		{
			var sort = questionId != 0 ? _context.Answer.Where(q => q.QuestionId == questionId)
				.AsQueryable() : _context.Answer.AsQueryable();

			if (sortOrder == "created_asc") sort = sort.OrderBy(x => x.AnswerCreated);
			else if (sortOrder == "vote_asc") sort = sort.OrderBy(x => x.Upvote);
			else if (sortOrder == "vote_desc") sort = sort.OrderByDescending(x => x.Upvote);
			else sort = sort.OrderByDescending(x => x.AnswerCreated);

			if (page == null) page = 1;
			int pageSize = 10;
			int skipRows = (page.Value - 1) * pageSize;
			var answers = await sort
				.Skip(skipRows)
				.Take(pageSize)
				.AsNoTracking()
				.Select(a => new AnswerViewModel()
				{
					Id = a.Id,
					Upvote = a.Upvote,
					Body = a.Body,
					QuestionId = a.QuestionId,
					AnswerCreated = a.AnswerCreated,
					FirstName = a.User.FirstName,
					LastName = a.User.LastName,
					UserId = a.User.Id
				})
				.ToListAsync();

			return answers;
		}

		// GET: api/Answers/5
		[HttpGet("{id}")]

		public async Task<AnswerViewModel> GetAnswer([FromRoute] int id)
		{
			var answer = await _context.Answer
				.Select(a => new AnswerViewModel()
				{
					Id = a.Id,
					Upvote = a.Upvote,
					Body = a.Body,
					QuestionId = a.QuestionId,
					AnswerCreated = a.AnswerCreated,
					FirstName = a.User.FirstName,
					LastName = a.User.LastName,
					UserId = a.User.Id
				})
				.Where(m => m.Id == id).SingleOrDefaultAsync();

			return answer;
		}

		// PUT: api/Answers/5
		[HttpPut("{id}")]
		public async Task<IActionResult> PutAnswer([FromRoute] int id, [FromBody] Answer answer)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			if (id != answer.Id)
				return BadRequest();

			_context.Entry(answer).State = EntityState.Modified;

			try
			{
				await _context.SaveChangesAsync();
			}
			catch (DbUpdateConcurrencyException)
			{
				if (!AnswerExists(id))
					return NotFound();
				throw;
			}

			return NoContent();
		}

		// POST: api/Answers
		[HttpPost]
		public async Task<IActionResult> PostAnswer([FromBody] Answer model)
		{
			var setdate = model;

			DateTime localdate = Convert.ToDateTime(DateTime.Now.ToString("f"));
			setdate.AnswerCreated = localdate;
			if (model != null)
			{
				_context.Answer.Add(setdate);
				_context.Question.FirstOrDefault(q => q.Id == model.QuestionId).AnswerCount += 1;

				await _context.SaveChangesAsync();

				return Ok(setdate);
			}
			return BadRequest();
		}

		// DELETE: api/Answers/5
		[HttpDelete("{id}")]
		public async Task<IActionResult> DeleteAnswer([FromRoute] int id)
		{
			if (!ModelState.IsValid)
				return BadRequest(ModelState);

			var answer = await _context.Answer.SingleOrDefaultAsync(m => m.Id == id);
			if (answer == null)
				return NotFound();

			_context.Answer.Remove(answer);
			_context.Question.FirstOrDefault(q => q.Id == answer.QuestionId).AnswerCount -= 1;
			await _context.SaveChangesAsync();

			return Ok(answer);
		}

		private bool AnswerExists(int id)
		{
			return _context.Answer.Any(e => e.Id == id);
		}


		[HttpPatch("{id}")]
		public async Task<IActionResult> PatchAnswer(int id, [FromBody] PatchAnswer model)
		{
			var answer = await _context.Answer.FirstOrDefaultAsync(x => x.Id == id);
			if (answer == null)
				return BadRequest("Could not update Answer");
			if (model.Body != null) answer.Body = model.Body;

			if (model.UpVote != 0) answer.Upvote = model.UpVote;

			await _context.SaveChangesAsync();

			return Ok(answer);
		}
	}
}