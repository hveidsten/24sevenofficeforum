using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace _24SevenOfficeForum.Models
{
	public class FullViewModel
	{
	public class Question
		{
			[Key]
			public int Id { get; set; }

			public int? Upvote { get; set; }
			public string Header { get; set; }
			public string Body { get; set; }
			public int? QuestionId { get; set; }
			public int? CategoryId { get; set; }

			
		}
		
		public class Answer
		{
			[Key]
			public int Id { get; set; }

			public int? Upvote { get; set; }
			public string Body { get; set; }			
		}
	}
}
			
		

