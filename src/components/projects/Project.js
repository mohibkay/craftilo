import { useState } from "react";
import { useProjectsValue } from "../../context";
import { useSelectedProjectValue } from "../../context";
import { firebase } from "../../lib/firebase";
import DeleteModal from "./DeleteModal";
import EditModal from "./EditProject";
import MenuList from "./Menu";

export default function Project({ project }) {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [projectName, setProjectName] = useState(project.name);

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

  const handleUpdate = () => {
    firebase
      .firestore()
      .collection("projects")
      .doc(project.docId)
      .update({
        name: projectName,
      })
      .then(() => {
        setProjects([...projects]);
      });
  };

  return (
    <>
      <span className="mr-3">●</span>
      <span className="sidebar__project-name">{project.name}</span>
      <span className="ml-auto">
        <MenuList
          setModalStatus={setShowConfirm}
          setShowEditModal={setShowEditModal}
        />

        <DeleteModal
          modalStatus={showConfirm}
          setModalStatus={setShowConfirm}
          deleteProject={deleteProject}
          projectId={project.docId}
          title={"project"}
        />

        <EditModal
          modalStatus={showEditModal}
          setModalStatus={setShowEditModal}
          projectName={projectName}
          setProjectName={setProjectName}
          handleUpdate={handleUpdate}
        />
      </span>
    </>
  );
}
