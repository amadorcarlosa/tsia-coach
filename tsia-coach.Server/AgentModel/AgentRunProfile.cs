namespace TsiaCoach.Server.AgentModel;


public sealed record AgentRuntimeProfile(
    AgentName Agent,
    FoundryDeploymentName Deployment,
    AgentParameters Parameters);

public sealed record AgentName(string Value);

public sealed record AgentParameters(
    float? Temperature,
    int MaxOutputTokens,
    bool StructuredOutput,
    bool Stream);


public static class AgentBindings
{
    public static readonly AgentRuntimeProfile WeatherForecaster = new(
        Agent: AgentNames.WeatherForecaster,
        Deployment: FoundryDeploymentCatalog.Gpt.Gpt5Nano,   // compiler-verified reference
        Parameters: new(Temperature: 0.3f, MaxOutputTokens: 1024,
                        StructuredOutput: true, Stream: false));
    public static readonly AgentRuntimeProfile Tutor = new(
     Agent: AgentNames.Tutor,
     Deployment: FoundryDeploymentCatalog.Gpt.Gpt5Nano,   // compiler-verified reference
     Parameters: new(Temperature: null, MaxOutputTokens: 1024,
                     StructuredOutput: true, Stream: false));

    public static bool TryGet(AgentName agent, out AgentRuntimeProfile profile)
    {
        profile = All.FirstOrDefault(p => p.Agent == agent)!;
        return profile is not null;
    }
    public static readonly IReadOnlyList<AgentRuntimeProfile> All = [WeatherForecaster];


}


public static class AgentNames
{
    public static readonly AgentName Default = new("default");
    public static readonly AgentName WeatherForecaster = new("weather-forecaster");
    public static readonly AgentName Tutor = new("tutor");
    public static readonly AgentName ScaffoldAuthor = new("scaffold-author");
}