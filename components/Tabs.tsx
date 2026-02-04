import React from "react";
import { Cpu, Brain } from "lucide-react";

interface TabsProps {
  activeTab: "pcb" | "aiml";
  onTabChange: (tab: "pcb" | "aiml") => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex space-x-2 mb-8 border-b border-gray-200">
      <button
        onClick={() => onTabChange("pcb")}
        className={`flex items-center space-x-2 px-6 py-3 font-medium text-sm rounded-t-lg transition-all ${
          activeTab === "pcb"
            ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-md"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Cpu className="w-4 h-4" />
        <span>PCB Design Roadmap</span>
      </button>
      <button
        onClick={() => onTabChange("aiml")}
        className={`flex items-center space-x-2 px-6 py-3 font-medium text-sm rounded-t-lg transition-all ${
          activeTab === "aiml"
            ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white shadow-md"
            : "text-gray-600 hover:bg-gray-100"
        }`}
      >
        <Brain className="w-4 h-4" />
        <span>AI/ML Roadmap</span>
      </button>
    </div>
  );
};

export default Tabs;
