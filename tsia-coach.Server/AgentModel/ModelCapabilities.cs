namespace TsiaCoach.Server.AgentModel;

public enum ModelProvider
{
    OpenAI,
    Anthropic,
    DeepSeek,
    Google,
    Microsoft,
}

public enum ModelApi
{
    Responses,
    ChatCompletions,
    Embeddings,
    AnthropicMessages,
    Realtime,
    Audio
}

public enum ModelOperation
{
    Chat,
    Embedding,
    SpeechToText,
    TextToSpeech
}

public enum ModelModality
{
    Text,
    Image,
    Audio,
    Video
}

public enum ModelFeature
{
    ToolCalling,
    StructuredOutput,
    Reasoning,
    FileInput,
    ComputerUse,
    JsonOutput
}

public enum InteractionMode
{
    RequestResponse,
    Streaming,
    Realtime
}

public enum ModelLifecycle
{
    GenerallyAvailable,
    Preview,
    Legacy,
    Deprecated
}
