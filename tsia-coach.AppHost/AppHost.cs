using Json.More;
using static TsiaCoach.AppHost.Config;
using Shared = TsiaCoach.Shared.Config;
using System.Text.Json;
using Scalar.Aspire;

var builder = DistributedApplication.CreateBuilder(args);

var cache = builder.AddRedis(Shared.Redis.ResourceName);

var openAIEndpoint = builder.AddParameter(Azure.ParameterName.OpenAIEndPoint, secret: true);

var projectEndpoint = builder.AddParameter(Azure.ParameterName.ProjectEndpoint, secret: true);




var server = builder.AddProject<Projects.tsia_coach_Server>(WebApiServer.ProjectName)
    .WithReference(cache)
    .WaitFor(cache)
    .WithHttpHealthCheck(WebApiServer.HealthPath)
    .WithEnvironment("OTEL_INSTRUMENTATION_GENAI_CAPTURE_MESSAGE_CONTENT", "true")
    .WithEnvironment(Shared.Azure.VariableName.OpenAIEndPoint, openAIEndpoint)
    .WithEnvironment(Shared.Azure.VariableName.ProjectEndpoint, projectEndpoint);


var webfrontend = builder.AddNextJsApp(Next.ProjectName,
 Next.Directory,Shared.Next.ScriptName)
    .WithReference(server)
 .WithEnvironment(Shared.Next.ApiVariableName, server.GetEndpoint(Next.EndPointName))
    .WaitFor(server)
    .WithExternalHttpEndpoints();

var scalar = builder.AddScalarApiReference(options =>
{
    options.WithTheme(ScalarTheme.Purple)
    .PreferHttpsEndpoint()
    .AllowSelfSignedCertificates();
});
scalar.WithApiReference(server, endpointName: "https");



builder.Build().Run();
