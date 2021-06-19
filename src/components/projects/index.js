import { useState } from "react";
import { useProjectsValue } from "../../context";
import { useSelectedProjectValue } from "../../context";
import Project from "./Project";

export default function Projects({ activeValue = null }) {
  const [active, setActive] = useState(activeValue);
  const { setSelectedProject } = useSelectedProjectValue();
  const { projects } = useProjectsValue();

  return (
    <>
      {projects &&
        projects.map((project) => (
          <li
            key={project.projectId}
            className={`flex group items-center px-3 py-2.5 cursor-pointer hover:bg-gray-light ${
              active === project.projectId && "bg-gray-light font-medium"
            }`}
            onClick={() => {
              setActive(project.projectId);
              setSelectedProject(project.projectId);
            }}
            onKeyDown={() => {
              setActive(project.projectId);
              setSelectedProject(project.projectId);
            }}
          >
            <Project project={project} />
          </li>
        ))}
    </>
  );
}
