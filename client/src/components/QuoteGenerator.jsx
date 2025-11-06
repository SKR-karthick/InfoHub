import { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteGenerator = () => {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQuote = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/quote`);
      setQuote(response.data);
    } catch (err) {
      console.error('Quote API Error:', err.response?.data || err.message);
      setError(err.response?.data?.error || 'Could not fetch quote');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  if (loading) return <div className="text-center p-4">Loading quote...</div>;
  if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">Motivational Quote</h2>
      <div className="space-y-4">
        <p className="text-lg italic">"{quote?.text}"</p>
        <p className="text-right text-gray-600">- {quote?.author}</p>
        <button
          onClick={fetchQuote}
          className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Get New Quote
        </button>
      </div>
    </div>
  );
};

export default QuoteGenerator;