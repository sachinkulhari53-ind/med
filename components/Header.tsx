
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-slate-200">
      <div className="container mx-auto px-4 py-4 flex items-center max-w-4xl">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.176-5.97m8.352-7.324A4 4 0 0012 4.354m0 5.292c-1.667 0-3.333-1.343-5-4M12 4.354C13.667 1.343 15.333 0 17 0s3.333 1.343 5 4M4 21v-1a6 6 0 015.176-5.97m-5.176 5.97H3" />
        </svg>
        <h1 className="text-2xl font-bold text-slate-800 ml-3">MediSort AI</h1>
      </div>
    </header>
  );
};

export default Header;
