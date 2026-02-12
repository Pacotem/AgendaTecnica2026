import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-auto py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
        <p>&copy; {new Date().getFullYear()} IBM SPGI. Internal Training Catalog.</p>
        <p className="mt-2">IBM Confidential - For Internal Use and Business Partners Only.</p>
      </div>
    </footer>
  );
};