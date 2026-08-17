using Microsoft.Extensions.AI;
using TsiaCoach.Server.Tool;

namespace TsiaCoach.Server.AgentModel;

public sealed record AgentDefinition(
    AgentName Name,
    string Description,
    string Instructions,
    IReadOnlyList<AITool> Tools);

public static class AgentDefinitions
{
    public static readonly AgentDefinition WeatherForecaster = new(
        Name: AgentNames.WeatherForecaster,
        Description: "Test agent that answers weather questions from the forecast tool.",
        Instructions:
            "You are a weather forecast assistant. " +
            "You can only report the forecast for the next one to five days. " +
            "Always call the forecast tool to get data; never invent forecast values. " +
            "If asked about a specific location, explain that forecasts are not " +
            "location-specific yet. Keep answers to a short summary per day.",
        Tools: [AIFunctionFactory.Create(WeatherForecastGenerator.GetForecast)]);

    public static readonly IReadOnlyList<AgentDefinition> All = [WeatherForecaster];

    public static bool TryGet(string name, out AgentDefinition definition)
    {
        definition = All.FirstOrDefault(d => d.Name.Value == name)!;
        return definition is not null;
    }


}