using System;
using System.Collections.Generic;
using _24SevenOfficeForum.Models;

namespace _24SevenOfficeForum.Models
{
    public partial class Category
    {
        public Category()
        {
            Question = new HashSet<Question>();
        }

        public int Id { get; set; }
        public string CategoryName { get; set; }
        public string Description { get; set; }

        public ICollection<Question> Question { get; set; }
    }
}
