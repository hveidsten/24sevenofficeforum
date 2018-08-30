using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _24SevenOfficeForum.Models.ViewModels
{
    public class AnswerViewModel
    {
	    public int Id { get; set; }
	    public int? Upvote { get; set; }
	    public string Body { get; set; }
	    public int QuestionId { get; set; }
	    public DateTime? AnswerCreated { get; set; }
	    public int? Downvote { get; set; }

	    public int? UserId { get; set; }
	    public string FirstName { get; set; }
	    public string LastName { get; set; }
	}
}
