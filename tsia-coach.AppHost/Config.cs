namespace TsiaCoach.AppHost;

public static class Config
{
   

    public static class WebApiServer
    {
        public const string ProjectName = "tsia-dotnet-webapi";
        public const string HealthPath = "/health";
    }


    public static class Next
    {


        public const string ProjectName = "web-frontend";

        public const string Directory = "../frontend";

        public const string EndPointName = "http";


    }
    
    public static class Azure
    {
        public static class ParameterName
        {
            public const string OpenAIEndPoint = "azure-openai-endpoint";

            public const string ProjectEndpoint = "azure-project-endpoint";
        }

    }
    
    


}

