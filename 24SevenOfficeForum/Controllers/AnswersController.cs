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
        public async Task <IEnumerable<Answer>> GetAnswer(string searchString, int? page, string sortOrder, bool ascending)
        {
			var sort = _context.Answer.AsQueryable();
			if (sortOrder == null)
				sortOrder = "created_desc";
	        if (ascending)
			{
				if (sortOrder == "created_asc") sort = sort.OrderBy(x => x.AnswerCreated);
				else if (sortOrder == "Id_asc") sort = sort.OrderBy(x => x.Id);
			}
			else
			{
				if (sortOrder == "created_desc") sort = sort.OrderByDescending(x => x.AnswerCreated);
				else if (sortOrder == "Id_desc") sort = sort.OrderByDescending(x => x.Id);
			}

			if (searchString != null)
				page = 1;

	        if (page == null) page = 1;
			int pageSize = 10;
			int skipRows = (page.Value - 1) * pageSize;
			var answers = await _context.Answer
				.Skip(skipRows)
				.Take(pageSize)
				.AsNoTracking().ToListAsync();

			return answers;
        }

        // GET: api/Answers/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetAnswer([FromRoute] int id)
        {
            if (!ModelState.IsValid)
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
			_context.SaveChanges();

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