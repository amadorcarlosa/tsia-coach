using Json.More;
using static TsiaCoach.AppHost.Config;
using Shared = TsiaCoach.Shared.Config;
using System.Text.Json;

var builder = DistributedApplication.CreateBuilder(args);

var cache = builder.AddRedis(Shared.Redis.ResourceName);

var openAIEndpoint = builder.AddParameter(Azure.ParameterName.OpenAIEndPoint, secret: true);

var projectEndpoint = builder.AddParameter(Azure.ParameterName.ProjectEndpoint, secret: true);




var server = builder.AddProject<Projects.tsia_coach_Server>(WebApiServer.ProjectName)
    .WithReference(cache)
    .WaitFor(cache)
    .WithHttpHealthCheck(WebApiServer.HealthPath)
    .WithEnvironment(Shared.Azure.VariableName.OpenAIEndPoint, openAIEndpoint)
    .WithEnvironment(Shared.Azure.VariableName.ProjectEndpoint, projectEndpoint);


var webfrontend = builder.AddNextJsApp(Next.ProjectName,
 Next.Directory,Shared.Next.ScriptName)
    .WithReference(server)
 .WithEnvironment(Shared.Next.ApiVariableName, server.GetEndpoint(Next.EndPointName))
    .WaitFor(server)
    .WithExternalHttpEndpoints();





builder.Build().Run();
