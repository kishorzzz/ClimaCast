import { useEffect } from 'react';
import { Cloud, CloudRain } from 'lucide-react';
import { SearchBar } from '@/features/weather/components/SearchBar';
import { CurrentWeather } from '@/features/weather/components/CurrentWeather';
import { Forecast } from '@/features/weather/components/Forecast';
import { ErrorDisplay } from '@/features/weather/components/ErrorDisplay';
import { useWeatherStore } from '@/features/weather/store/weather-store';
import { Card } from '@/components/ui/card';

function HomePage() {
  const { weather, forecast, isLoading, error, lastSearched, fetchWeatherByCity, fetchForecast } = useWeatherStore();

  useEffect(() => {
    // Load weather for last searched city or default to London
    if (lastSearched) {
      fetchWeatherByCity(lastSearched);
      fetchForecast(lastSearched);
    } else {
      fetchWeatherByCity('London');
      fetchForecast('London');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center p-4 md:p-6">
      <header className="w-full max-w-4xl flex flex-col items-center gap-6 py-6">
        <div className="flex items-center gap-2">
          <div className="flex">
            <Cloud className="w-8 h-8 text-primary" />
            <CloudRain className="w-8 h-8 text-primary -ml-2" />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">ClimaCast</h1>
        </div>
        <SearchBar />
      </header>
      
      <main className="w-full max-w-4xl flex-1">
        {/* Always show header content even if there's an error */}
        <div className="space-y-8">
          {error ? (
            <ErrorDisplay message={error} />
          ) : (
            <>
              <CurrentWeather data={weather} isLoading={isLoading} />
              <Forecast data={forecast} isLoading={isLoading} />
            </>
          )}
          
          {/* Fallback message if nothing renders */}
          {!error && !weather && !isLoading && (
            <Card className="p-8 text-center">
              <h2 className="text-xl font-medium">ClimaCast</h2>
              <p className="text-muted-foreground mt-2">Loading weather information...</p>
            </Card>
          )}
        </div>
      </main>
      
      <footer className="w-full max-w-4xl py-6 text-center text-sm text-muted-foreground">
        <p>ClimaCast where Weather data provided by OpenWeatherMap API</p>
      </footer>
    </div>
  );
}

export default HomePage;