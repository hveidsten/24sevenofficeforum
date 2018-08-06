using System.Linq;
using Microsoft.AspNetCore.Mvc;
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
		public IQueryable<Question> GetSearch(string id)
		{
			string searchString = id;

			var search = _context.Question.Where(m =>
			m.Body.Contains(searchString) || m.Header.Contains(searchString) ||
			m.Answer.Any(a => a.Body.Contains(searchString)) ||
			m.Category.Description.Contains(searchString) ||
			m.Category.CategoryName.Contains(searchString));

			return search;
		}
	}
}