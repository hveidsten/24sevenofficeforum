using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _24SevenOfficeForum.Models;

namespace _24SevenOfficeForum.Controllers
{
	[Produces("application/json")]
	[Route("api/Answers")]
	public class AnswersController : Controller
	{
		private readonly _24hOfficeforumContext _context;

		public AnswersController(_24hOfficeforumContext context)
		{
			_context = context;
		}

		// GET: api/Answers
		[HttpGet]
		public async Task<IEnumerable<Answer>> GetAnswers(int? page, string sortOrder)
		{
			var sort = _context.Answer.AsQueryable();
			if (sortOrder == "created_asc") sort = sort.OrderBy(x => x.AnswerCreated);
			else if (sortOrder == "Vote_asc") sort = sort.OrderBy(x => x.Upvote);
			else if (sortOrder == "Vote_desc") sort = sort.OrderByDescending(x => x.Upvote);
			else sort = sort.OrderByDescending(x => x.AnswerCreated);

			if (page == null) page = 1;
			int pageSize = 10;
			int skipRows = (page.Value - 1) * pageSize;
			var answers = await sort
				.Skip(skipRows)
				.Take(pageSize)
				.AsNoTracking().ToListAsync();

			return answers;
		}

		// GET: api/Answers/5
		[HttpGet("{id}")]
		public async Task<IActionResult> GetAnswer([FromRoute] int id)
		{
			if (!ModelState.IsValid) // Overflødig?
				return BadRequest(ModelState);

			var answer = await _context.Answer.SingleOrDefaultAsync(m => m.Id == id);

			if (answer == null)
				return NotFound();

			return Ok(answer);
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
		public async Task<IActionResult> PostAnswer([FromBody] Answer answer)
		{
			_context.Answer.Add(answer);
			await _context.SaveChangesAsync();

			return Ok(answer);

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
				return BadRequest("Kan ikke oppdatere svar");
			if (model.Body != null) answer.Body = model.Body;

			await _context.SaveChangesAsync();

			return Ok();
		}
	}
}