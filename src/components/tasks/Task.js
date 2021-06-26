import { useState } from "react";
import { firebase } from "../../lib/firebase";

import Checkbox from "./Checkbox";
import DeleteModal from "../projects/DeleteModal";
import MenuList from "../projects/Menu";
import EditTask from "./EditTask";

export default function Task({ task }) {
  const [modalStatus, setModalStatus] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskName, setTaskName] = useState(task.task);

  const deleteTask = (taskId) => {
    firebase.firestore().collection("tasks").doc(taskId).delete();
  };

  const updateTaskName = () => {
    firebase
      .firestore()
      .collection("tasks")
      .doc(task.docId)
      .update({
        task: taskName,
      })
      .then(() => {
        console.log("done");
      });
  };

  return (
    <>
      <li className="flex justify-between items-center group text-lg cursor-text border-b border-gray-primary m-2 px-2 py-1 pb-2">
        <span className="flex items-center space-x-3">
          <Checkbox id={task.docId} />
          <span>{task.task}</span>
        </span>

        <span className="ml-auto">
          <MenuList
            setModalStatus={setModalStatus}
            setShowEditModal={setShowEditModal}
          />
        </span>
      </li>

      <DeleteModal
        title="task"
        deleteTask={deleteTask}
        taskId={task.docId}
        modalStatus={modalStatus}
        setModalStatus={setModalStatus}
      />

      <EditTask
        modalStatus={showEditModal}
        setModalStatus={setShowEditModal}
        taskName={taskName}
        setTaskName={setTaskName}
        handleUpdate={updateTaskName}
      />
    </>
  );
}
