import { useState, useEffect } from "react";

export default function AppApp() {
  const [count, setCount] = useState(() => {
    const saved = localStorage.getItem("counterValue");
    return saved ? parseInt(saved, 10) : 0;
  });
  const [isRunning, setIsRunning] = useState(false);
  const [intervalId, setIntervalId] = useState(null);

  // Persist count value by storing it in localStorage
  useEffect(() => {
    localStorage.setItem("counterValue", count);
  }, [count]);

  // Start/Stop the counter without useRef
  useEffect(() => {
    if (isRunning) {
      const id = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000);
      setIntervalId(id);
    } else if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    return () => intervalId && clearInterval(intervalId);
  }, [isRunning]);

  const handleReset = () => {
    setCount(0);
    localStorage.setItem("counterValue", 0);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Counter: {count}</h1>
      <div className="flex gap-4">
        <button
          className="px-4 py-2 bg-green-500 text-white rounded-2xl shadow hover:bg-green-600"
          onClick={() => setIsRunning(true)}
        >
          Start
        </button>
        <button
          className="px-4 py-2 bg-yellow-500 text-white rounded-2xl shadow hover:bg-yellow-600"
          onClick={() => setIsRunning(false)}
        >
          Stop
        </button>
        <button
          className="px-4 py-2 bg-red-500 text-white rounded-2xl shadow hover:bg-red-600"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
}
