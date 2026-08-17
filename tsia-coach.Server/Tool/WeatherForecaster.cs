using System.ComponentModel;

namespace TsiaCoach.Server.Tool;

public record WeatherForecast(DateOnly Date, int TemperatureC, string? Summary)
{
    public int TemperatureF => 32 + (int)(TemperatureC / 0.5556);
}

public static class WeatherForecastGenerator
{
    private static readonly string[] Summaries =
   [
       "Freezing", "Bracing", "Chilly", "Cool", "Mild",
        "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
   ];

    [Description("Get the weather forecast for the next several days.")]
    public static WeatherForecast[] GetForecast(
        [Description("How many days ahead to forecast, between 1 and 5.")] int days = 5)
        => Enumerable.Range(1, Math.Clamp(days, 1, 5)).Select(i =>
            new WeatherForecast(
                DateOnly.FromDateTime(DateTime.Now.AddDays(i)),
                Random.Shared.Next(-20, 55),
                Summaries[Random.Shared.Next(Summaries.Length)]))
            .ToArray();
}