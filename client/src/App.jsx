import { useState } from 'react';
import WeatherModule from './components/WeatherModule';
import CurrencyConverter from './components/CurrencyConverter';
import QuoteGenerator from './components/QuoteGenerator';

function App() {
  const [activeTab, setActiveTab] = useState('weather');

  const tabs = [
    { id: 'weather', label: 'Weather', component: WeatherModule },
    { id: 'currency', label: 'Currency', component: CurrencyConverter },
    { id: 'quote', label: 'Quote', component: QuoteGenerator },
  ];

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-center mb-8">InfoHub</h1>
        
        <div className="flex justify-center space-x-4 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-lg ${
                activeTab === tab.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="mt-6">
          {tabs.map((tab) =>
            activeTab === tab.id ? <tab.component key={tab.id} /> : null
          )}
        </div>
      </div>
    </div>
  );
}

export default App;