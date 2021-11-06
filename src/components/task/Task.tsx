import { useState } from "react";
import { firebase } from "../../lib/firebase";

import Checkbox from "./Checkbox";
import DeleteModal from "../modals/DeleteModal";
import MenuList from "../utils/Menu";
import EditTask from "../modals/EditTask";

import { msg } from "../../constants";
import { toast } from "../utils/Toast";

interface Props {
  task: {
    task: string;
    docId: string;
  };
  archived: boolean;
}

const Task: React.FC<Props> = ({ task, archived }) => {
  const [modalStatus, setModalStatus] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [taskName, setTaskName] = useState(task.task);

  const deleteTask = (taskId: string) => {
    firebase
      .firestore()
      .collection("tasks")
      .doc(taskId)
      .delete()
      .then(() => toast("Task", msg.delete));
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
        toast("Task", msg.update);
      });
  };

  return (
    <>
      <li className="flex justify-between space-x-2 text-lg cursor-text border-b border-gray-primary m-2 px-2 py-1 pb-2 group">
        <span className="grid grid-flow-col gap-3">
          <Checkbox id={task.docId} archived={archived} />
          <span
            className={`text-wrap ${
              archived ? "line-through text-gray-fade" : ""
            }`}
          >
            {task.task}
          </span>
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
};

export default Task;
