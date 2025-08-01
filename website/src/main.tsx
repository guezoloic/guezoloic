import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import "./index.css"

// https://tailwindcss.com/plus/templates#browse

const Header: React.FC = () => {
  return (
    <div></div>
  );
};


const Footer: React.FC = () => {
  return (
    <div></div>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-gray-200 font-mono">
      <Header/>
      <Footer/>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(<App />);