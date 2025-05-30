import React, { useState } from 'react';
import axios from 'axios';

const NewsAnalyzer = () => {
    const [text, setText] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const analyzeNews = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await axios.post('http://localhost:5000/api/news/analyze', {
                text: text
            });
            setResult(response.data);
        } catch (err) {
            setError('Error analyzing news. Please try again.');
            console.error('Error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Fake News Detector</h2>
            <form onSubmit={analyzeNews} className="space-y-4">
                <div>
                    <label htmlFor="newsText" className="block text-sm font-medium text-gray-700">
                        Enter News Text
                    </label>
                    <textarea
                        id="newsText"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        rows="6"
                        placeholder="Paste your news article here..."
                        required
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    {loading ? 'Analyzing...' : 'Analyze News'}
                </button>
            </form>

            {error && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-md">
                    {error}
                </div>
            )}

            {result && (
                <div className="mt-4 p-4 bg-white rounded-md shadow">
                    <h3 className="text-lg font-medium mb-2">Analysis Result</h3>
                    <div className="space-y-2">
                        <p>
                            <span className="font-medium">Prediction:</span>{' '}
                            <span className={`font-bold ${result.prediction === 'Real' ? 'text-green-600' : 'text-red-600'}`}>
                                {result.prediction}
                            </span>
                        </p>
                        <p>
                            <span className="font-medium">Confidence:</span>{' '}
                            {(result.confidence * 100).toFixed(2)}%
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NewsAnalyzer; 