import { createContext, useContext, useState } from "react";

interface ProjectProviderProps {
  children: React.ReactNode;
}

interface ProjectsContext {
  selectedProject: string;
  setSelectedProject: React.Dispatch<React.SetStateAction<string>>;
}

export const SelectedProjectContext = createContext({} as ProjectsContext);
export const SelectedProjectProvider = ({ children }: ProjectProviderProps) => {
  const [selectedProject, setSelectedProject] = useState("INBOX");

  return (
    <SelectedProjectContext.Provider
      value={{ selectedProject, setSelectedProject }}
    >
      {children}
    </SelectedProjectContext.Provider>
  );
};

export const useSelectedProjectValue = () => useContext(SelectedProjectContext);
