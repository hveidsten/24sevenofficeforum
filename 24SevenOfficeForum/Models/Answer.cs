using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace _24SevenOfficeForum.Models
{
    public class Answer
    {
		public int Id { get; set; }
		public int Upvote { get; set; }
		public string Body { get; set; }
	}
}
