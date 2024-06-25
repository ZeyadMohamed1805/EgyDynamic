using System.Security.Claims;

namespace server.Extensions
{
    public static class ClaimsExtension
    {
        public static string GetUsername(this ClaimsPrincipal admin)
        {
            return admin.Claims.SingleOrDefault(x => x.Type.Equals("http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"))!.Value;
        }
    }
}