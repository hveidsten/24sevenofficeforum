using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace _24SevenOfficeForum.Models
{
	public class SearchViewModel
    {
		[Key]
		public int Id { get; set; }
		public IList<Question> Questions { get; set; }
		public IList<Answer> Answers { get; set; }
		public IList<Category> Categories { get; set; }
		
	    public int? Upvote { get; set; }
	    public string Header { get; set; }
	    public string Body { get; set; }
	    public int AnswerId { get; set; }
	    public int CategoryId { get; set; }
	}
}
