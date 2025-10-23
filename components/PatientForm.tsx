
import React, { useState } from 'react';
import type { PatientInfo } from '../types';

interface PatientFormProps {
  onSubmit: (data: PatientInfo) => void;
  isLoading: boolean;
}

const PatientForm: React.FC<PatientFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState<PatientInfo>({
    age: '',
    sex: '',
    symptoms: '',
    prescription: '',
    allergies: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const isFormValid = formData.age && formData.sex && formData.symptoms && formData.prescription;

  return (
    <div>
      <h2 className="text-2xl font-bold text-slate-700 mb-1">Patient Information Analyzer</h2>
      <p className="text-slate-500 mb-6">Enter the details below to get an AI-powered analysis.</p>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="age" className="block text-sm font-medium text-slate-700 mb-1">Patient Age</label>
            <input
              type="number"
              name="age"
              id="age"
              value={formData.age}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 45"
              required
            />
          </div>
          <div>
            <label htmlFor="sex" className="block text-sm font-medium text-slate-700 mb-1">Patient Sex</label>
            <select
              name="sex"
              id="sex"
              value={formData.sex}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              required
            >
              <option value="" disabled>Select sex</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="symptoms" className="block text-sm font-medium text-slate-700 mb-1">Primary Symptoms</label>
          <textarea
            name="symptoms"
            id="symptoms"
            rows={4}
            value={formData.symptoms}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., High fever, persistent cough, headache"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="prescription" className="block text-sm font-medium text-slate-700 mb-1">Doctor's Prescription Details</label>
          <textarea
            name="prescription"
            id="prescription"
            rows={4}
            value={formData.prescription}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="List all medications and dosages, e.g., Paracetamol 500mg, Amoxicillin 250mg"
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="allergies" className="block text-sm font-medium text-slate-700 mb-1">Known Allergies (optional)</label>
          <input
            type="text"
            name="allergies"
            id="allergies"
            value={formData.allergies}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="e.g., Penicillin, Aspirin"
          />
        </div>

        <div className="text-right">
          <button
            type="submit"
            disabled={isLoading || !isFormValid}
            className="inline-flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Analyzing...' : 'Analyze Now'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
