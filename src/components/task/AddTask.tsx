import { useEffect, useState } from "react";
import { firebase, FieldValue } from "../../lib/firebase";
import { useSelectedProjectValue } from "../../context";
import { format, add } from "date-fns";
import TaskDate from "./TaskDate";
import QuickTaskModal from "../modals/QuickAddTask";
import { useAuth } from "../../context/authContext";
import { msg } from "../../constants";
import { toast } from "../utils/Toast";
import ProjectList from "./ProjectList";

interface Props {
  showAddTaskMain?: boolean;
  openModal?: boolean;
  setOpenModal?: (s: boolean) => void;
}

const AddTask: React.FC<Props> = ({
  showAddTaskMain = true,
  openModal = false,
  setOpenModal = () => null,
}) => {
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [project, setProject] = useState("");
  const [showMain, setShowMain] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser } = useAuth();
  const userId = currentUser?.uid;

  const { selectedProject } = useSelectedProjectValue();

  const closeAddTAsk = () => {
    setShowMain(false);
    setTask("");
  };

  useEffect(() => {
    closeAddTAsk();
    return () => {};
  }, [selectedProject]);

  const addTask = () => {
    setIsLoading(true);
    const projectId = project || selectedProject;
    let collatedDate = "";

    if (projectId === "TODAY") {
      collatedDate = format(new Date(), "yyyy, M, dd");
    } else if (projectId === "NEXT_7") {
      collatedDate = format(add(new Date(), { days: 7 }), "yyyy, M, dd");
    }

    return (
      task &&
      projectId &&
      firebase
        .firestore()
        .collection("tasks")
        .add({
          archived: false,
          projectId,
          task,
          date: collatedDate || taskDate,
          userId,
          createdAt: FieldValue.serverTimestamp(),
        })
        .then(() => {
          setTask("");
          setProject("");
          setIsLoading(false);
          setShowMain(false);
          toast("Task", msg.add);
        })
    );
  };

  return (
    <div>
      {showAddTaskMain && (
        <div className="mx-4 mb-4">
          <div
            onClick={() => setShowMain((showMain) => !showMain)}
            className="flex items-baseline space-x-3 cursor-pointer"
          >
            <span className="text-2xl text-primary">+</span>
            <span>Add Task</span>
          </div>
        </div>
      )}

      {showMain && (
        <div className="relative border p-4 pl-1 pr-8 mb- rounded-lg shadow-md border-gray-primary">
          <input
            type="text"
            placeholder="New Task"
            className="w-full border rounded border-gray-primary mx-4 px-2 py-0.5 my-2 focus:outline-none"
            value={task}
            onChange={({ target }) => setTask(target.value)}
          />

          <div className="flex items-baseline justify-between px-4">
            <span className="items-center space-x-4">
              <button disabled={isLoading} className="button" onClick={addTask}>
                Add Task
              </button>

              <button className="button-secondary" onClick={closeAddTAsk}>
                Cancel
              </button>
            </span>

            <span className="flex items-baseline space-x-4">
              <ProjectList setProject={setProject} />
              <TaskDate setTaskDate={setTaskDate} />
            </span>
          </div>
        </div>
      )}

      <QuickTaskModal
        task={task}
        setTask={setTask}
        addTask={addTask}
        modalStatus={openModal}
        setModalStatus={setOpenModal}
      />
    </div>
  );
};

export default AddTask;
