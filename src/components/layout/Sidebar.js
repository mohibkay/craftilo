import { useState, useRef } from "react";
import {
  FaChevronDown,
  FaInbox,
  FaRegCalendarAlt,
  FaRegCalendar,
} from "react-icons/fa";
import { useSelectedProjectValue } from "../../context";
import Projects from "../project";
import AddProject from "../project/AddProject";
// import useOnClickOutside from "use-onclickoutside";

export default function Sidebar({ sidebarRef, showSidebar, setShowSidebar }) {
  const { setSelectedProject } = useSelectedProjectValue();
  const [active, setActive] = useState("inbox");
  const [showProjects, setShowProjects] = useState(true);

  // const closeSidebar = () => {
  //   setShowSidebar(false);
  // };

  // const sidebarRef = useRef(null);
  // useOnClickOutside(sidebarRef, closeSidebar);

  return (
    <div
      ref={sidebarRef}
      className={`col-span-1 border-r transition delay-700 duration-500 ease-in-out border-gray-light pt-10 overflow-y-auto md:block ${
        showSidebar ? "block absolute left-0 z-50 bg-white w-2/3" : "hidden"
      } `}
      style={{ height: "calc(100vh - 54px" }}
    >
      <ul className="">
        <li
          className={`flex items-center space-x-3 py-2 px-3 cursor-pointer hover:bg-gray-light hover:font-bold ${
            active === "inbox" && "bg-gray-light font-bold"
          }`}
          onClick={() => {
            setActive("inbox");
            setSelectedProject("INBOX");
          }}
        >
          <span>
            <FaInbox />
          </span>
          <span>Inbox</span>
        </li>
        <li
          className={`flex items-center space-x-3 py-2 px-3 cursor-pointer hover:bg-gray-light hover:font-bold ${
            active === "today" && "bg-gray-light font-bold"
          }`}
          onClick={() => {
            setActive("today");
            setSelectedProject("TODAY");
          }}
        >
          <span>
            <FaRegCalendar />
          </span>
          <span>Today</span>
        </li>
        <li
          className={`flex items-center space-x-3 py-2 px-3 cursor-pointer hover:bg-gray-light hover:font-bold ${
            active === "next_7" && "bg-gray-light font-bold"
          }`}
          onClick={() => {
            setActive("next_7");
            setSelectedProject("NEXT_7");
          }}
        >
          <span>
            <FaRegCalendarAlt />
          </span>
          <span>Next 7 days</span>
        </li>
      </ul>
      <div
        className="flex items-center space-x-3 py-2 px-3 cursor-pointer border-b border-gray-light pb-6"
        onClick={() => setShowProjects((showProjects) => !showProjects)}
      >
        <span onClick={() => setShowProjects((showProjects) => !showProjects)}>
          <FaChevronDown
            className={showProjects ? "" : "transform -rotate-90"}
          />
        </span>
        <h2>Projects</h2>
      </div>
      <ul className="sidebar__projects">{showProjects && <Projects />}</ul>
      {showProjects && <AddProject />}
    </div>
  );
}
