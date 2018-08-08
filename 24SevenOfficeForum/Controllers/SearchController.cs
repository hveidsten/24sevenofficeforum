using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _24SevenOfficeForum.Models;

namespace _24SevenOfficeForum.Controllers
{
	[Produces("application/json")]
	[Route("api/Search")]
	public class SearchController : Controller
	{
		private readonly _24hOfficeforumContext _context;

		public SearchController(_24hOfficeforumContext context)
		{
			_context = context;
		}

		//GET: api/Search
		[HttpGet]
		[Produces("application/json")]
		public IQueryable<Question> Search([FromQuery]string id, bool searchInAnswer, bool searchInCategory)
		{
			string searchString = id;
			var search = from question in _context.Question.Include(q => q.Category).Include(q => q.Answer)
				where question.Body.Contains(searchString) ||
				      question.Header.Contains(searchString) ||
				      searchInAnswer && question.Answer.Any(a => a.Body.Contains(searchString)) ||
				      searchInCategory && question.Category.Description.Contains(searchString) || question.Category.CategoryName.Contains(searchString)
				select question;
			return search;
		}
	}
}