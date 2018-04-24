using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using _24SevenOfficeForum.models;
using _24SevenOfficeForum.Models;

namespace _24SevenOfficeForum.Controllers
{
    [Produces("application/json")]
    [Route("api/Home")]
    public class HomeController : Controller
    {
	    private _24hOfficeforumContext db = new _24hOfficeforumContext();

        // GET: api/Home
        [HttpGet]
        public IQueryable<Question> Get()
        {

	        return db.Question;
	        //return new string[] { "value1", "value2" };
        }

        // GET: api/Home/5
        [HttpGet("{id}", Name = "Get")]
        public string Get(int id)
        {
            return "value";
        }
        
        // POST: api/Home
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }
        
        // PUT: api/Home/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }
        
        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
