using Azure.Core;
namespace TsiaCoach.Server.AgentModel;

public sealed record EntraAuthentication(
    CredentialEnvironment CredentialEnvironment);

public sealed record ApiKeyAuthentication(
    string ApiKey);

public union ModelAuthentication(
    EntraAuthentication,
    ApiKeyAuthentication);

public static class AuthenticationExtensions
{
    public static Azure.Core.TokenCredential CreateCredential(
        this EntraAuthentication authentication) =>
        authentication.CredentialEnvironment.CreateCredential();
}