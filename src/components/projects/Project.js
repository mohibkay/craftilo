import { useState } from "react";
import { useProjectsValue } from "../../context";
import { useSelectedProjectValue } from "../../context";
import { firebase } from "../../lib/firebase";
import DeleteModal from "./DeleteModal";

export default function Project({ project }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = (docId) => {
    firebase
      .firestore()
      .collection("projects")
      .doc(docId)
      .delete()
      .then(() => {
        setProjects([...projects]);
        setSelectedProject("INBOX");
      });
  };

  return (
    <>
      <span className="mr-3">●</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span
        className="ml-auto"
        onKeyDown={() => setShowConfirm((showConfirm) => !showConfirm)}
        onClick={() => setShowConfirm((showConfirm) => !showConfirm)}
      >
        <DeleteModal
          showConfirm={showConfirm}
          deleteProject={deleteProject}
          docId={project.docId}
        />
      </span>
    </>
  );
}
