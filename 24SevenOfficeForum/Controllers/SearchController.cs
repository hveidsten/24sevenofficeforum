﻿using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Query.Internal;
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
		public async System.Threading.Tasks.Task<IQueryable<Question>> SearchAsync([FromQuery]string id, bool searchInAnswer, bool searchInCategory, string sortOrder, int? page)
		{
			string searchString = id;
			var search = from question in _context.Question.Include(q => q.Category).Include(q => q.Answer)
				where question.Body.Contains(searchString) ||
				      question.Header.Contains(searchString) ||
				      searchInAnswer && question.Answer.Any(a => a.Body.Contains(searchString)) ||
				      searchInCategory && question.Category.Description.Contains(searchString) ||
				      question.Category.CategoryName.Contains(searchString)
				select question;

			if (searchString != null)
			{
				if (sortOrder == "created_asc") search = search.OrderBy(x => x.QuestionCreated);
				else if (sortOrder == "vote_asc") search = search.OrderBy(x => x.Upvote);
				else if (sortOrder == "vote_desc") search = search.OrderByDescending(x => x.Upvote);
				else if (sortOrder == "count_asc") search = search.OrderBy(x => x.AnswerCount);
				else if (sortOrder == "count_desc") search = search.OrderByDescending(x => x.AnswerCount);
				else search = search.OrderByDescending(x => x.QuestionCreated);

				if (page == null) page = 1;
				int pageSize = 10;
				int skipRows = (page.Value - 1) * pageSize;
				  await search
					.Skip(skipRows)
					.Take(pageSize)
					.AsNoTracking().ToListAsync();
			}
			return search;
		}
	}
}