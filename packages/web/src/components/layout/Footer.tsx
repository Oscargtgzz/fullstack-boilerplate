import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-700 text-slate-300 py-8 text-center">
      <div className="container mx-auto px-4">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} Your Company Name. All rights reserved.
        </p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-teal-400 text-xs">Privacy Policy</a>
          <a href="#" className="hover:text-teal-400 text-xs">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
