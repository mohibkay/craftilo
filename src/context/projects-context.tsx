import { createContext, useContext } from "react";
import { useProjects, ProjectInterface } from "../hooks";

interface ProjectsProviderProps {
  children: React.ReactNode;
}

interface ProjectsContextProps {
  projects: ProjectInterface[] | null;
  setProjects: React.Dispatch<React.SetStateAction<ProjectInterface[] | null>>;
}

export const ProjectsContext = createContext({} as ProjectsContextProps);
export const ProjectsProvider = ({ children }: ProjectsProviderProps) => {
  const { projects, setProjects } = useProjects();

  return (
    <ProjectsContext.Provider value={{ projects, setProjects }}>
      {children}
    </ProjectsContext.Provider>
  );
};

export const useProjectsValue = () => useContext(ProjectsContext);
