using System;

namespace _24SevenOfficeForum.Models
{
    public class Vote
    {
        public int Id { get; set; }
        public int VoteId { get; set; }
        public int AnswerVoteId { get; set; }
        public int QuestionVoteId { get; set; }
        public Guid UserId { get; set; }

        public Question IdNavigation { get; set; }
    }
}
