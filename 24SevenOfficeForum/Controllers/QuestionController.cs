using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _24SevenOfficeForum.Models;
using EntityState = Microsoft.EntityFrameworkCore.EntityState;

namespace _24SevenOfficeForum.Controllers
{
    [Produces("application/json")]
    [Route("api/question")]
    public class QuestionController : Controller
    {

	    public readonly _24hOfficeforumContext _context;

	    public QuestionController(_24hOfficeforumContext context)
	    {
		    _context = context;

		 if (context.Question.Count() == 0)
		    {
			    context.Question.Add(new Question());
			    context.SaveChanges();
		    }
	    }

	    [HttpGet]		
	    public IEnumerable<Question>  GetAll(int id)
	    {
		    return _context.Question.ToList();
	    }

	    // GET: api/Home/5
	    [HttpGet("{id}", Name = "Get")]
		[Route("api/question/{id}" )]
	    public IActionResult GetById(int id)
	    {
		    var item = _context.Question.Find(id);
		    return Ok(item);
	    }


	    // PUT: api/Answers/5
	    [HttpPut("{id}")]
	    public async Task<IActionResult> Putquestion([FromRoute] int id, [FromBody] Question question)
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

	    // POST: api/Answers
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

		    return CreatedAtAction("GetAll", new { id = question.Id }, question);
	    }


	    // DELETE: api/Answers/5
	    [HttpDelete("{id}")]
	    public async Task<IActionResult> DeleteQuestion([FromRoute] int id)
	    {
		    if (!ModelState.IsValid)
		    {
			    return BadRequest(ModelState);
		    }

		    var question = _context.Question.SingleOrDefault(m => m.Id == id);
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


		// GET api/regnut/values/5/8
		/*[HttpGet("regnut/{id}/{id2}")]
	    public string GetResult(int id, int id2)
	    {
		    int res = id + id2;
		    return "Resultat: " + res;
	    }*/
		//t => t.Id == id





	}
}