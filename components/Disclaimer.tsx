
import React from 'react';

const Disclaimer: React.FC = () => {
  return (
    <div className="mt-8 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 rounded-r-lg">
      <h4 className="font-bold">Important Disclaimer</h4>
      <p className="text-sm mt-1">
        This tool is for informational and educational purposes only, designed for public awareness and to assist medical students.
        It is NOT a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
      </p>
    </div>
  );
};

export default Disclaimer;
