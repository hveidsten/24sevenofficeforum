using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using _24SevenOfficeForum.Models;

namespace _24SevenOfficeForum.Models
{
    public class Question
    {
		
        public int Id { get; set; }

        public int? Upvote { get; set; }
        public string Header { get; set; }
        public string Body { get; set; }
	   
		public int? QuestionId { get; set; }
        public int? CategoryId { get; set; }

        public Answer QuestionNavigation { get; set; }
    }


}
