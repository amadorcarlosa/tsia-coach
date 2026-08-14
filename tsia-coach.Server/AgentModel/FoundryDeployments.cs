namespace TsiaCoach.Server.AgentModel;







public static class FoundryDeploymentCatalog
{
    public static class Gpt
    {
        public static readonly FoundryDeploymentName Gpt56Sol =
            new("gpt-5.6-sol");

        public static readonly FoundryDeploymentName Gpt5Chat =
            new("gpt-5-chat");

        public static readonly FoundryDeploymentName Gpt5Nano =
            new("gpt-5-nano");

        public static readonly FoundryDeploymentName Gpt41 =
            new("gpt-4.1");
    }

    public static class Claude
    {
        public static readonly FoundryDeploymentName Opus5 =
            new("claude-opus-5");

        public static readonly FoundryDeploymentName Sonnet45 =
            new("claude-sonnet-4-5");

        public static readonly FoundryDeploymentName Sonnet452 =
            new("claude-sonnet-4-5-2");
    }

    public static class DeepSeek
    {
        public static readonly FoundryDeploymentName V4Pro =
            new("DeepSeek-V4-Pro");

        public static readonly FoundryDeploymentName R1_0528 =
            new("DeepSeek-R1-0528");
    }

    public static class Embeddings
    {
        public static readonly FoundryDeploymentName Small3 =
            new("text-embedding-3-small");

        public static readonly FoundryDeploymentName Large3 =
            new("text-embedding-3-large-919921");
    }
}