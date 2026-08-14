namespace TsiaCoach.Server.AgentModel;


public sealed record FoundryDeploymentResponse(
    string Id,
    string ModelName,
    string ModelVersion,
    string DisplayName,
    string Provider,
    string Lifecycle,
    IReadOnlyList<string> SupportedApis,
    IReadOnlyList<string> Operations,
    IReadOnlyList<string> InputModalities,
    IReadOnlyList<string> OutputModalities,
    IReadOnlyList<string> Features,
    IReadOnlyList<string> InteractionModes);
public static class FoundryDeploymentMappings
{
    public static FoundryDeploymentResponse ToResponse(
        this FoundryDeploymentDescriptor deployment) =>
        new(
            Id: deployment.Name.Value,
            ModelName: deployment.ModelName,
            ModelVersion: deployment.ModelVersion,
            DisplayName: deployment.DisplayName,
            Provider: deployment.Provider.ToString(),
            Lifecycle: deployment.Lifecycle.ToString(),
            SupportedApis: deployment.SupportedApis
                .Select(value => value.ToString())
                .ToArray(),
            Operations: deployment.Operations
                .Select(value => value.ToString())
                .ToArray(),
            InputModalities: deployment.InputModalities
                .Select(value => value.ToString())
                .ToArray(),
            OutputModalities: deployment.OutputModalities
                .Select(value => value.ToString())
                .ToArray(),
            Features: deployment.Features
                .Select(value => value.ToString())
                .ToArray(),
            InteractionModes: deployment.InteractionModes
                .Select(value => value.ToString())
                .ToArray());
}