import React from "react";

interface StatsCardProps {
  stats: {
    totalTasks: number;
    completedTasks: number;
    progress: number;
  };
  title?: string;
  color?: "green" | "purple";
}

const StatsCard: React.FC<StatsCardProps> = ({
  stats,
  title = "Learning Progress",
  color = "green",
}) => {
  const colors = {
    green: {
      gradient: "from-green-500 to-blue-500",
      bg: "bg-green-50",
      text: "text-green-600",
      progress: "bg-green-500",
      light: "bg-green-100",
      dark: "text-green-700",
    },
    purple: {
      gradient: "from-purple-500 to-pink-500",
      bg: "bg-purple-50",
      text: "text-purple-600",
      progress: "bg-purple-500",
      light: "bg-purple-100",
      dark: "text-purple-700",
    },
  };

  const currentColor = colors[color];

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <h2 className="text-xl font-bold text-gray-800 mb-4">{title}</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Progress Bar */}
        <div className="md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-700 font-medium">Overall Progress</span>
            <span className={`font-bold ${currentColor.text}`}>
              {stats.progress}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-4">
            <div
              className={`bg-gradient-to-r ${currentColor.gradient} h-4 rounded-full transition-all duration-500`}
              style={{ width: `${stats.progress}%` }}
            ></div>
          </div>
          <p className="text-gray-600 text-sm mt-2">
            {stats.completedTasks} of {stats.totalTasks} tasks completed
          </p>
        </div>

        {/* Stats Numbers */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {stats.totalTasks}
            </div>
            <div className="text-sm text-gray-600">Total Tasks</div>
          </div>
          <div className={`text-center p-3 ${currentColor.bg} rounded-lg`}>
            <div className={`text-2xl font-bold ${currentColor.text}`}>
              {stats.completedTasks}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
        </div>
      </div>

      {/* Motivation Text */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-700 text-sm">
          {stats.progress === 0 &&
            "🚀 Start your learning journey today! Complete your first task to begin."}
          {stats.progress > 0 &&
            stats.progress < 25 &&
            "📚 Great start! Keep going at your own pace."}
          {stats.progress >= 25 &&
            stats.progress < 50 &&
            "🔥 Good progress! You're building a solid foundation."}
          {stats.progress >= 50 &&
            stats.progress < 75 &&
            "⚡ Excellent! You're halfway through the roadmap."}
          {stats.progress >= 75 &&
            stats.progress < 100 &&
            "🎯 Almost there! You're mastering the track."}
          {stats.progress === 100 &&
            "🏆 Congratulations! You've completed the entire roadmap!"}
        </p>
      </div>
    </div>
  );
};

export default StatsCard;
