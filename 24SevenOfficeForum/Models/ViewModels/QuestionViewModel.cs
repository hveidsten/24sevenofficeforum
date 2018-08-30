using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace _24SevenOfficeForum.Models.ViewModels
{
    public class QuestionViewModel
    {
	    public int Id { get; set; }
	    public int? Upvote { get; set; }
	    public string Header { get; set; }
	    public string Body { get; set; }
	    public int CategoryId { get; set; }
	    public DateTime? QuestionCreated { get; set; }
	    public int? AnswerCount { get; set; }

	    public int? UserId { get; set; }
	    public string FirstName { get; set; }
	    public string LastName { get; set; }
	}
}
