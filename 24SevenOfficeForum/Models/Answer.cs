using System;

namespace _24SevenOfficeForum.Models
{
	public class Answer
    {
        public int Id { get; set; }
        public int? Upvote { get; set; }
        public string Body { get; set; }
        public int QuestionId { get; set; }
        public DateTime? AnswerCreated { get; set; }

        public Question Question { get; set; }
    }
}
