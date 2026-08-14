namespace TsiaCoach.Server.AgentModel;


public sealed record FoundryDeploymentResponse(
    string Id,
    string ModelName,
    string ModelVersion,
    string DisplayName,
    ModelProvider Provider,
    ModelLifecycle Lifecycle,
    IReadOnlyList<ModelApi> SupportedApis,
    IReadOnlyList<ModelOperation> Operations,
    IReadOnlyList<ModelModality> InputModalities,
    IReadOnlyList<ModelModality> OutputModalities,
    IReadOnlyList<ModelFeature> Features,
    IReadOnlyList<InteractionMode> InteractionModes);
public static class FoundryDeploymentMappings
{
    public static FoundryDeploymentResponse ToResponse(
        this FoundryDeploymentDescriptor deployment) =>
        new(
            Id: deployment.Name.Value,
            ModelName: deployment.ModelName,
            ModelVersion: deployment.ModelVersion,
            DisplayName: deployment.DisplayName,
            Provider: deployment.Provider,
            Lifecycle: deployment.Lifecycle,
            SupportedApis: deployment.SupportedApis,
            Operations: deployment.Operations,
            InputModalities: deployment.InputModalities,
            OutputModalities: deployment.OutputModalities,
            Features: deployment.Features,
            InteractionModes: deployment.InteractionModes);
}
