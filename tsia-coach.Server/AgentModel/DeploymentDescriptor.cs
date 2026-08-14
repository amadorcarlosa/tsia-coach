namespace TsiaCoach.Server.AgentModel;

public sealed record FoundryDeploymentDescriptor(
    FoundryDeploymentName Name,
    string ModelName,
    string ModelVersion,
    string DisplayName,
    ModelProvider Provider,
    ModelLifecycle Lifecycle,
    IReadOnlyList<ModelApi> SupportedApis,
    IReadOnlyList<ModelOperation> Operations,
    IReadOnlyList<ModelModality> InputModalities,
    IReadOnlyList<ModelModality> OutputModalities,
    IReadOnlyList<ModelFeature> Features,
    IReadOnlyList<InteractionMode> InteractionModes);

public static class FoundryDeployments
{
    public static class Gpt
    {
        public static readonly FoundryDeploymentDescriptor FiveSixSol = new(
            Name: new("gpt-5.6-sol"),
            ModelName: "gpt-5.6-sol",
            ModelVersion: "2026-07-09",
            DisplayName: "GPT 5.6 Sol",
            Provider: ModelProvider.OpenAI,
            Lifecycle: ModelLifecycle.GenerallyAvailable,
            SupportedApis:
            [
                ModelApi.Responses,
                ModelApi.ChatCompletions
            ],
            Operations:
            [
                ModelOperation.Chat
            ],
            InputModalities:
            [
                ModelModality.Text,
                ModelModality.Image
            ],
            OutputModalities:
            [
                ModelModality.Text
            ],
            Features:
            [
                ModelFeature.Reasoning,
                ModelFeature.ToolCalling,
                ModelFeature.StructuredOutput,
                ModelFeature.FileInput,
                ModelFeature.ComputerUse
            ],
            InteractionModes:
            [
                InteractionMode.RequestResponse,
                InteractionMode.Streaming
            ]);

        public static readonly FoundryDeploymentDescriptor FiveChat = new(
            Name: new("gpt-5-chat"),
            ModelName: "gpt-chat-latest",
            ModelVersion: "2026-05-05",
            DisplayName: "GPT 5 Chat",
            Provider: ModelProvider.OpenAI,
            Lifecycle: ModelLifecycle.Preview,
            SupportedApis:
            [
                ModelApi.Responses,
                ModelApi.ChatCompletions
            ],
            Operations:
            [
                ModelOperation.Chat
            ],
            InputModalities:
            [
                ModelModality.Text
            ],
            OutputModalities:
            [
                ModelModality.Text
            ],
            Features:
            [
                ModelFeature.Reasoning,
                ModelFeature.ToolCalling,
                ModelFeature.StructuredOutput
            ],
            InteractionModes:
            [
                InteractionMode.RequestResponse
            ]);

        public static readonly FoundryDeploymentDescriptor FiveNano = new(
            Name: new("gpt-5-nano"),
            ModelName: "gpt-5-nano",
            ModelVersion: "2025-08-07",
            DisplayName: "GPT 5 Nano",
            Provider: ModelProvider.OpenAI,
            Lifecycle: ModelLifecycle.GenerallyAvailable,
            SupportedApis:
            [
                ModelApi.Responses,
                ModelApi.ChatCompletions
            ],
            Operations:
            [
                ModelOperation.Chat
            ],
            InputModalities:
            [
                ModelModality.Text,
                ModelModality.Image
            ],
            OutputModalities:
            [
                ModelModality.Text
            ],
            Features:
            [
                ModelFeature.Reasoning,
                ModelFeature.ToolCalling,
                ModelFeature.StructuredOutput
            ],
            InteractionModes:
            [
                InteractionMode.RequestResponse
            ]);

        public static readonly FoundryDeploymentDescriptor FourOne = new(
            Name: new("gpt-4.1"),
            ModelName: "gpt-4.1",
            ModelVersion: "2025-04-14",
            DisplayName: "GPT 4.1",
            Provider: ModelProvider.OpenAI,
            Lifecycle: ModelLifecycle.Legacy,
            SupportedApis:
            [
                ModelApi.Responses,
                ModelApi.ChatCompletions
            ],
            Operations:
            [
                ModelOperation.Chat
            ],
            InputModalities:
            [
                ModelModality.Text,
                ModelModality.Image
            ],
            OutputModalities:
            [
                ModelModality.Text
            ],
            Features:
            [
                ModelFeature.ToolCalling,
                ModelFeature.StructuredOutput
            ],
            InteractionModes:
            [
                InteractionMode.RequestResponse,
                InteractionMode.Streaming
            ]);
    }

    public static class Claude
    {
        public static readonly FoundryDeploymentDescriptor OpusFive = new(
            Name: new("claude-opus-5"),
            ModelName: "claude-opus-5",
            ModelVersion: "2",
            DisplayName: "Claude Opus 5",
            Provider: ModelProvider.Anthropic,
            Lifecycle: ModelLifecycle.GenerallyAvailable,
            SupportedApis:
            [
                ModelApi.AnthropicMessages
            ],
            Operations:
            [
                ModelOperation.Chat
            ],
            InputModalities:
            [
                ModelModality.Text
            ],
            OutputModalities:
            [
                ModelModality.Text
            ],
            Features: [],
            InteractionModes:
            [
                InteractionMode.RequestResponse
            ]);

