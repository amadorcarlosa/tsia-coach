namespace TsiaCoach.Server.AgentModel;

public sealed record FoundryDeploymentName(string Value);
public sealed record OpenAIId(string Value);
public sealed record AnthropicId(string Value);
public sealed record GeminiId   (string Value);


public union ModelNames(
    FoundryDeploymentName,
    OpenAIId,
    AnthropicId,
    GeminiId);



 