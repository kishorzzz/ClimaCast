import { useState, FormEvent } from 'react';
import { Search, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useWeatherStore } from '../store/weather-store';

export function SearchBar() {
  const { toast } = useToast();
  const [search, setSearch] = useState('');
  const { fetchWeatherByCity, fetchWeatherByLocation, isLoading } = useWeatherStore();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!search.trim()) {
      toast({
        variant: "destructive",
        title: "Search field is empty",
        description: "Please enter a city name",
      });
      return;
    }
    
    fetchWeatherByCity(search);
    fetchForecast(search);
  };

  const fetchForecast = (city: string) => {
    useWeatherStore.getState().fetchForecast(city);
  };

  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      toast({
        variant: "destructive",
        title: "Geolocation not supported",
        description: "Your browser does not support geolocation",
      });
      return;
    }

    toast({
      title: "Getting your location",
      description: "Please wait while we fetch your coordinates",
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        fetchWeatherByLocation(latitude, longitude);
        toast({
          title: "Location found",
          description: "Fetching weather for your location",
        });
      },
      (error) => {
        toast({
          variant: "destructive",
          title: "Location error",
          description: error.message,
        });
      }
    );
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      className="flex w-full max-w-md gap-2"
    >
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search city..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 pr-4 w-full rounded-xl"
          disabled={isLoading}
        />
      </div>
      <Button type="submit" disabled={isLoading} className="rounded-xl">
        Search
      </Button>
      <Button 
        type="button" 
        variant="outline" 
        onClick={handleGetLocation}
        disabled={isLoading}
        className="rounded-xl"
      >
        <MapPin className="h-4 w-4" />
        <span className="sr-only">Use my location</span>
      </Button>
    </form>
  );
}