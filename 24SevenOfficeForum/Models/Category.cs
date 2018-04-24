using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace _24SevenOfficeForum.Models
{
    public class Category
    {
		public int Id { get; set; }
		public string CategoryName { get; set; }
		public string Description { get; set; }
	}
}
