﻿using System;
using System.Collections.Generic;

namespace _24SevenOfficeForum.Models
{
    public partial class ForumUser
    {
        public ForumUser()
        {
            Answer = new HashSet<Answer>();
            Question = new HashSet<Question>();
        }

        public int Id { get; set; }
        public Guid UserId { get; set; }
        public string UserName { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Company { get; set; }
        public byte[] PasswordSalt { get; set; }
        public string Passwordhash { get; set; }
        public int? UserVote { get; set; }
        public string UserRole { get; set; }
        public string UserClaim { get; set; }
        public long? ExternalUserId { get; set; }

        public ICollection<Answer> Answer { get; set; }
        public ICollection<Question> Question { get; set; }
    }
}
