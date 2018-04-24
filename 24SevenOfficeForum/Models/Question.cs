using System;
using System.Collections.Generic;

namespace _24SevenOfficeForum.Models
{
    public partial class Question
    {
        public int Id { get; set; }
        public int? Upvote { get; set; }
        public string Header { get; set; }
        public string Body { get; set; }
    }
}
