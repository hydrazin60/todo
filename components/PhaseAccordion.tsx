"use client";

import React, { useState } from "react";
import { ChevronDown, ChevronUp, CheckCircle, Circle } from "lucide-react";

interface Task {
  id: string;
  title: string;
  completed: boolean;
  category: string;
}

interface Phase {
  id: number;
  title: string;
  duration: string;
  tasks: Task[];
}

interface PhaseAccordionProps {
  phase: Phase;
  onToggleTask: (phaseId: number, taskId: string) => void;
  colorScheme?: "green" | "purple";
}

const PhaseAccordion: React.FC<PhaseAccordionProps> = ({
  phase,
  onToggleTask,
  colorScheme = "green",
}) => {
  const [isExpanded, setIsExpanded] = useState(phase.id === 1);

  const completedCount = phase.tasks.filter((task) => task.completed).length;
  const totalCount = phase.tasks.length;
  const phaseProgress =
    totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  // Color schemes
  const colors = {
    green: {
      bg: "bg-green-100",
      text: "text-green-600",
      progress: "bg-green-500",
      light: "bg-green-50",
      border: "border-green-200",
    },
    purple: {
      bg: "bg-purple-100",
      text: "text-purple-600",
      progress: "bg-purple-500",
      light: "bg-purple-50",
      border: "border-purple-200",
    },
  };

  const currentColor = colors[colorScheme];

  // Group tasks by category
  const tasksByCategory = phase.tasks.reduce(
    (acc, task) => {
      if (!acc[task.category]) {
        acc[task.category] = [];
      }
      acc[task.category].push(task);
      return acc;
    },
    {} as Record<string, Task[]>,
  );

  return (
    <div
      className={`bg-white rounded-xl shadow-sm border ${currentColor.border} overflow-hidden`}
    >
      {/* Phase Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
      >
        <div className="flex items-center space-x-4">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center ${
              phaseProgress === 100 ? currentColor.bg : "bg-gray-100"
            } ${phaseProgress === 100 ? currentColor.text : "text-gray-600"}`}
          >
            {phase.id}
          </div>
          <div className="text-left">
            <h3 className="font-bold text-lg text-gray-800">{phase.title}</h3>
            <p className="text-gray-600 text-sm">{phase.duration}</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <div className="hidden md:block">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                phaseProgress === 100 ? currentColor.bg : "bg-gray-100"
              } ${phaseProgress === 100 ? currentColor.text : "text-gray-700"}`}
            >
              {completedCount}/{totalCount} tasks ({phaseProgress}%)
            </span>
          </div>
          {isExpanded ? (
            <ChevronUp className="text-gray-500" />
          ) : (
            <ChevronDown className="text-gray-500" />
          )}
        </div>
      </button>

      {/* Phase Content */}
      {isExpanded && (
        <div className="px-6 py-4 border-t border-gray-100">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">
                Phase Progress
              </span>
              <span className="text-sm font-medium text-gray-700">
                {phaseProgress}%
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all duration-500 ${currentColor.progress}`}
                style={{ width: `${phaseProgress}%` }}
              ></div>
            </div>
          </div>

          {/* Tasks by Category */}
          <div className="space-y-6">
            {Object.entries(tasksByCategory).map(([category, tasks]) => (
              <div
                key={category}
                className="border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                  <h4 className="font-semibold text-gray-800">{category}</h4>
                </div>
                <div className="divide-y divide-gray-100">
                  {tasks.map((task) => (
                    <div
                      key={task.id}
                      className={`px-4 py-3 flex items-start space-x-3 hover:bg-gray-50 transition-colors ${
                        task.completed ? "bg-green-50/50" : ""
                      }`}
                    >
                      <button
                        onClick={() => onToggleTask(phase.id, task.id)}
                        className="mt-1 flex-shrink-0"
                        aria-label={
                          task.completed
                            ? "Mark as incomplete"
                            : "Mark as complete"
                        }
                      >
                        {task.completed ? (
                          <CheckCircle
                            className={`w-5 h-5 ${currentColor.text}`}
                          />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-400 hover:text-gray-600" />
                        )}
                      </button>
                      <div className="flex-grow">
                        <span
                          className={`text-gray-800 ${task.completed ? "line-through text-gray-500" : ""}`}
                        >
                          {task.title}
                        </span>
                      </div>
                      <div className="flex-shrink-0">
                        <span
                          className={`text-xs px-2 py-1 rounded-full ${
                            task.completed
                              ? `${currentColor.light} ${currentColor.text}`
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {task.completed ? "✓ Done" : "Todo"}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Phase Summary */}
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-800">Phase Overview</h4>
                <p className="text-sm text-gray-600 mt-1">
                  Complete {totalCount - completedCount} more tasks to finish
                  this phase
                </p>
              </div>
              <button
                onClick={() => {
                  // Mark all tasks in this phase as complete
                  phase.tasks.forEach((task) => {
                    if (!task.completed) {
                      onToggleTask(phase.id, task.id);
                    }
                  });
                }}
                className={`px-4 py-2 ${currentColor.text} ${currentColor.light} rounded-lg hover:opacity-90 transition-opacity text-sm font-medium`}
              >
                Mark All Complete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhaseAccordion;
