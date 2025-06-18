import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-800 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo Placeholder */}
        <div className="text-xl font-bold">
          Logo
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-teal-400">Home</a>
          <a href="#" className="hover:text-teal-400">Services</a>
          <a href="#" className="hover:text-teal-400">Cotizador</a>
        </nav>

        {/* Mobile Menu Button (Placeholder) */}
        <div className="md:hidden">
          <button className="text-white focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
