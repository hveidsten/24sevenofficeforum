using System;

namespace _24SevenOfficeForum.Models
{
	public class PatchQuestion
    {
		public int Id { get; set; }
		public string Header { get; set; }
		public string Body { get; set; }
		public int UpVote { get; set; }
	    public int CategoryId { get; set; }
	    public DateTime? QuestionCreated { get; set; }
	    public int? AnswerCount { get; set; }
	}
}
