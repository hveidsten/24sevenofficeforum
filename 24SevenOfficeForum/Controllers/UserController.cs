using System.Linq;
using System.Threading.Tasks;
using Auth0.AuthenticationApi;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using _24SevenOfficeForum.Utility;

namespace _24SevenOfficeForum.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class UserController : Controller
    {
	    private IConfiguration _configuration;

	    public UserController(IConfiguration configuration)
	    {
		    _configuration = configuration;

	    }
	    
	    [HttpGet]
	    public async Task<IActionResult> GetUser()
	    {
		    IActionResult response = Unauthorized();

		    // We're not doing anything with this, but hey! It's useful to know where the user id lives
		   // var userId = User.Claims.FirstOrDefault(c => c.Type == System.Security.Claims.ClaimTypes.NameIdentifier).Value;

		    // Retrieve the access_token claim which we saved in the OnTokenValidated event
		    var accessToken = User.Claims.FirstOrDefault(c => c.Type == "access_token").Value;

		    // If we have an access_token, then retrieve the user's information
		    if (!string.IsNullOrEmpty(accessToken))
		    {
			    var domain = _configuration["Auth0:Domain"];
			    var apiClient = new AuthenticationApiClient(domain);
			    var userInfo = await apiClient.GetUserInfoAsync(accessToken);

			    return Ok(userInfo);
		    }
		    return response;
	    }

	    [Authorize(Scopes.ReadQuestions)]
	    [HttpGet("api/userDoAdminThing")]
	    public IActionResult GetUserDoAdminThing()
	    {
		    return Ok("Admin endpoint");
	    }



	}
}