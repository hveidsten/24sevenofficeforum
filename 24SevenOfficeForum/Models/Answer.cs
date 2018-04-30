using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace _24SevenOfficeForum.Models
{
    public class Answer
    {
        public Answer()
        {
            Question = new HashSet<Question>();
        }

		
        public int Id { get; set; }

        public int? Upvote { get; set; }
        public string Body { get; set; }

        public ICollection<Question> Question { get; set; }
    }
}
