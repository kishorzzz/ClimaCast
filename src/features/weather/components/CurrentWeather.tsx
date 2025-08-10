import { WeatherIcon } from './WeatherIcon';
import { Droplets, Wind, Sunrise, Sunset } from 'lucide-react';
import { WeatherData, WeatherCondition } from '../types';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface CurrentWeatherProps {
  data: WeatherData | null;
  isLoading: boolean;
}

export function CurrentWeather({ data, isLoading }: CurrentWeatherProps) {
  if (isLoading) {
    return <WeatherSkeleton />;
  }

  if (!data) {
    return null;
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const weatherMain = data.weather[0]?.main as WeatherCondition;
  const getWeatherGradient = () => {
    if (['Clear'].includes(weatherMain)) {
      return 'weather-gradient-warm';
    }
    if (['Snow', 'Rain', 'Drizzle', 'Thunderstorm'].includes(weatherMain)) {
      return 'weather-gradient-cold';
    }
    return 'weather-gradient-cloudy';
  };

  return (
    <Card className={`weather-card ${getWeatherGradient()} text-white relative mb-6`}>
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <div>
          <h2 className="text-xl font-medium flex items-center gap-2">
            {data.name}, {data.sys.country}
          </h2>
          <p className="text-sm opacity-90">
            {new Date(data.dt * 1000).toLocaleDateString(undefined, {
              weekday: 'long',
              year: 'numeric', 
              month: 'long', 
              day: 'numeric'
            })}
          </p>
          
          <div className="flex items-center gap-2 mt-4">
            <div className="weather-icon-container bg-white/20">
              <WeatherIcon condition={weatherMain} size={36} />
            </div>
            <div>
              <p className="text-sm font-medium">{data.weather[0]?.description}</p>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-5xl font-bold">
            {Math.round(data.main.temp)}°C
          </div>
          <p className="text-sm opacity-90">
            Feels like {Math.round(data.main.feels_like)}°C
          </p>
          <div className="flex gap-4 justify-end mt-2">
            <div className="text-sm opacity-90">
              {Math.round(data.main.temp_min)}° / {Math.round(data.main.temp_max)}°
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6 bg-black/10 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <Droplets className="h-4 w-4 opacity-90" />
          <span className="text-sm">Humidity: {data.main.humidity}%</span>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="h-4 w-4 opacity-90" />
          <span className="text-sm">Wind: {data.wind.speed} m/s</span>
        </div>
        <div className="flex items-center gap-2">
          <Sunrise className="h-4 w-4 opacity-90" />
          <span className="text-sm">Rise: {formatTime(data.sys.sunrise)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Sunset className="h-4 w-4 opacity-90" />
          <span className="text-sm">Set: {formatTime(data.sys.sunset)}</span>
        </div>
      </div>
    </Card>
  );
}

function WeatherSkeleton() {
  return (
    <Card className="weather-card weather-gradient-cloudy text-white relative mb-6">
      <div className="flex flex-col md:flex-row md:justify-between gap-4">
        <div>
          <Skeleton className="h-7 w-40 bg-white/20 mb-2" />
          <Skeleton className="h-5 w-60 bg-white/20" />
          
          <div className="flex items-center gap-2 mt-4">
            <Skeleton className="h-12 w-12 rounded-full bg-white/20" />
            <Skeleton className="h-5 w-32 bg-white/20" />
          </div>
        </div>
        
        <div className="text-right">
          <Skeleton className="h-12 w-24 bg-white/20 ml-auto mb-2" />
          <Skeleton className="h-5 w-36 bg-white/20 ml-auto mb-2" />
          <Skeleton className="h-5 w-20 bg-white/20 ml-auto" />
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-6 bg-black/10 rounded-lg p-3">
        {[...Array(4)].map((_, i) => (
          <Skeleton key={i} className="h-6 w-full bg-white/20" />
        ))}
      </div>
    </Card>
  );
}