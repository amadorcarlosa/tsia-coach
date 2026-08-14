
using Microsoft.Agents.AI;
using Shared = TsiaCoach.Shared.Config;
using Azure.AI.Projects;
using TsiaCoach.Server.AgentModel;
using Azure.AI.OpenAI;

using Microsoft.Extensions.AI;
using TsiaCoach.Server;
using Azure.Core;
using TsiaCoach.Server.Endpoints;



var builder = WebApplication.CreateBuilder(args);

// Add service defaults & Aspire client integrations.
builder.AddServiceDefaults();
builder.AddRedisClientBuilder(Shared.Redis.ResourceName)
    .WithOutputCache();

builder.Services.AddOutputCache();

// Add services to the container.
builder.Services.AddProblemDetails();

CredentialEnvironment credentialEnvironment =
    builder.Environment.IsDevelopment()
        ? new LocalDevelopment()
        : new ManagedIdentity(
            builder.Configuration["AZURE_CLIENT_ID"]
            ?? throw new InvalidOperationException(
                "AZURE_CLIENT_ID is required in production."));

TokenCredential tokenCredential =
    credentialEnvironment.CreateCredential();


string azureOpenAIEndpoint = Environment.GetEnvironmentVariable(Shared.Azure.VariableName.OpenAIEndPoint)
    ?? throw new InvalidOperationException(
        $"Environment variable '{Shared.Azure.VariableName.OpenAIEndPoint}' is not set.");


string projectEndpoint =
    Environment.GetEnvironmentVariable(Shared.Azure.VariableName.ProjectEndpoint)
    ?? throw new InvalidOperationException(
        $"Environment variable '{Shared.Azure.VariableName.ProjectEndpoint}' is not set.");


if (tokenCredential == null)
{
    throw new InvalidOperationException(
        "Failed to create AzureCliCredential. Ensure you are logged in via Azure CLI.");
}



AIAgent agent =
    new AIProjectClient(
        new Uri(projectEndpoint),
        tokenCredential)
    .AsAIAgent(
        model: FoundryDeploymentCatalog.DeepSeek.V4Pro.Value,
        name: "TestAgent",
        instructions: "You are a helpful assistant. Be concise.");

var response = await agent.RunAsync(
    "What are three places to visit in Providence?");

if (response == null)
{
    throw new InvalidOperationException(
        "Agent response was null. Ensure the agent is configured correctly.");
}

Console.WriteLine(
    $"Agent response: {response.Text}");
IEmbeddingGenerator<string, Embedding<float>> embeddingGenerator =
    new AzureOpenAIClient(
        new Uri(azureOpenAIEndpoint),
        tokenCredential)
    .GetEmbeddingClient(
        FoundryDeploymentCatalog.Embeddings.Small3.Value)
    .AsIEmbeddingGenerator();

ReadOnlyMemory<float> vector =
    await embeddingGenerator.GenerateVectorAsync(response.Text);

Console.WriteLine($"Embedding dimensions: {vector.Length}");


// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseExceptionHandler();

if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseOutputCache();


string[] summaries = ["Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"];

var api = app.MapGroup("/api");
api.MapModels();
api.MapGet("weatherforecast", () =>
{
    var forecast = Enumerable.Range(1, 5).Select(index =>
        new WeatherForecast
        (
            DateOnly.FromDateTime(DateTime.Now.AddDays(index)),
            Random.Shared.Next(-20, 55),
            summaries[Random.Shared.Next(summaries.Length)]
        ))
        .ToArray();
    return forecast;
})
.CacheOutput(p => p.Expire(TimeSpan.FromSeconds(5)))
.WithName("GetWeatherForecast");


app.MapDefaultEndpoints();

app.UseFileServer();

app.Logger.LogInformation("Starting tsia-coach.AppHost");
app.Logger.LogInformation("OpenAI Endpoint: {endpoint}", Environment.GetEnvironmentVariable(Shared.Azure.VariableName.OpenAIEndPoint));

app.Run();

record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}
