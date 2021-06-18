import { useEffect } from "react";
import { useTasks } from "../../hooks";
import Checkbox from "./Checkbox";
import { collatedTasks } from "../../constants";
import { getTitle, getCollatedTitle, collatedTasksExist } from "../../helpers";
import { useSelectedProjectValue } from "../../context";
import { useProjectsValue } from "../../context";
import AddTask from "./AddTask";

export default function Tasks() {
  const { selectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();
  const { tasks } = useTasks(selectedProject);

  let projectName = "";

  if (projects && selectedProject && !collatedTasksExist(selectedProject)) {
    projectName = getTitle(projects, selectedProject).name;
  }

  if (collatedTasksExist(selectedProject) && selectedProject) {
    projectName = getCollatedTitle(collatedTasks, selectedProject).name;
  }

  useEffect(() => {
    document.title = `${projectName}: Todoist`;
  }, [projectName]);

  return (
    <div className="px-10 pt-10 border-r border-gray-light col-span-3 h-screen bg-white">
      <h2 className="text-xl">{projectName}</h2>
      <ul className="tasks__list">
        {tasks.map((task) => (
          <li key={task.docId}>
            <Checkbox id={task.docId} />
            <span>{task.task}</span>
          </li>
        ))}
      </ul>

      <AddTask />
    </div>
  );
}
