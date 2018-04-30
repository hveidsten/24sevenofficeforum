using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _24SevenOfficeForum.Models;

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