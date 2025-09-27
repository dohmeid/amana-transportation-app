import React from 'react';

const HeroSection = () => {
  return (
    <section className="relative bg-cover bg-center text-white text-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=2069')" }}>
      {/* Overlay */}
      <div className="absolute inset-0 bg-purple-900 opacity-60"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 md:py-48">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-extrabold sm:text-5xl md:text-6xl lg:text-7xl">
            Amana Transportation
          </h1>
          <p className="mt-4 text-lg md:text-xl lg:text-2xl max-w-3xl mx-auto">
            Proudly Serving Malaysian Bus Riders Since 2019!
          </p>
          <div className="mt-8">
            <button
              className="inline-block bg-purple-600 text-white font-bold py-3 px-8 rounded-lg text-lg hover:bg-purple-700 cursor-pointer transition duration-300 ease-in-out transform hover:scale-105"
            >
              Book Your Ticket
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
