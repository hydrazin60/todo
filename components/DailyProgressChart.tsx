"use client";

import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { TrendingUp, Calendar } from "lucide-react";

interface DailyProgressChartProps {
  pcbData: Array<{ date: string; tasks: number }>;
  aimlData: Array<{ date: string; tasks: number }>;
}

const DailyProgressChart: React.FC<DailyProgressChartProps> = ({
  pcbData,
  aimlData,
}) => {
  // Generate sample data for last 7 days if not provided
  const defaultPcbData = [
    { date: "Mon", tasks: 4 },
    { date: "Tue", tasks: 6 },
    { date: "Wed", tasks: 8 },
    { date: "Thu", tasks: 5 },
    { date: "Fri", tasks: 9 },
    { date: "Sat", tasks: 7 },
    { date: "Sun", tasks: 10 },
  ];

  const defaultAimlData = [
    { date: "Mon", tasks: 3 },
    { date: "Tue", tasks: 5 },
    { date: "Wed", tasks: 7 },
    { date: "Thu", tasks: 4 },
    { date: "Fri", tasks: 8 },
    { date: "Sat", tasks: 6 },
    { date: "Sun", tasks: 9 },
  ];

  const pcbChartData = pcbData || defaultPcbData;
  const aimlChartData = aimlData || defaultAimlData;

  const totalPcbTasks = pcbChartData.reduce((sum, day) => sum + day.tasks, 0);
  const totalAimlTasks = aimlChartData.reduce((sum, day) => sum + day.tasks, 0);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-800">
            Weekly Progress Trend
          </h3>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-sm text-gray-600">PCB Design</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
            <span className="text-sm text-gray-600">AI/ML</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* PCB Design Chart */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-700">PCB Design Progress</h4>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-green-500" />
              <span className="text-sm font-medium text-green-600">
                {totalPcbTasks} tasks this week
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={pcbChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  label={{ value: "Tasks", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  formatter={(value) => [`${value} tasks`, "PCB Design"]}
                  labelStyle={{ color: "#374151", fontWeight: "bold" }}
                />
                <Area
                  type="monotone"
                  dataKey="tasks"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI/ML Chart */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-700">AI/ML Progress</h4>
            <div className="flex items-center space-x-2">
              <TrendingUp className="w-4 h-4 text-purple-500" />
              <span className="text-sm font-medium text-purple-600">
                {totalAimlTasks} tasks this week
              </span>
            </div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={aimlChartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                <YAxis
                  stroke="#6b7280"
                  fontSize={12}
                  label={{ value: "Tasks", angle: -90, position: "insideLeft" }}
                />
                <Tooltip
                  formatter={(value) => [`${value} tasks`, "AI/ML"]}
                  labelStyle={{ color: "#374151", fontWeight: "bold" }}
                />
                <Area
                  type="monotone"
                  dataKey="tasks"
                  stroke="#8b5cf6"
                  fill="#8b5cf6"
                  fillOpacity={0.2}
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">PCB Avg Daily</p>
                <p className="text-2xl font-bold text-gray-800">
                  {Math.round(totalPcbTasks / 7)}
                </p>
              </div>
              <div className="text-green-500">
                <TrendingUp className="w-8 h-8" />
              </div>
            </div>
          </div>
          <div className="bg-purple-50 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">AI/ML Avg Daily</p>
                <p className="text-2xl font-bold text-gray-800">
                  {Math.round(totalAimlTasks / 7)}
                </p>
              </div>
              <div className="text-purple-500">
                <TrendingUp className="w-8 h-8" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailyProgressChart;
