import { useState } from "react";
import { FaPizzaSlice } from "react-icons/fa";
import AddTask from "../tasks/AddTask";

export default function Header({ darkMode, setDarkMode }) {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [showQuickAddTask, setShowQuickAddTask] = useState(false);

  return (
    <header className={`${darkMode ? "bg-black" : "bg-maroon"} sticky w-full`}>
      <nav className="flex justify-between items-center text-white py-2 px-4 md:px-0 text-xl max-w-screen-lg mx-auto">
        <div className="">
          <h2 className="cursor-pointer">craftilo</h2>
        </div>
        <div className="">
          <ul className="flex items-baseline space-x-3">
            <li
              className="text-3xl cursor-pointer"
              onClick={() => {
                setShowQuickAddTask((showQuickAddTask) => !showQuickAddTask);
                setShouldShowMain(true);
              }}
            >
              +
            </li>
            <li
              className=""
              onClick={() => setDarkMode((darkMode) => !darkMode)}
            >
              <FaPizzaSlice size="20" className="cursor-pointer" />
            </li>
          </ul>
        </div>
      </nav>

      <AddTask
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        showQuickAddTask={showQuickAddTask}
        setShowQuickAddTask={setShowQuickAddTask}
      />
    </header>
  );
}