        public static readonly FoundryDeploymentDescriptor SonnetFourFive = new(
            Name: new("claude-sonnet-4-5"),
            ModelName: "claude-sonnet-4-5",
            ModelVersion: "20250929",
            DisplayName: "Claude Sonnet 4.5",
            Provider: ModelProvider.Anthropic,
            Lifecycle: ModelLifecycle.GenerallyAvailable,
            SupportedApis:
            [
                ModelApi.AnthropicMessages
            ],
            Operations:
            [
                ModelOperation.Chat
            ],
            InputModalities:
            [
                ModelModality.Text,
                ModelModality.Image
            ],
            OutputModalities:
            [
                ModelModality.Text
            ],
            Features:
            [
                ModelFeature.Reasoning,
                ModelFeature.ToolCalling,
                ModelFeature.FileInput,
                ModelFeature.ComputerUse
            ],
            InteractionModes:
            [
                InteractionMode.RequestResponse
            ]);

        public static readonly FoundryDeploymentDescriptor SonnetFourFiveSecondary = new(
            Name: new("claude-sonnet-4-5-2"),
            ModelName: "claude-sonnet-4-5",
            ModelVersion: "20250929",
            DisplayName: "Claude Sonnet 4.5 Secondary",
            Provider: ModelProvider.Anthropic,
            Lifecycle: ModelLifecycle.GenerallyAvailable,
            SupportedApis:
            [
                ModelApi.AnthropicMessages
            ],
            Operations:
            [
                ModelOperation.Chat
            ],
            InputModalities:
            [
                ModelModality.Text,
                ModelModality.Image
            ],
            OutputModalities:
            [
                ModelModality.Text
            ],
            Features:
            [
                ModelFeature.Reasoning,
                ModelFeature.ToolCalling,
                ModelFeature.FileInput,
                ModelFeature.ComputerUse
            ],
            InteractionModes:
            [
                InteractionMode.RequestResponse
            ]);
    }

    public static class DeepSeek
    {
        public static readonly FoundryDeploymentDescriptor V4Pro = new(
            Name: new("DeepSeek-V4-Pro"),
            ModelName: "DeepSeek-V4-Pro",
            ModelVersion: "2026-04-23",
            DisplayName: "DeepSeek V4 Pro",
            Provider: ModelProvider.DeepSeek,
            Lifecycle: ModelLifecycle.GenerallyAvailable,
            SupportedApis:
            [
                ModelApi.Responses
            ],
            Operations:
            [
                ModelOperation.Chat
            ],
            InputModalities:
            [
                ModelModality.Text
            ],
            OutputModalities:
            [
                ModelModality.Text
            ],
            Features:
            [
                ModelFeature.Reasoning,
                ModelFeature.JsonOutput
            ],
            InteractionModes:
            [
                InteractionMode.RequestResponse
            ]);

        public static readonly FoundryDeploymentDescriptor R1May2028 = new(
            Name: new("DeepSeek-R1-0528"),
            ModelName: "DeepSeek-R1-0528",
            ModelVersion: "1",
            DisplayName: "DeepSeek R1 0528",
            Provider: ModelProvider.DeepSeek,
            Lifecycle: ModelLifecycle.Deprecated,
            SupportedApis:
            [
                ModelApi.Responses
            ],
            Operations:
            [
                ModelOperation.Chat
            ],
            InputModalities:
            [
                ModelModality.Text
            ],
            OutputModalities:
            [
                ModelModality.Text
            ],
            Features:
            [
                ModelFeature.Reasoning
            ],
            InteractionModes:
            [
                InteractionMode.RequestResponse
            ]);
    }

    public static class Embeddings
    {
        public static readonly FoundryDeploymentDescriptor Small3 = new(
            Name: new("text-embedding-3-small"),
            ModelName: "text-embedding-3-small",
            ModelVersion: "1",
            DisplayName: "Text Embedding 3 Small",
            Provider: ModelProvider.OpenAI,
            Lifecycle: ModelLifecycle.GenerallyAvailable,
            SupportedApis:
            [
                ModelApi.Embeddings
            ],
            Operations:
            [
                ModelOperation.Embedding
            ],
            InputModalities:
            [
                ModelModality.Text
            ],
            OutputModalities: [],
            Features: [],
            InteractionModes:
            [
                InteractionMode.RequestResponse
            ]);

        public static readonly FoundryDeploymentDescriptor Large3 = new(
            Name: new("text-embedding-3-large-919921"),
            ModelName: "text-embedding-3-large",
            ModelVersion: "1",
            DisplayName: "Text Embedding 3 Large",
            Provider: ModelProvider.OpenAI,
            Lifecycle: ModelLifecycle.GenerallyAvailable,
            SupportedApis:
            [
                ModelApi.Embeddings
            ],
            Operations:
            [
                ModelOperation.Embedding
            ],
            InputModalities:
            [
                ModelModality.Text
            ],
            OutputModalities: [],
            Features: [],
            InteractionModes:
            [
                InteractionMode.RequestResponse
            ]);
    }

    public static IReadOnlyList<FoundryDeploymentDescriptor> All { get; } =
    [
        Gpt.FiveSixSol,
        Gpt.FiveChat,
        Gpt.FiveNano,
        Gpt.FourOne,

        Claude.OpusFive,
        Claude.SonnetFourFive,
        Claude.SonnetFourFiveSecondary,

        DeepSeek.V4Pro,
        DeepSeek.R1May2028,

        Embeddings.Small3,
        Embeddings.Large3
    ];
}