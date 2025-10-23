
import React from 'react';
import type { AnalysisResult } from '../types';

interface ResultsDisplayProps {
  result: AnalysisResult;
  onReset: () => void;
}

const ResultsDisplay: React.FC<ResultsDisplayProps> = ({ result, onReset }) => {
  const getRecommendationColor = (recommendation: string) => {
    if (recommendation.toLowerCase().includes('hospitalization')) {
      return 'border-red-500 bg-red-50 text-red-800';
    }
    if (recommendation.toLowerCase().includes('follow-up')) {
      return 'border-yellow-500 bg-yellow-50 text-yellow-800';
    }
    return 'border-green-500 bg-green-50 text-green-800';
  };
  
  return (
    <div className="animate-fade-in">
      <h2 className="text-3xl font-bold text-slate-800 mb-6 text-center">Analysis Complete</h2>

      <div className={`p-4 rounded-lg border-l-4 mb-8 ${getRecommendationColor(result.recommendation)}`}>
        <h3 className="text-lg font-bold">Recommendation</h3>
        <p className="mt-1">{result.recommendation}</p>
      </div>
      
      <div className="space-y-8">
        <div>
          <h3 className="text-xl font-semibold text-slate-700 mb-3 border-b pb-2">Suspected Condition</h3>
          <p className="text-lg font-medium text-blue-700">{result.suspectedCondition}</p>
        </div>
        
        <div>
          <h3 className="text-xl font-semibold text-slate-700 mb-3 border-b pb-2">Detailed Explanation</h3>
          <p className="text-slate-600 leading-relaxed">{result.detailedExplanation}</p>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-slate-700 mb-4 border-b pb-2">Medication Analysis</h3>
          <div className="space-y-4">
            {result.medications.map((med, index) => (
              <div key={index} className="p-4 border border-slate-200 rounded-lg bg-slate-50">
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-semibold text-slate-800">{med.name}</h4>
                  {med.isFastActing && (
                     <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                      Fast-Acting
                    </span>
                  )}
                </div>
                <p className="text-slate-600 mt-1">{med.purpose}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 text-center">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-slate-600 text-white font-semibold rounded-lg shadow-md hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-offset-2 transition-colors"
        >
          Start New Analysis
        </button>
      </div>
    </div>
  );
};

export default ResultsDisplay;
