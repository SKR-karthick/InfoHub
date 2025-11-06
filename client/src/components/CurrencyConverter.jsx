import { useState } from 'react';
import axios from 'axios';

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [convertedValues, setConvertedValues] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConvert = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount greater than 0');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/currency?amount=${amount}`, {
        timeout: 10000 // 10 seconds timeout
      });
      setConvertedValues(response.data);
    } catch (err) {
      setError('Could not fetch conversion rates');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Currency Converter</h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Amount (INR)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount in INR"
            className="mt-1 p-2 w-full border rounded"
          />
        </div>
        <button
          onClick={handleConvert}
          disabled={loading}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? 'Converting...' : 'Convert'}
        </button>
        {error && <p className="text-red-500">{error}</p>}
        {convertedValues && (
          <div className="mt-4 space-y-2">
            <p>USD: ${convertedValues.usd}</p>
            <p>EUR: €{convertedValues.eur}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;