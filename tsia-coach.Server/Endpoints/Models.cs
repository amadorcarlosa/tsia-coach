using TsiaCoach.Server.AgentModel;

namespace TsiaCoach.Server.Endpoints;

public static class Models
{
    public static RouteGroupBuilder MapModels(
        this RouteGroupBuilder group)
    {
        group.MapGet("/models", () =>
        {
            var models =
                FoundryDeployments.All
                    .Select(deployment => deployment.ToResponse())
                    .ToArray();

            return TypedResults.Ok(models);
        })
        .WithName("GetModels")
        .WithTags("Models");

        return group;
    }
}
