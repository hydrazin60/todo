import React from "react";
import { Target, Trophy, TrendingUp, BarChart3 } from "lucide-react";

interface ComparisonStatsProps {
  pcbStats: {
    totalTasks: number;
    completedTasks: number;
    progress: number;
  };
  aimlStats: {
    totalTasks: number;
    completedTasks: number;
    progress: number;
  };
}

const ComparisonStats: React.FC<ComparisonStatsProps> = ({
  pcbStats,
  aimlStats,
}) => {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md p-6 border border-gray-200 mb-8">
      <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
        <BarChart3 className="w-6 h-6 mr-2 text-blue-500" />
        Learning Tracks Comparison
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Overall Progress */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <Target className="w-5 h-5 text-blue-500" />
            <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-700 rounded">
              Overall
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {Math.round((pcbStats.progress + aimlStats.progress) / 2)}%
          </p>
          <p className="text-sm text-gray-600 mt-1">Combined Progress</p>
        </div>

        {/* PCB Design Stats */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-5 h-5 text-green-500" />
            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded">
              PCB Design
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {pcbStats.completedTasks}/{pcbStats.totalTasks}
          </p>
          <p className="text-sm text-gray-600 mt-1">Tasks Completed</p>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${pcbStats.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 text-right mt-1">
              {pcbStats.progress}%
            </p>
          </div>
        </div>

        {/* AI/ML Stats */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <span className="text-xs font-medium px-2 py-1 bg-purple-100 text-purple-700 rounded">
              AI/ML
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800">
            {aimlStats.completedTasks}/{aimlStats.totalTasks}
          </p>
          <p className="text-sm text-gray-600 mt-1">Tasks Completed</p>
          <div className="mt-2">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${aimlStats.progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 text-right mt-1">
              {aimlStats.progress}%
            </p>
          </div>
        </div>

        {/* Speed Comparison */}
        <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <Trophy className="w-5 h-5 text-yellow-500" />
            <span className="text-xs font-medium px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
              Comparison
            </span>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">PCB Pace:</span>
              <span
                className={`text-sm font-medium ${
                  pcbStats.progress > aimlStats.progress
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {pcbStats.progress > aimlStats.progress ? "Faster" : "Slower"}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">AI/ML Pace:</span>
              <span
                className={`text-sm font-medium ${
                  aimlStats.progress > pcbStats.progress
                    ? "text-purple-600"
                    : "text-gray-600"
                }`}
              >
                {aimlStats.progress > pcbStats.progress ? "Faster" : "Slower"}
              </span>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-3">
            {pcbStats.progress > aimlStats.progress
              ? "Leading in PCB Design track"
              : aimlStats.progress > pcbStats.progress
                ? "Leading in AI/ML track"
                : "Both tracks progressing equally"}
          </p>
        </div>
      </div>

      {/* Progress Comparison Bar */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <h4 className="text-sm font-medium text-gray-700 mb-3">
          Progress Comparison
        </h4>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>PCB Design</span>
              <span>{pcbStats.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${pcbStats.progress}%` }}
              ></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm text-gray-600 mb-1">
              <span>AI/ML</span>
              <span>{aimlStats.progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div
                className="bg-gradient-to-r from-purple-500 to-purple-600 h-4 rounded-full transition-all duration-500"
                style={{ width: `${aimlStats.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComparisonStats;
