"use client";

import { useState, useEffect } from "react";
import PhaseAccordion from "../components/PhaseAccordion";
import StatsCard from "../components/StatsCard";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import DailyProgressChart from "../components/DailyProgressChart";
import ComparisonStats from "../components/ComparisonStats";

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

interface RoadmapData {
  phases: Phase[];
  stats: {
    totalTasks: number;
    completedTasks: number;
    progress: number;
  };
}

export default function Home() {
  const [activeTab, setActiveTab] = useState<"pcb" | "aiml">("pcb");
  const [pcbData, setPcbData] = useState<RoadmapData | null>(null);
  const [aimlData, setAimlData] = useState<RoadmapData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Load PCB Data
      const pcbResponse = await fetch("/data/roadmap.json");
      const pcbJson = await pcbResponse.json();
      const savedPcbData = loadFromLocalStorage("pcbRoadmap");
      setPcbData(savedPcbData || pcbJson);

      // Load AI/ML Data
      const aimlResponse = await fetch("/data/aiml-roadmap.json");
      const aimlJson = await aimlResponse.json();
      const savedAimlData = loadFromLocalStorage("aimlRoadmap");
      setAimlData(savedAimlData || aimlJson);
    } catch (error) {
      console.error("Error loading roadmap data:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleTask = (
    phaseId: number,
    taskId: string,
    type: "pcb" | "aiml",
  ) => {
    const setData = type === "pcb" ? setPcbData : setAimlData;
    const getData = type === "pcb" ? pcbData : aimlData;
    const storageKey = type === "pcb" ? "pcbRoadmap" : "aimlRoadmap";

    if (!getData) return;

    const updatedPhases = getData.phases.map((phase) => {
      if (phase.id === phaseId) {
        const updatedTasks = phase.tasks.map((task) => {
          if (task.id === taskId) {
            return { ...task, completed: !task.completed };
          }
          return task;
        });
        return { ...phase, tasks: updatedTasks };
      }
      return phase;
    });

    // Calculate new stats
    const allTasks = updatedPhases.flatMap((phase) => phase.tasks);
    const completedTasks = allTasks.filter((task) => task.completed).length;
    const totalTasks = allTasks.length;
    const progress = Math.round((completedTasks / totalTasks) * 100);

    const updatedData = {
      phases: updatedPhases,
      stats: {
        totalTasks,
        completedTasks,
        progress,
      },
    };

    setData(updatedData);
    saveToLocalStorage(storageKey, updatedData);
  };

  const saveToLocalStorage = (key: string, data: RoadmapData) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const loadFromLocalStorage = (key: string) => {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : null;
  };

  const resetProgress = (type: "pcb" | "aiml") => {
    const setData = type === "pcb" ? setPcbData : setAimlData;
    const getData = type === "pcb" ? pcbData : aimlData;
    const storageKey = type === "pcb" ? "pcbRoadmap" : "aimlRoadmap";

    if (!getData) return;

    const resetPhases = getData.phases.map((phase) => ({
      ...phase,
      tasks: phase.tasks.map((task) => ({ ...task, completed: false })),
    }));

    const resetData = {
      phases: resetPhases,
      stats: {
        totalTasks: getData.stats.totalTasks,
        completedTasks: 0,
        progress: 0,
      },
    };

    setData(resetData);
    localStorage.removeItem(storageKey);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-500 mx-auto"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="animate-pulse text-2xl">⚡</div>
            </div>
          </div>
          <p className="mt-4 text-gray-600">Loading Dual-Track Roadmap...</p>
          <p className="text-sm text-gray-500 mt-2">
            PCB Design & AI/ML Learning Paths
          </p>
        </div>
      </div>
    );
  }

  if (!pcbData || !aimlData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg">
          <p className="text-red-500 mb-4">Error loading roadmap data</p>
          <button
            onClick={fetchData}
            className="px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Retry Loading
          </button>
        </div>
      </div>
    );
  }

  const currentData = activeTab === "pcb" ? pcbData : aimlData;
  const currentTitle =
    activeTab === "pcb" ? "PCB & Circuit Design" : "AI/ML Engineering";
  const currentDescription =
    activeTab === "pcb"
      ? "A comprehensive guide for software students transitioning to hardware design"
      : "Master machine learning and artificial intelligence from fundamentals to advanced applications";

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Section */}
        <div className="mb-8">
          <ComparisonStats
            pcbStats={pcbData.stats}
            aimlStats={aimlData.stats}
          />
          <DailyProgressChart pcbData={[]} aimlData={[]} />
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
          {/* Header with Tabs */}
          <div className="mb-8">
            <div className="text-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {currentTitle} Learning Roadmap
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {currentDescription}
              </p>
            </div>

            <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Stats Card */}
          <div className="mb-8">
            <StatsCard
              stats={currentData.stats}
              title={
                activeTab === "pcb" ? "PCB Design Progress" : "AI/ML Progress"
              }
              color={activeTab === "pcb" ? "green" : "purple"}
            />

            <div className="flex justify-end mt-4">
              <button
                onClick={() => resetProgress(activeTab)}
                className={`px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                  activeTab === "pcb"
                    ? "bg-red-100 text-red-700 hover:bg-red-200"
                    : "bg-red-100 text-red-700 hover:bg-red-200"
                }`}
              >
                Reset {activeTab === "pcb" ? "PCB" : "AI/ML"} Progress
              </button>
            </div>
          </div>

          {/* Phase Accordions */}
          <div className="space-y-6">
            {currentData.phases.map((phase) => (
              <PhaseAccordion
                key={phase.id}
                phase={phase}
                onToggleTask={(phaseId, taskId) =>
                  toggleTask(phaseId, taskId, activeTab)
                }
                colorScheme={activeTab === "pcb" ? "green" : "purple"}
              />
            ))}
          </div>

          {/* Legend */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Legend</h3>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded mr-2 ${
                    activeTab === "pcb"
                      ? "bg-green-100 border-2 border-green-500"
                      : "bg-purple-100 border-2 border-purple-500"
                  }`}
                ></div>
                <span className="text-gray-700">Completed Task</span>
              </div>
              <div className="flex items-center">
                <div className="w-4 h-4 bg-white border-2 border-gray-300 rounded mr-2"></div>
                <span className="text-gray-700">Pending Task</span>
              </div>
              <div className="flex items-center">
                <div
                  className={`w-4 h-4 rounded mr-2 ${
                    activeTab === "pcb"
                      ? "bg-blue-50 border-2 border-blue-400"
                      : "bg-pink-50 border-2 border-pink-400"
                  }`}
                ></div>
                <span className="text-gray-700">In Progress</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 py-8 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-lg font-semibold mb-4">Learning Tracks</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span>PCB Design Roadmap</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
                  <span>AI/ML Engineering Roadmap</span>
                </div>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-300">
                <li>✓ Progress Tracking</li>
                <li>✓ Daily Charts</li>
                <li>✓ Local Storage</li>
                <li>✓ Interactive Tasks</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Tips</h4>
              <p className="text-gray-300 text-sm">
                Track both tracks simultaneously or focus on one at a time.
                Progress is automatically saved in your browser.
              </p>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400 text-sm">
            <p>
              Built for developers transitioning to hardware and AI/ML fields
            </p>
            <p className="mt-2">
              Progress is automatically saved in your browser
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
