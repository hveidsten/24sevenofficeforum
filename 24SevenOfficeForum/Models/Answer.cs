using System;
using System.Collections.Generic;

namespace _24SevenOfficeForum.Models
{
    public partial class Answer
    {
        public int Id { get; set; }
        public int? Upvote { get; set; }
        public string Body { get; set; }
        public int QuestionId { get; set; }

        public Question Question { get; set; }
    }
}
