namespace TsiaCoach.Server.AgentModel;

public sealed record FoundryProjectEndpoint(Uri Value);
public sealed record OpenAIEndpoint(Uri Value);
public sealed record AnthropicEndpoint(Uri Value);
public sealed record GeminiEndpoint(Uri Value);