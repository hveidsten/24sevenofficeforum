using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _24SevenOfficeForum.Models;

namespace _24SevenOfficeForum.Controllers
{
	[Produces("application/json")]
    [Route("demo")]
    public class DemoController : Controller
    {
        private readonly _24hOfficeforumContext _context;

        public DemoController(_24hOfficeforumContext context)
        {
            _context = context;
		}

       
       
		[HttpGet]
	    public async Task<IEnumerable<Question>> Get()
	    {
		    var questions = await _context.Question.Include(x => x.Answer).ToListAsync();
            
		    foreach (var question in questions)
		    {
			    foreach (var answer in question.Answer)
			    {
				    answer.Question = null;
			    }
		    }
		    return questions;
	    }


        /*[HttpGet("{catId}")]
        public async Task<IEnumerable<Question>> GetQuestions([FromRoute] int catId)
        {

            var questions = await _context.Question.Include(x => x.Answer).Where(x => x.CategoryId == catId).ToListAsync();

            foreach (var question in questions)
            {
                foreach (var answer in question.Answer)
                {
                    answer.Question = null;
                }
            }
            return questions;
        }*/


        [HttpGet("{qId}")]
        public async Task<Question> GetQuestion([FromRoute] int catId, int qId)
        {
            var question = await _context.Question.Where(q => q.Id == qId).Include(a => a.Answer).FirstOrDefaultAsync();
            
            return question;
        }

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

     
        [HttpPost]
        public async Task<IActionResult> PostQuestion([FromBody]Question question)
        {
            _context.Question.Add(question);
            _context.SaveChanges();


            return Ok(question);
        }

     
		
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