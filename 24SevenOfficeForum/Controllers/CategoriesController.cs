﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _24SevenOfficeForum.Models;

namespace _24SevenOfficeForum.Controllers
{
	[Produces("application/json")]
    [Route("api/Categories")]
    public class CategoriesController : Controller
    {
        private readonly _24hOfficeforumContext _context;

        public CategoriesController(_24hOfficeforumContext context)
        {
            _context = context;
        }

        // GET: api/Categories
        [HttpGet]
		
        public IEnumerable<Category> GetCategories()
        {
            return _context.Category;
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategory([FromRoute] int id)
        {
            if (!ModelState.IsValid)
	            return BadRequest(ModelState);

	        var category = await _context.Category.SingleOrDefaultAsync(m => m.Id == id);

            if (category == null)
	            return NotFound();

	        return Ok(category);
        }

        // PUT: api/Categories/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCategory([FromRoute] int id, [FromBody] Category category)
        {
            if (!ModelState.IsValid)
	            return BadRequest(ModelState);

	        if (id != category.Id)
	            return BadRequest();

	        _context.Entry(category).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
	            if (!CategoryExists(id))
		            return NotFound();
	            throw;
            }

            return NoContent();
        }

        // POST: api/Categories
        [HttpPost]
        [Authorize]
		public async Task<IActionResult> PostCategory([FromBody] Category category)
        {
			if (!ModelState.IsValid)
				return BadRequest(ModelState);
	        _context.Category.Add(category);
			try
			{
			    await _context.SaveChangesAsync();
			}
			catch (DbUpdateException)
			{
				if (CategoryExists(category.Id))
					return new StatusCodeResult(StatusCodes.Status409Conflict);
				throw;
			}
			return CreatedAtAction("GetCategory", new { id = category.Id }, category);
		}

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory([FromRoute] int id)
        {
            if (!ModelState.IsValid)
	            return BadRequest(ModelState);

	        var category = await _context.Category.SingleOrDefaultAsync(m => m.Id == id);
            if (category == null)
	            return NotFound();

	        _context.Category.Remove(category);
            await _context.SaveChangesAsync();

            return Ok(category);
        }

        private bool CategoryExists(int id)
        {
            return _context.Category.Any(e => e.Id == id);
        }
    }
}