import { useState } from "react";
import reactLogo from './assets/react.svg'
import Problem1 from "@components/Problem1";
import Problem2 from "@components/Problem2";
import Problem3 from "@components/Problem3";
import Problem3Update from "@components/Problem3/Problem3Update";

const tabs = [
  { id: "problem1", label: " Problem 1", icon: "🔣", content: <Problem1 /> },
  { id: "problem2", label: " Problem 2", icon: "🍭", content: <Problem2 /> },
  { id: "problem3", label: " Problem 3", icon: "🤢", content: <Problem3 /> },
  { id: "problem3refactor", label: " Problem 3 Refactor", icon: "🤢", content: <Problem3Update /> },
];

export default function App() {
  const [activeTab, setActiveTab] = useState("problem1");

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-64 bg-gray-800 text-white p-4">
        <h2 className="flex gap-2 text-xl font-semibold mb-4"> <img src={reactLogo} />99TechChallenge</h2>
        <nav>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className={`flex cursor-pointer items-center gap-2 w-full p-3 rounded-lg text-left mb-1 ${
                activeTab === tab.id ? "bg-gray-700" : "hover:bg-gray-700"
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="w-full flex-1 p-2 md:p-6">
        {tabs.find((tab) => tab.id === activeTab)?.content}
      </main>

      {/* Mobile Bottom Navbar */}
      <aside className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-2 flex justify-around md:hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`flex flex-col items-center p-2 ${
              activeTab === tab.id ? "text-blue-400" : "text-gray-300"
            }`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon}
            <span className="text-xs">{tab.label}</span>
          </button>
        ))}
      </aside>
    </div>
  );
}
