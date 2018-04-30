using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using _24SevenOfficeForum.Models;

namespace _24SevenOfficeForum.Controllers
{
    [Produces("application/json")]
    [Route("api/Question")]
    public class QuestionController : Controller
    {

	    public readonly _24hOfficeforumContext _context;

	    public QuestionController(_24hOfficeforumContext context)
	    {
		    _context = context;

		   if (_context.Question.Any())
		    {
			    context.Question.Add(new Question { });
			    context.SaveChanges();
		    }
	    }
		
	    [HttpGet]
	    public IEnumerable<Question> GetAll()
	    {
			
		    return _context.Question.ToList();

	    }

	    [HttpGet]
		[Route("api/answer")]
	    public IEnumerable<Answer> GetAllAnswers()
	    {
		    return _context.Answer.ToList();

	    }

	   /* [HttpGet("{id}", Name = "GetQuestion")]
	    public IActionResult GetById(long id)
	    {

		    var Question = _context
			    .Include(f => f.Answer)
			    .SingleOrDefaultAsync(m => m.Id == id);
			//var item = _context.Question.Include(h => h.QuestionNavigation.).ToList();
			if (Question == null)
		    {
			    return NotFound();
		    }
		    return new ObjectResult(Question);
	    }*/
	    //t => t.Id == id



		
	
	}
}