
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="text-center py-6 mt-8">
      <p className="text-sm text-slate-500">
        &copy; {new Date().getFullYear()} MediSort AI. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
