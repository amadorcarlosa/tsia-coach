using Azure.Core;
using Azure.Identity;

namespace TsiaCoach.Server;

public sealed record LocalDevelopment;

public sealed record ManagedIdentity(
    string ClientId);

public sealed record FederatedWorkloadIdentity(
    string TenantId,
    string ClientId,
    string TokenFilePath);

public union CredentialEnvironment(
    LocalDevelopment,
    ManagedIdentity,
    FederatedWorkloadIdentity);

public static class CredentialEnvironmentExtensions
{
    public static TokenCredential CreateCredential(
        this CredentialEnvironment environment) =>
        environment switch
        {
            LocalDevelopment =>
                new AzureCliCredential(),

            ManagedIdentity(var clientId) =>
                new ManagedIdentityCredential(
                    ManagedIdentityId.FromUserAssignedClientId(clientId)),

            FederatedWorkloadIdentity(
                var tenantId,
                var clientId,
                var tokenFilePath) =>
                new WorkloadIdentityCredential(
                    new WorkloadIdentityCredentialOptions
                    {
                        TenantId = tenantId,
                        ClientId = clientId,
                        TokenFilePath = tokenFilePath
                    }),
            null => throw new ArgumentNullException(nameof(environment))



        };

}