using System.Diagnostics;
using Azure.AI.Projects;
using Microsoft.Agents.AI;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.Extensions.AI;
using TsiaCoach.Server.AgentModel;

namespace TsiaCoach.Server.Endpoints;

public sealed record InvokeAgentRequest(string Message);

public sealed record InvokeAgentResponse(
    string ReplyText,
    long InputTokens,
    long OutputTokens,
    long LatencyMs,
    string? ResponseId);

public static class Agents
{
    public static RouteGroupBuilder MapAgents(
        this RouteGroupBuilder group)
    {
        group.MapPost("/agents/{agentName}/invoke",
            async Task<Results<Ok<InvokeAgentResponse>, NotFound>> (
                string agentName,
                InvokeAgentRequest request,
                AIProjectClient projectClient) =>
        {
            if (!AgentDefinitions.TryGet(agentName, out var definition)
                || !AgentBindings.TryGet(definition.Name, out var profile))
            {
                return TypedResults.NotFound();
            }

            var agent = projectClient.AsAIAgent(new ChatClientAgentOptions
            {
                Name = definition.Name.Value,
                ChatOptions = new ChatOptions
                {
                    ModelId = profile.Deployment.Value,
                    Instructions = definition.Instructions,
                    Tools = [..definition.Tools],
                    Temperature = profile.Parameters.Temperature,
                    MaxOutputTokens = profile.Parameters.MaxOutputTokens,
                },
            });

            var stopwatch = Stopwatch.StartNew();
            AgentResponse response = await agent.RunAsync(request.Message);
            stopwatch.Stop();

            return TypedResults.Ok(new InvokeAgentResponse(
                ReplyText: response.Text,
                InputTokens: response.Usage?.InputTokenCount ?? 0,
                OutputTokens: response.Usage?.OutputTokenCount ?? 0,
                LatencyMs: stopwatch.ElapsedMilliseconds,
                ResponseId: response.ResponseId));
        })
        .WithName("InvokeAgent")
        .WithTags("Agents");

        return group;
    }
}