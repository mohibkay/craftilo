import { useEffect } from "react";
import { useTasks } from "../../hooks";

import { collatedTasks } from "../../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../../helpers";
import { useSelectedProjectValue } from "../../context";
import { useProjectsValue } from "../../context";
import Task from "./Task";
import AddTask from "./AddTask";
import Skeleton from "react-loading-skeleton";

export default function Tasks({ showSidebar, setShowSidebar }) {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);

  let projectName = "";

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  if (
    projects?.length > 0 &&
    selectedProject &&
    !collatedTasksExist(selectedProject)
  ) {
    projectName = getTitle(projects, selectedProject)?.name;
  }

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject)?.name;
  }

  useEffect(() => {
    document.title = `${projectName} - Craftilo`;
  }, [projectName]);

  return (
    <div
      onClick={closeSidebar}
      style={{ height: "calc(100vh - 52px" }}
      className={`relative px-4 md:px-10 pt-10 bg-white border-r border-gray-light col-span-4 md:col-span-3 ${
        showSidebar ? "overflow-y-hidden" : "overflow-y-auto"
      }`}
    >
      <h2 className="text-xl ml-4">{projectName}</h2>
      <ul className="">
        {tasks?.length > 0 ? (
          tasks?.map((task) => <Task key={task.docId} task={task} />)
        ) : tasks ? (
          <div className="px-4 mt-4">
            <li className="pb-2 mb-2 border-b border-gray-primary">
              No tasks yet
            </li>
          </div>
        ) : (
          <div className="px-4 my-3">
            <Skeleton count={5} height={35} className="mb-2" />
          </div>
        )}
      </ul>

      <div
        className={`bg-black opacity-50 z-30 overflow-hidden w-full absolute top-0 right-0 ${
          showSidebar ? "visible h-screen" : "invisible"
        }`}
      />

      <AddTask />
    </div>
  );
}
