using _24SevenOfficeForum.Models;
using System.Collections.Generic;

namespace _24SevenOfficeForum.Utility
{
	public class Cleaner
    {

		public static void CleanQuestions(List<Question> questions)
		{
			foreach (var question in questions)
			{
				foreach (var answer in question.Answer)
					answer.Question = null;
			}
		}
	}
}
