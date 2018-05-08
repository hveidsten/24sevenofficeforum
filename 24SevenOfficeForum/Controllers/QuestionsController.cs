using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _24SevenOfficeForum.Models;

namespace _24SevenOfficeForum.Controllers
{
	[Produces("application/json")]
    [Route("api/Questions")]

    public class QuestionsController : Controller
    {
        private readonly _24hOfficeforumContext _context;

        public QuestionsController(_24hOfficeforumContext context)
        {
            _context = context;
		}

        // GET: api/Questions
       
		[HttpGet]
	    public async Task<IEnumerable<Question>> Get()
		{
		    var questions = await _context.Question.Include(x => x.Answer).ToListAsync();

			//This releases the self reference between question and answer
		    foreach (var question in questions)
		    {
			    foreach (var answer in question.Answer)
			    {
				    answer.Question = null;
			    }
		    }
		    return questions;
	    }


		// GET: api/Questions/5
		[HttpGet("{id}")]
        public async Task<Question> GetQuestion([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return null;
            }

	        var answer = _context.Question
		        .Include(x => x.Answer)
		        .FirstOrDefaultAsync(m => m.Id == id);

	        return await answer;

			/*var question = await _context.Question.SingleOrDefaultAsync(m => m.Id == id);
            if (question == null)
            {
                return NotFound();
            }
            return Ok(question);*/
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
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Question.Add(question);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (QuestionExists(question.Id))
                {
                    return new StatusCodeResult(StatusCodes.Status409Conflict);
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetQuestion", new { id = question.Id }, question);
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
    }
}