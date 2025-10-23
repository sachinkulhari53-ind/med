
import React, { useState } from 'react';
import type { PatientInfo, AnalysisResult } from './types';
import { getMedicalAnalysis } from './services/geminiService';
import Header from './components/Header';
import PatientForm from './components/PatientForm';
import ResultsDisplay from './components/ResultsDisplay';
import Loader from './components/Loader';
import Disclaimer from './components/Disclaimer';
import Footer from './components/Footer';

const App: React.FC = () => {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalysis = async (patientInfo: PatientInfo) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const result = await getMedicalAnalysis(patientInfo);
      setAnalysisResult(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setAnalysisResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-lg border border-slate-200">
          {!analysisResult && !isLoading && (
            <PatientForm onSubmit={handleAnalysis} isLoading={isLoading} />
          )}
          {isLoading && (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <Loader />
              <p className="mt-4 text-slate-600 font-medium">Analyzing information...</p>
            </div>
          )}
          {error && (
             <div className="text-center p-8">
              <h2 className="text-2xl font-bold text-red-600 mb-4">Analysis Failed</h2>
              <p className="text-slate-600 mb-6">{error}</p>
              <button
                onClick={handleReset}
                className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
          {analysisResult && !isLoading && (
            <ResultsDisplay result={analysisResult} onReset={handleReset} />
          )}
        </div>
        <Disclaimer />
      </main>
      <Footer />
    </div>
  );
};

export default App;
