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

	    public SearchViewModel()
	    {

		    
			Questions = new List<Question>();
			Answers = new List<Answer>();
			
			Questions.Add(new Question()
			{
				Header = "Hallo",
				Body = "Hallo"

			});



		}
	}
}
