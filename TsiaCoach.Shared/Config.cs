namespace TsiaCoach.Shared;

public class Config
{

    public static class Redis
    {

        public const string ResourceName = "redis-cache";
    }
    public static class Next
    {
        public const string ApiVariableName = "API_URL";
        public const string ScriptName = "dev";

    }
    public static class Azure
    {
        public static class VariableName
        {
            public const string OpenAIEndPoint = "AZURE_OPENAI_ENDPOINT";
            public const string ProjectEndpoint = "AZURE_PROJECT_ENDPOINT";
        }
    }
    }
