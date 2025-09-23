import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <p>&copy; {new Date().getFullYear()} Amana Transportation. All rights reserved.</p>
        <p className="mt-2 text-gray-400">Connecting Kuala Lumpur and beyond.</p>
      </div>
    </footer>
  );
};

export default Footer;
