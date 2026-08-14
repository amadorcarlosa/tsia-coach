import type { WeatherForecast } from './type';
import WeatherForecastList from './WeatherForecastList';

async function getForecasts(): Promise<WeatherForecast[]> {
  const apiUrl = process.env.API_URL;

  if (!apiUrl) {
    throw new Error('API_URL environment variable is not set');
  }

  const response = await fetch(`${apiUrl}/api/weatherforecast`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error(`Weather forecast request failed: ${response.status}`);
  }

  return response.json();
}

export default async function WeatherPage() {
  const forecasts = await getForecasts();

  return (
    <main>
      <h1>Weather Forecast</h1>
      <WeatherForecastList forecasts={forecasts} />
    </main>
  );
}
