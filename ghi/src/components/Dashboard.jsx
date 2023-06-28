import React from 'react';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
      <div className="p-8 bg-white shadow-lg rounded-lg text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-8 text-gray-800">Dashboard is under construction 🚧</h1>
        <p className="mb-8 text-xl md:text-2xl text-gray-700">Check back soon!</p>
        <div className="text-xl md:text-2xl font-mono">
          <pre>
            {`
              🏗️
           🚧🚧🚧🚧
    🏢🏦🏪🏬🏫🏨
            `}
          </pre>
        </div>
        <p className="mt-12 text-lg text-gray-700">Don't worry, I'm still working on your site, Dad! 🛠️</p>
      </div>
    </div>
  );
};

export default Dashboard;
