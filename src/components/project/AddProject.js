import { useState } from "react";
import { firebase } from "../../lib/firebase";
import { generatePushId } from "../../helpers";
import { useProjectsValue } from "../../context";
import { useAuth } from "../../context/authContext";
import { msg } from "../../constants";
import { toast } from "../utils/Toast";
import AddProjectModal from "../modals/EditProject";

export default function AddProject() {
  const [show, setShow] = useState(false);
  const [projectName, setProjectName] = useState("");

  const projectId = generatePushId();
  const { projects, setProjects } = useProjectsValue();
  const {
    currentUser: { uid: userId },
  } = useAuth();

  const addProject = () => {
    projectName &&
      firebase
        .firestore()
        .collection("projects")
        .add({
          projectId,
          name: projectName,
          userId,
        })
        .then(() => {
          setProjects([...projects]);
          setProjectName("");
          setShow(false);
          toast("Project", msg.add);
        });
  };

  return (
    <div className="mt-4">
      <div
        onClick={() => setShow((show) => !show)}
        className="flex items-baseline px-2 my-2 pb-1.5 space-x-3 cursor-pointer hover:bg-gray-light"
      >
        <span className="text-primary font-bold text-2xl">+</span>
        <span className="">Add Project</span>
      </div>

      <AddProjectModal
        type={100}
        modalStatus={show}
        setModalStatus={setShow}
        addProject={addProject}
        projectName={projectName}
        setProjectName={setProjectName}
      />
    </div>
  );
}
