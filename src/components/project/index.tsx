import { useProjectsValue } from "../../context";
import { useSelectedProjectValue } from "../../context";
import Project from "./Project";
import Skeleton from "react-loading-skeleton";

interface Props {
  closeSidebar: () => void;
}

interface ProjectProps {
  projectId: string;
  name: string;
  docId: string;
}

const Projects: React.FC<Props> = ({ closeSidebar }) => {
  const { selectedProject, setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  return (
    <>
      {projects?.length ? (
        projects.map((project: ProjectProps, index: number) => (
          <li
            key={project.projectId}
            className={`flex group items-center rounded px-3 py-2.5 cursor-pointer hover:bg-gray-light ${
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
      ) : (
        <div className="px-4 mt-2">
          <li>No projects yet</li>
        </div>
      )}

      {!projects && <Skeleton count={3} height={31} className="mb-2.5" />}
    </>
  );
};

export default Projects;
