import { useProjectsValue } from "../../context";

export const ProjectOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
  showQuickAddTask,
}) => {
  const { projects } = useProjectsValue();

  return (
    projects &&
    showProjectOverlay && (
      <div
        className={`absolute -right-4 rounded-md border border-gray-primary bg-white shadow-md ${
          showQuickAddTask ? "w-1/2 top-28" : "w-1/3 top-24"
        }`}
      >
        <ul className="">
          {projects.map((project) => (
            <li
              className="p-2 px-4 border-b border-gray-primary hover:bg-gray-light font-normal hover:font-bold cursor-pointer"
              key={project.projectId}
            >
              <div
                onClick={() => {
                  setProject(project.projectId);
                  setShowProjectOverlay(false);
                }}
              >
                {project.name}
              </div>
            </li>
          ))}
        </ul>
      </div>
    )
  );
};
