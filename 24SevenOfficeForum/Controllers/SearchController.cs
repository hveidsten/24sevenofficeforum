﻿using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
using System.Threading.Tasks;
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
		public IEnumerable<Question> GetSearchViewModel(string id)
		{
		   string searchString = id;
			var search = from m in _context.Question.Include(x => x.Answer)
			where m.Body.Contains(searchString) ||
				      m.Header.Contains(searchString) ||
					 m.Answer.Any(a => a.Body.Contains(searchString))
				select m;

			
			return search;

			//if (!string.IsNullOrEmpty(searchString))
			//{				
			//search = search.Where(s => s.Header.Contains(searchString));
			//
			//}

		}

		/*// GET: api/Search/5
		[HttpGet("{id}")]
        public async Task<IActionResult> GetSearchViewModel([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var searchViewModel = await SearchViewModel.SingleOrDefaultAsync(m => m.Id == id);

            if (searchViewModel == null)
            {
                return NotFound();
            }

            return Ok(searchViewModel);
        }

        // PUT: api/Search/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSearchViewModel([FromRoute] int id, [FromBody] SearchViewModel searchViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != searchViewModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(searchViewModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SearchViewModelExists(id))
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

        // POST: api/Search
        [HttpPost]
        public async Task<IActionResult> PostSearchViewModel([FromBody] SearchViewModel searchViewModel)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var search = SearchViewModel.Add(searchViewModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSearchViewModel", new { id = searchViewModel.Id }, searchViewModel);
        }

        // DELETE: api/Search/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSearchViewModel([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var searchViewModel = await _context.SearchViewModel.SingleOrDefaultAsync(m => m.Id == id);
            if (searchViewModel == null)
            {
                return NotFound();
            }

            _context.SearchViewModel.Remove(searchViewModel);
            await _context.SaveChangesAsync();

            return Ok(searchViewModel);
        }

        private bool SearchViewModelExists(int id)
        {
            return _context.SearchViewModel.Any(e => e.Id == id);
        }*/
    }
}