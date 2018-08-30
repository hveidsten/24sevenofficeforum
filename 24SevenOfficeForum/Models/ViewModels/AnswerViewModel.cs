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

	    public string UserName { get; set; }
	    public string Email { get; set; }
	    public string FirstName { get; set; }
	    public string LastName { get; set; }
	    public string Company { get; set; }
	    public string UserRole { get; set; }
	}
}
