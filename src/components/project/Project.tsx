import { useState } from "react";
import { useProjectsValue } from "../../context";
import { useSelectedProjectValue } from "../../context";
import { firebase } from "../../lib/firebase";
import DeleteModal from "../modals/DeleteModal";
import EditModal from "../modals/EditProject";
import MenuList from "../utils/Menu";
import { msg } from "../../constants";
import { toast } from "../utils/Toast";

interface Props {
  index: number;
  project: {
    projectId: string;
    name: string;
    docId: string;
  };
}

const Project: React.FC<Props> = ({ project, index }) => {
  const [showConfirm, setShowConfirm] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [projectName, setProjectName] = useState(project.name);

  const { projects, setProjects } = useProjectsValue();
  const { setSelectedProject } = useSelectedProjectValue();

  const deleteProject = (docId: string) => {
    projects &&
      firebase
        .firestore()
        .collection("projects")
        .doc(docId)
        .delete()
        .then(() => {
          setProjects([...projects]);
          setSelectedProject("INBOX");
          toast("Project", msg.delete);
        });
  };

  const handleUpdate = () => {
    projects &&
      firebase
        .firestore()
        .collection("projects")
        .doc(project.docId)
        .update({
          name: projectName,
        })
        .then(() => {
          setProjects([...projects]);
          toast("Project", msg.update);
        });
  };

  return (
    <>
      <span className={`mr-3 sidebar-dot-${index}`}>●</span>
      <span className="truncate">{project.name}</span>
      <span className="ml-auto" onClick={(e) => e.stopPropagation()}>
        <MenuList
          setModalStatus={setShowConfirm}
          setShowEditModal={setShowEditModal}
          type={100}
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
};

export default Project;
