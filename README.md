# InfoHub

A single-page application that brings together three everyday utilities:
- Weather Information
- Currency Conversion (INR → USD/EUR)
- Motivational Quote Generator

## Getting Started

### Prerequisites
- Node.js (LTS version)
- npm or yarn

### Installation

1. Clone the repository
2. Set up the backend:
   ```bash
   cd server
   npm install
   # Create .env file with your API keys:
   # OPENWEATHER_API_KEY=your_key
   # EXCHANGE_API_KEY=your_key
   npm run dev
   ```

3. Set up the frontend:
   ```bash
   cd client
   npm install
   npm run dev
   ```

### Environment Variables

Create a `.env` file in the server directory with the following:
```
PORT=3001
OPENWEATHER_API_KEY=your_openweather_api_key
EXCHANGE_API_KEY=your_exchange_api_key
```

## Features

### Weather Information
- Real-time weather data
- Temperature, description, humidity, and wind speed
- Search by city name

### Currency Converter
- Convert INR to USD and EUR
- Real-time exchange rates
- Simple and intuitive interface

### Quote Generator
- Motivational quotes with authors
- Get new quote on demand
- Clean and minimalist design

## Built With

- React (Vite)
- Node.js
- Express
- TailwindCSS
- Axios