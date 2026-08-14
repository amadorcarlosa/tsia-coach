namespace TsiaCoach.Server.AgentModel;

public sealed record OpenAICompatibleConfiguration(
    Uri Endpoint,
    string Model,
    ModelAuthentication Authentication);

public sealed record AnthropicConfiguration(
    Uri Endpoint,
    string Model,
    ModelAuthentication Authentication);

public sealed record GeminiConfiguration(
    Uri Endpoint,
    string Model,
    ModelAuthentication Authentication);