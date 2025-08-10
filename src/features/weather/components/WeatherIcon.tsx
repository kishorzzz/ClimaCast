import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudFog,
  CloudLightning,
  CloudDrizzle,
  Wind,
  AlertCircle,
} from 'lucide-react';
import { WeatherCondition } from '../types';

interface WeatherIconProps {
  condition: WeatherCondition | string;
  className?: string;
  size?: number;
}

export function WeatherIcon({ condition, className = '', size = 24 }: WeatherIconProps) {
  // Map weather condition to appropriate icon
  switch (condition) {
    case 'Clear':
      return <Sun size={size} className={`text-accent ${className}`} />;
    case 'Clouds':
      return <Cloud size={size} className={`text-secondary-foreground ${className}`} />;
    case 'Rain':
      return <CloudRain size={size} className={`text-primary ${className}`} />;
    case 'Drizzle':
      return <CloudDrizzle size={size} className={`text-primary ${className}`} />;
    case 'Thunderstorm':
      return <CloudLightning size={size} className={`text-primary-foreground ${className}`} />;
    case 'Snow':
      return <CloudSnow size={size} className={`text-secondary ${className}`} />;
    case 'Mist':
    case 'Fog':
    case 'Haze':
      return <CloudFog size={size} className={`text-secondary-foreground ${className}`} />;
    case 'Smoke':
    case 'Dust':
    case 'Sand':
      return <Wind size={size} className={`text-secondary-foreground ${className}`} />;
    default:
      return <AlertCircle size={size} className={`text-muted-foreground ${className}`} />;
  }
}