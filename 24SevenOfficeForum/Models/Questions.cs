using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace _24SevenOfficeForum.Models
{
    public class Questions
    {
		public int Id { get; set; }
		public int Upvote { get; set; }
		public string Header { get; set; }
		public string Body { get; set; }

	}
}
