import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold">🧠 PCB Learning Roadmap</h1>
            <p className="text-green-100 mt-1">
              For Software Engineers Transitioning to Hardware
            </p>
          </div>
          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                ⚡ Interactive
              </span>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                📚 Phase-based
              </span>
              <span className="text-sm bg-white/20 px-3 py-1 rounded-full">
                🎯 Progress Tracking
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
