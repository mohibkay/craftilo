import { useState } from "react";
import { FaInbox, FaRegCalendarAlt, FaRegCalendar } from "react-icons/fa";
import { useSelectedProjectValue } from "../../context";
import Projects from "../project";
import AddProject from "../project/AddProject";

export default function Sidebar({ showSidebar, setShowSidebar }) {
  const { selectedProject, setSelectedProject } = useSelectedProjectValue();
  const [showProjects, setShowProjects] = useState(true);

  const closeSidebar = () => {
    if (showSidebar) {
      setShowSidebar(false);
    }
  };

  return (
    <div
      className={`pl-4 col-span-1 border-r transition-left duration-300 border-gray-light pt-10 overflow-y-auto block absolute md:static ${
        showSidebar ? "left-0 z-50 bg-white w-2/3" : "-left-full"
      } `}
      style={{ height: "calc(100vh - 54px" }}
    >
      <ul>
        <li
          className={`flex items-center space-x-3 py-2 px-3 cursor-pointer hover:bg-gray-light hover:font-bold ${
            selectedProject === "INBOX" && "bg-gray-light font-bold"
          }`}
          onClick={() => {
            setSelectedProject("INBOX");
            closeSidebar();
          }}
        >
          <span>
            <FaInbox className="text-maroon" />
          </span>
          <span>Inbox</span>
        </li>
        <li
          className={`flex items-center space-x-3 py-2 px-3 cursor-pointer hover:bg-gray-light hover:font-bold ${
            selectedProject === "TODAY" && "bg-gray-light font-bold"
          }`}
          onClick={() => {
            setSelectedProject("TODAY");
            closeSidebar();
          }}
        >
          <span>
            <FaRegCalendar className="text-emarald" />
          </span>
          <span>Today</span>
        </li>
        <li
          className={`flex items-center space-x-3 py-2 px-3 cursor-pointer hover:bg-gray-light hover:font-bold ${
            selectedProject === "NEXT_7" && "bg-gray-light font-bold"
          }`}
          onClick={() => {
            setSelectedProject("NEXT_7");
            closeSidebar();
          }}
        >
          <span>
            <FaRegCalendarAlt className="text-purple" />
          </span>
          <span>Next 7 days</span>
        </li>
      </ul>
      <div
        className="flex items-center space-x-3 py-2 px-3 cursor-pointer border-b border-gray-light pb-6"
        onClick={() => setShowProjects((showProjects) => !showProjects)}
      >
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 -mr-1 text-gray-base ${
              showProjects ? "" : "transform -rotate-90"
            }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </span>
        <h2>Projects</h2>
      </div>
      <ul>{showProjects && <Projects closeSidebar={closeSidebar} />}</ul>
      <AddProject />
    </div>
  );
}
