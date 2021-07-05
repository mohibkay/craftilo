import { useProjectsValue } from "../../context";
import { useSelectedProjectValue } from "../../context";
import Project from "./Project";
import Skeleton from "react-loading-skeleton";

export default function Projects({ activeValue = null, closeSidebar }) {
  const { selectedProject, setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  return (
    <>
      {projects?.length > 0 ? (
        projects.map((project, index) => (
          <li
            key={project.projectId}
            className={`flex group items-center px-3 py-2.5 cursor-pointer hover:bg-gray-light ${
              selectedProject === project.projectId &&
              "bg-gray-light font-medium"
            }`}
            onClick={() => {
              setSelectedProject(project.projectId);
              closeSidebar();
            }}
          >
            <Project project={project} index={index} />
          </li>
        ))
      ) : projects ? (
        <div className="px-4 mt-2">
          <li>No projects yet</li>
        </div>
      ) : (
        <Skeleton count={3} height={31} className="mb-2.5" />
      )}
    </>
  );
}
