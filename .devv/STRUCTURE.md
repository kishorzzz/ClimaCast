# This file is only for editing file nodes, do not break the structure

## Project Description
A responsive weather application that provides current weather conditions and 5-day forecasts for cities worldwide. Built with React, Tailwind CSS, and the OpenWeatherMap API, this app features a mobile-first design for easy access to weather data on any device.

## Key Features
- City search with current weather display
- Geolocation support for local weather
- 5-day weather forecast
- Responsive mobile-first design
- Weather-themed visual styling

/src
├── features/        # Feature modules organized by domain
│   └── weather/     # Weather feature components, hooks, and utilities
│       ├── components/  # Weather-specific components (SearchBar, CurrentWeather, Forecast)
│       ├── store/       # Weather state management with Zustand
│       └── types.ts     # TypeScript interfaces for weather data
│
├── components/      # Components directory
│   ├── ui/         # Pre-installed shadcn/ui components, avoid modifying or rewriting unless necessary
│
├── hooks/          # Custom Hooks directory
│   ├── use-mobile.ts # Pre-installed mobile detection Hook from shadcn (import { useIsMobile } from '@/hooks/use-mobile')
│   └── use-toast.ts  # Toast notification system hook for displaying toast messages (import { useToast } from '@/hooks/use-toast')
│
├── lib/            # Utility library directory
│   └── utils.ts    # Utility functions, including the cn function for merging Tailwind class names
│
├── pages/          # Page components directory, based on React Router structure
│   ├── HomePage.tsx # Home page component with weather app implementation
│   └── NotFoundPage.tsx # 404 error page component, displays when users access non-existent routes
│
├── App.tsx         # Root component, with React Router routing system configured
│                   # Add new route configurations in this file
│                   # Includes catch-all route (*) for 404 page handling
│
├── main.tsx        # Entry file, rendering the root component and mounting to the DOM
│
├── index.css       # Global styles file with weather app design system
│                   # Contains weather-specific theme colors and custom component styles
│                   # Includes weather gradient and card styling
│
└── tailwind.config.js  # Tailwind CSS v3 configuration file
                      # Contains theme customization, plugins, and content paths
                      # Includes shadcn/ui theme configuration 