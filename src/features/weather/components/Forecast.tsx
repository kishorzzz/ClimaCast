import { ForecastData, WeatherCondition } from '../types';
import { WeatherIcon } from './WeatherIcon';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface ForecastProps {
  data: ForecastData | null;
  isLoading: boolean;
}

export function Forecast({ data, isLoading }: ForecastProps) {
  if (isLoading) {
    return <ForecastSkeleton />;
  }

  if (!data || !data.list) {
    return null;
  }

  // Create a filtered list for the forecast (one entry per day)
  const filteredForecast = data.list.filter((item, index, self) => {
    const date = new Date(item.dt * 1000).toLocaleDateString();
    const today = new Date().toLocaleDateString();
    
    // Skip today's forecast
    if (date === today) {
      return false;
    }
    
    // Include only one forecast per day (noon forecast)
    return index === self.findIndex((t) => {
      const itemDate = new Date(t.dt * 1000).toLocaleDateString();
      return itemDate === date;
    }) && self.findIndex((t) => {
      const itemTime = new Date(t.dt * 1000).getHours();
      const itemDate = new Date(t.dt * 1000).toLocaleDateString();
      return itemDate === date && itemTime >= 12 && itemTime <= 14;
    }) !== -1;
  });

  // Take only the first 5 days
  const fiveDayForecast = filteredForecast.slice(0, 5);

  return (
    <div>
      <h2 className="text-xl font-medium mb-4">5-Day Forecast</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {fiveDayForecast.map((item) => {
          const date = new Date(item.dt * 1000);
          const weatherMain = item.weather[0]?.main as WeatherCondition;
          
          return (
            <Card key={item.dt} className="p-4 flex flex-col items-center">
              <p className="text-sm font-medium">
                {date.toLocaleDateString(undefined, { weekday: 'short' })}
              </p>
              <p className="text-xs text-muted-foreground mb-2">
                {date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
              </p>
              <div className="my-2">
                <WeatherIcon condition={weatherMain} size={36} />
              </div>
              <p className="text-lg font-semibold">{Math.round(item.main.temp)}°C</p>
              <p className="text-xs text-muted-foreground mt-1">
                {item.weather[0]?.description}
              </p>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

function ForecastSkeleton() {
  return (
    <div>
      <Skeleton className="h-8 w-40 mb-4" />
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="p-4 flex flex-col items-center">
            <Skeleton className="h-5 w-16 mb-1" />
            <Skeleton className="h-4 w-20 mb-3" />
            <Skeleton className="h-10 w-10 rounded-full mb-3" />
            <Skeleton className="h-6 w-12 mb-1" />
            <Skeleton className="h-4 w-24" />
          </Card>
        ))}
      </div>
    </div>
  );
}