import { useEffect } from "react";
import { useTasks } from "../../hooks";

import { collatedTasks } from "../../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../../helpers";
import { useSelectedProjectValue } from "../../context";
import { useProjectsValue } from "../../context";
import Task from "./Task";
import AddTask from "./AddTask";

export default function Tasks() {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);

  let projectName = "";

  if (
    projects.length > 0 &&
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
      style={{ height: "calc(100vh - 52px" }}
      className="px-0 md:px-10 pt-10 border-r border-gray-light col-span-4 md:col-span-3 overflow-y-auto bg-white"
    >
      <h2 className="text-xl ml-4">{projectName}</h2>
      <ul className="">
        {tasks.map((task) => (
          <Task key={task.docId} task={task} />
        ))}
      </ul>

      <AddTask />
    </div>
  );
}
