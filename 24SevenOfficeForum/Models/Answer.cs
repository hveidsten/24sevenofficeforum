using System;
using System.Collections.Generic;

namespace _24SevenOfficeForum.Models
{
    public partial class Answer
    {
        public Answer()
        {
            Vote = new HashSet<Vote>();
        }

        public int Id { get; set; }
        public int? Upvote { get; set; }
        public string Body { get; set; }
        public int QuestionId { get; set; }
        public DateTime? AnswerCreated { get; set; }
        public int? Downvote { get; set; }
        public int UserId { get; set; }

        public Question Question { get; set; }
        public ForumUser User { get; set; }
        public ICollection<Vote> Vote { get; set; }
    }
}
