
using Microsoft.Agents.AI;
using Shared = TsiaCoach.Shared.Config;
using Azure.AI.Projects;
using TsiaCoach.Server.AgentModel;
using TsiaCoach.Server;
using TsiaCoach.Server.Endpoints;
using System.Text.Json.Serialization;
using TsiaCoach.Server.Tool;



var builder = WebApplication.CreateBuilder(args);

// Add service defaults & Aspire client integrations.
builder.AddServiceDefaults();
builder.AddRedisClientBuilder(Shared.Redis.ResourceName)
    .WithOutputCache();

builder.Services.AddOutputCache();

// Add services to the container.
builder.Services.AddProblemDetails();



// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();
builder.Services.ConfigureHttpJsonOptions(options =>
    options.SerializerOptions.Converters.Add(
        new JsonStringEnumConverter()));

builder.Services.AddSingleton(sp =>
{
    CredentialEnvironment credentialEnvironment =
        builder.Environment.IsDevelopment()
            ? new LocalDevelopment()
            : new ManagedIdentity(
                builder.Configuration["AZURE_CLIENT_ID"]
                ?? throw new InvalidOperationException(
                    "AZURE_CLIENT_ID is required in production."));

    string projectEndpoint =
        Environment.GetEnvironmentVariable(Shared.Azure.VariableName.ProjectEndpoint)
        ?? throw new InvalidOperationException(
            $"'{Shared.Azure.VariableName.ProjectEndpoint}' is not set.");

    return new AIProjectClient(
        new Uri(projectEndpoint),
        credentialEnvironment.CreateCredential());
});

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
api.MapAgents();
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



