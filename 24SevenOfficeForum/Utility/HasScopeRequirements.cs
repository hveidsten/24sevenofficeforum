﻿using System;
using Microsoft.AspNetCore.Authorization;

namespace _24SevenOfficeForum.Utility
{
    public class HasScopeRequirements : IAuthorizationRequirement
    {
	    public string Issuer { get; }
	    public string Scope { get; }

	    public HasScopeRequirements(string scope, string issuer)
	    {
		    Scope = scope ?? throw new ArgumentNullException(nameof(scope));
		    Issuer = issuer ?? throw new ArgumentNullException(nameof(issuer));
	    }
	}
}
