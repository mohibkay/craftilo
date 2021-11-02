import { useState, useEffect } from "react";
import { useTasks } from "../../hooks";
import { collatedTasks } from "../../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../../helpers";
import { useSelectedProjectValue } from "../../context";
import { useProjectsValue } from "../../context";
import Task from "./Task";
import AddTask from "./AddTask";
import Skeleton from "react-loading-skeleton";

interface Props {
  showSidebar: boolean;
  setShowSidebar: (s: boolean) => void;
}

// interface TaskProps {
//   tasks: {
//     docId: string;
//   }[];
//   archivedTasks: {
//     docId: string;
//   }[];
// }

const Tasks: React.FC<Props> = ({ showSidebar, setShowSidebar }) => {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks, archivedTasks } = useTasks(selectedProject);

  const [showArchivedList, setShowArchivedList] = useState(false);
  const handleAccordion = () => {
    setShowArchivedList((showArchivedList) => !showArchivedList);
  };

  let projectName: string | undefined;

  const closeSidebar = () => {
    setShowSidebar(false);
  };

  console.log("projects");
  console.log(projects);

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
      <ul>
        {/* @ts-ignore  */}
        {tasks?.length > 0 ? (
          // @ts-ignore TODO: fix types
          tasks?.map((task: { docId: string; task: string }) => (
            <Task key={task.docId} task={task} archived={false} />
          ))
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

      <AddTask
        showAddTaskMain={false}
        openModal={false}
        setOpenModal={() => {}}
      />

      {/* @ts-ignore */}
      {archivedTasks?.length ? (
        <>
          {" "}
          <div
            className="flex items-end space-x-2 cursor-pointer"
            onClick={handleAccordion}
          >
            <h2 className="mt-8 ml-4 text-xl text-gray-base">Archived tasks</h2>
            {showArchivedList ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-base"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-gray-base"
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
            )}
          </div>
          {showArchivedList && (
            <ul>
              {/* @ts-ignore */}
              {archivedTasks?.map((task: { docId: string; task: string }) => (
                <Task key={task.docId} task={task} archived={true} />
              ))}
            </ul>
          )}
        </>
      ) : null}
    </div>
  );
};

export default Tasks;
