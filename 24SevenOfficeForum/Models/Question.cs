using System;
using System.Collections.Generic;

namespace _24SevenOfficeForum.Models
{
    public class Question
    {
        public Question()
        {
			//Category = new HashSet<Category>();
            Answer = new HashSet<Answer>();
            Vote = new HashSet<Vote>();
        }

        public int Id { get; set; }
        public int? Upvote { get; set; }
        public string Header { get; set; }
        public string Body { get; set; }
        public int CategoryId { get; set; }
        public DateTime? QuestionCreated { get; set; }

        public Category Category { get; set; }
        public ICollection<Answer> Answer { get; set; }
        public ICollection<Vote> Vote { get; set; }
    }
}
