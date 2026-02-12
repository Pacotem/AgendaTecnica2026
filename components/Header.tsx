import React from 'react';
import { Link } from 'react-router-dom';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#161616] text-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <span className="text-lg font-semibold tracking-wide">IBM <span className="font-light">Agenda Técnica 2026</span></span>
        </Link>
        <nav>
          <Link to="/" className="text-sm font-medium hover:text-ibm-blue transition-colors">
            Course Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
};