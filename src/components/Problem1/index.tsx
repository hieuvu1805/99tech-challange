import React, { useState } from 'react'
import { CopyBlock } from 'react-code-blocks';

import solution1 from './solutions1';
import code1 from "./solutions1.ts?raw";

import solution2 from './solutions2';
import code2 from "./solutions2.ts?raw";

import solution3 from './solutions3';
import code3 from "./solutions3.ts?raw";

export default function Problem1() {
  const [n, setN] = useState(0);
  const [activeTab, setActiveTab] = React.useState("solution1");

  const showResult = () => {
    if (n < 0) {return 0}
    if (activeTab === 'solution1') {
      if (n < 2) { return n }
      if (n > 6) {
        return "1 + 2 + 3 + 4 + 5 + ... + " + n + ' = ' + solution1(n);
      }
      return Array.from({ length: n }, (_, i) => i + 1).join(" + ") + ' = ' + solution1(n);
    } else if (activeTab === 'solution2') {
      if (n < 2) { return n }
      if (n > 6) {
        return "[1 + 2 + 3 + 4 + 5 + ... + " + n + '] = ' + solution2(n);
      }
      return "[" + Array.from({ length: n }, (_, i) => i + 1).join(" + ") + '] = ' + solution2(n);
    } else {
      return `${n} * (${n} + 1) / 2 = ${solution3(n)}`
    }
  }


  return (
    <div className="flex flex-col space-y-6 p-4 mx-auto">
        <div className="flex space-x-2 border-b">
          {["solution1", "solution2", "solution3"].map((sol) => (
            <button
              key={sol}
              className={`capitalize cursor-pointer px-4 py-2 ${activeTab === sol ? "border-b-2 border-blue-500 font-semibold" : "text-gray-500"}`}
              onClick={() => setActiveTab(sol)}
            >
              {sol}
            </button>
          ))}
        </div>

        <div className="border rounded-lg shadow">
          {activeTab === "solution1" && (
            <CopyBlock
              text={code1}
              language={'tsx'}
              showLineNumbers={true}
              wrapLongLines={true}
            />
          )}
          {activeTab === "solution2" && (
            <CopyBlock
              text={code2}
              language={'tsx'}
              showLineNumbers={true}
              wrapLongLines={true}
            />
          )}
          {activeTab === "solution3" && (
            <CopyBlock
              text={code3}
              language={'tsx'}
              showLineNumbers={true}
              wrapLongLines={true}
            />
          )}
          <div className='px-4 mt-4 flex gap-4 flex-col md:flex-row md:items-center'>
            <label>{`Enter a number (0 < n < 10000000)`}:</label>
            <input
              type="number"
              className="flex-1 border border-gray-300 rounded-lg py-1 px-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter a number"
              value={n.toString()}
              onChange={(e) => {
                const value = Number(e.target.value);
                if (value <= 0) {
                  setN(0);
                } else if (value < 10000000) {
                  setN(value);
                }
              }}
            />
          </div>
          <p className="px-4 pb-4 font-semibold mt-2">Result: {showResult()}</p>
        </div>
    </div>
  )
}
