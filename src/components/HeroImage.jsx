import React from 'react';

export default function HeroImage() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-green-200 via-yellow-200 to-red-200 rounded-2xl p-12 min-h-96">
          {/* Phone mockups */}
          <div className="absolute top-8 left-8">
            <div className="w-16 h-28 bg-gray-800 rounded-lg shadow-lg"></div>
          </div>
          
          {/* Hands with receipts */}
          <div className="absolute top-12 right-16">
            <div className="w-20 h-16 bg-pink-300 rounded-full opacity-80"></div>
            <div className="w-16 h-20 bg-white rounded shadow-md mt-2"></div>
          </div>
          
          <div className="absolute top-16 left-20">
            <div className="w-18 h-14 bg-pink-300 rounded-full opacity-80"></div>
            <div className="w-14 h-18 bg-white rounded shadow-md mt-1"></div>
          </div>
          
          {/* Tablet mockup */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <div className="w-48 h-32 bg-gray-800 rounded-lg shadow-lg">
              <div className="w-full h-full bg-white rounded-lg m-1 p-2">
                <div className="space-y-1">
                  <div className="h-2 bg-gray-200 rounded"></div>
                  <div className="h-2 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </div>
            <div className="w-16 h-12 bg-pink-300 rounded-full opacity-80 absolute -top-4 -left-8"></div>
            <div className="w-16 h-12 bg-pink-300 rounded-full opacity-80 absolute -top-4 -right-8"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
