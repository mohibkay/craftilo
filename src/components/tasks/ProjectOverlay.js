import { useProjectsValue } from "../../context";

export const ProjectOverlay = ({
  setProject,
  showProjectOverlay,
  setShowProjectOverlay,
}) => {
  const { projects } = useProjectsValue();

  return (
    projects &&
    showProjectOverlay && (
      <div className="absolute top-24 -right-4 border border-gray-primary bg-white shadow-md w-full">
        <ul className="">
          {projects.map((project) => (
            <li
              className="p-2 border-b border-gray-primary hover:bg-gray-light font-normal hover:font-bold"
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
