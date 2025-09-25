import React from 'react';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section id="home" className="bg-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Split Expenses. Settle Bills. Stay Stress-Free.
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Track group expenses, auto-calculate who owes whom, and settle payments easily.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/register">
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-medium text-lg">
              Get Started
            </button>
          </Link>
          
        </div>
      </div>
    </section>
  );
}
