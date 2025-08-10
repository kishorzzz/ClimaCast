import { CloudOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useWeatherStore } from '../store/weather-store';

interface ErrorDisplayProps {
  message: string;
}

export function ErrorDisplay({ message }: ErrorDisplayProps) {
  const { resetError } = useWeatherStore();
  
  return (
    <Card className="p-8 flex flex-col items-center justify-center text-center gap-4">
      <CloudOff className="h-16 w-16 text-muted-foreground" />
      <div className="space-y-2">
        <h3 className="text-xl font-medium">Weather Data Unavailable</h3>
        <p className="text-muted-foreground">{message}</p>
      </div>
      <Button onClick={resetError}>Try Again</Button>
    </Card>
  );
}