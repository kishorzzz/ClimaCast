import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { WeatherData, ForecastData } from '../types';

const WEATHER_API_KEY = 'bd5e378503939ddaee76f12ad7a97608'; // OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

interface WeatherStore {
  // State
  weather: WeatherData | null;
  forecast: ForecastData | null;
  isLoading: boolean;
  error: string | null;
  lastSearched: string | null;
  
  // Actions
  fetchWeatherByCity: (city: string) => Promise<void>;
  fetchWeatherByLocation: (lat: number, lon: number) => Promise<void>;
  fetchForecast: (city: string) => Promise<void>;
  resetError: () => void;
}

export const useWeatherStore = create<WeatherStore>()(
  persist(
    (set) => ({
      weather: null,
      forecast: null,
      isLoading: false,
      error: null,
      lastSearched: null,
      
      fetchWeatherByCity: async (city) => {
        try {
          set({ isLoading: true, error: null });
          console.log(`Fetching weather for city: ${city}`);
          const response = await fetch(
            `${BASE_URL}/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
          );
          console.log('Weather API response status:', response.status);
          
          if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            
            // Check for specific API key error
            if (response.status === 401 || (errorData && errorData.cod === 401)) {
              throw new Error('API key error. Please check your OpenWeatherMap API key.');
            }
            
            throw new Error('City not found. Please try another location.');
          }
          
          const data: WeatherData = await response.json();
          set({ 
            weather: data, 
            isLoading: false,
            lastSearched: city
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch weather data', 
            isLoading: false 
          });
        }
      },
      
      fetchWeatherByLocation: async (lat, lon) => {
        try {
          set({ isLoading: true, error: null });
          const response = await fetch(
            `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_API_KEY}`
          );
          
          if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            
            // Check for specific API key error
            if (response.status === 401 || (errorData && errorData.cod === 401)) {
              throw new Error('API key error. Please check your OpenWeatherMap API key.');
            }
            
            throw new Error('Could not fetch weather for your location.');
          }
          
          const data: WeatherData = await response.json();
          set({ 
            weather: data, 
            isLoading: false,
            lastSearched: data.name
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch weather data', 
            isLoading: false 
          });
        }
      },
      
      fetchForecast: async (city) => {
        try {
          set({ isLoading: true, error: null });
          console.log(`Fetching forecast for city: ${city}`);
          const response = await fetch(
            `${BASE_URL}/forecast?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
          );
          console.log('Forecast API response status:', response.status);
          
          if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            
            // Check for specific API key error
            if (response.status === 401 || (errorData && errorData.cod === 401)) {
              throw new Error('API key error. Please check your OpenWeatherMap API key.');
            }
            
            throw new Error('Forecast data not available for this location.');
          }
          
          const data: ForecastData = await response.json();
          set({ 
            forecast: data, 
            isLoading: false
          });
        } catch (error) {
          set({ 
            error: error instanceof Error ? error.message : 'Failed to fetch forecast data', 
            isLoading: false 
          });
        }
      },
      
      resetError: () => set({ error: null })
    }),
    {
      name: 'weather-storage',
      // Only store last searched city and not the full weather data
      partialize: (state) => ({ 
        lastSearched: state.lastSearched
      })
    }
  )
);