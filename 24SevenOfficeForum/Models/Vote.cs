using System;
using System.Collections.Generic;

namespace _24SevenOfficeForum.Models
{
    public partial class Vote
    {
        public int Id { get; set; }
        public int VoteId { get; set; }
        public int AnswerVoteId { get; set; }
        public int QuestionVoteId { get; set; }
        public Guid UserId { get; set; }

        public Answer AnswerVote { get; set; }
        public Question IdNavigation { get; set; }
    }
}
