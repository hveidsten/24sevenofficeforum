using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using _24SevenOfficeForum.Models;

namespace _24SevenOfficeForum.Controllers
{
    [Produces("application/json")]
    [Route("api/ForumUsers")]
    public class ForumUsersController : Controller
    {
        private readonly _24hOfficeforumContext _context;

        public ForumUsersController(_24hOfficeforumContext context)
        {
            _context = context;
        }

        // GET: api/ForumUsers
        [HttpGet]
        public IEnumerable<ForumUser> GetForumUser()
        {
            return _context.ForumUser;
        }

        // GET: api/ForumUsers/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetForumUser([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var forumUser = await _context.ForumUser.SingleOrDefaultAsync(m => m.Id == id);

            if (forumUser == null)
            {
                return NotFound();
            }

            return Ok(forumUser);
        }

        // PUT: api/ForumUsers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutForumUser([FromRoute] long id, [FromBody] ForumUser forumUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != forumUser.Id)
            {
                return BadRequest();
            }

            _context.Entry(forumUser).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ForumUserExists(id))
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

        // POST: api/ForumUsers
        [HttpPost]
        public async Task<IActionResult> PostForumUser([FromBody] ForumUser forumUser)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.ForumUser.Add(forumUser);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetForumUser", new { id = forumUser.Id }, forumUser);
        }

        // DELETE: api/ForumUsers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteForumUser([FromRoute] long id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var forumUser = await _context.ForumUser.SingleOrDefaultAsync(m => m.Id == id);
            if (forumUser == null)
            {
                return NotFound();
            }

            _context.ForumUser.Remove(forumUser);
            await _context.SaveChangesAsync();

            return Ok(forumUser);
        }

        private bool ForumUserExists(long id)
        {
            return _context.ForumUser.Any(e => e.Id == id);
        }
    }
}