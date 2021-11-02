import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import { useProjectsValue } from "../../context";

interface Props {
  setProject: (s: string) => void;
}

interface Project {
  projectId: string;
  name: string;
}

const ProjectList: React.FC<Props> = ({ setProject }) => {
  const { projects } = useProjectsValue();

  return (
    <Menu
      className="border border-gray-primary"
      align="center"
      position="auto"
      arrow={true}
      portal={true}
      menuButton={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 cursor-pointer text-primary"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>
      }
    >
      {projects.length > 0 ? (
        projects.map((project: Project) => (
          <MenuItem
            key={project.projectId}
            className="border-b border-gray-primary last:border-0"
            // @ts-ignore TODO: fix type
            styles={{ active: "bg-primary" }}
            onClick={() => setProject(project.projectId)}
          >
            {project.name}
          </MenuItem>
        ))
      ) : (
        <MenuItem className="p-2 px-4 border-gray-primary hover:bg-gray-light font-normal hover:font-bold cursor-pointer">
          No projects yet
        </MenuItem>
      )}
    </Menu>
  );
};

export default ProjectList;
