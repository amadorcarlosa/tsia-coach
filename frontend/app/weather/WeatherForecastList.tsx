import type { WeatherForecast } from './type';

type WeatherForecastListProps = {
  forecasts: WeatherForecast[];
};

export default function WeatherForecastList({ forecasts }: WeatherForecastListProps) {
  return (
    <ul>
      {forecasts.map((forecast) => (
        <li key={forecast.date}>
          {forecast.date}: {forecast.temperatureC}°C ({forecast.temperatureF}°F), {forecast.summary}
        </li>
      ))}
    </ul>
  );
}
