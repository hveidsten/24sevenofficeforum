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
		public IQueryable<Question> GetSearch([FromQuery]string id, bool searchInAnswer, bool searchInCategory)
		{
			string searchString = id;
			var search = from m in _context.Question.Include(z => z.Category).Include(z => z.Answer)
				where m.Body.Contains(searchString) ||
				      m.Header.Contains(searchString) ||
				      searchInAnswer && m.Answer.Any(a => a.Body.Contains(searchString)) ||
				      searchInCategory && m.Category.Description.Contains(searchString) || m.Category.CategoryName.Contains(searchString)
				select m;
			return search;
		}
	}
}