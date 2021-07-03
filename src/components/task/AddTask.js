import { useState, useRef } from "react";
import { FaRegListAlt, FaRegCalendarAlt } from "react-icons/fa";
import { firebase } from "../../lib/firebase";
import { useSelectedProjectValue } from "../../context";
import { format, add } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import { ProjectOverlay } from "./ProjectOverlay";
import TaskDate from "./TaskDate";
import useOnClickOutside from "use-onclickoutside";
import QuickTaskModal from "../modals/QuickAddTask";
import { useAuth } from "../../context/authContext";
import { msg } from "../../constants";
import { toast } from "../utils/Toast";
import ProjectList from "./ProjectList";

export default function AddTask({
  showAddTaskMain = true,
  openModal,
  setOpenModal,
}) {
  const [task, setTask] = useState("");
  const [taskDate, setTaskDate] = useState("");
  const [project, setProject] = useState("");
  const [showMain, setShowMain] = useState(false);
  const [showProjectOverlay, setShowProjectOverlay] = useState(false);
  const [showTaskDate, setShowTaskDate] = useState(false);

  const { currentUser } = useAuth();
  const userId = currentUser?.uid;

  const closeOverlay = () => {
    setShowProjectOverlay(false);
    setShowTaskDate(false);
  };

  const anchorRef = useRef(null);
  useOnClickOutside(anchorRef, closeOverlay);

  const { selectedProject } = useSelectedProjectValue();

  const addTask = () => {
    const projectId = project || selectedProject;
    let collatedDate = "";
    const taskId = uuidv4();

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
          taskId,
          date: collatedDate || taskDate,
          userId,
        })
        .then(() => {
          setTask("");
          setProject("");
          setShowMain(false);
          setShowProjectOverlay(false);
          toast("Task", msg.add);
        })
    );
  };

  return (
    <div ref={anchorRef}>
      {showAddTaskMain && (
        <div ref={anchorRef} className="mx-4 mb-4">
          <div
            onClick={() => setShowMain((showMain) => !showMain)}
            className="flex items-baseline space-x-3 cursor-pointer"
          >
            <span className="text-2xl text-primary">+</span>
            <span className="">Add Task</span>
          </div>
        </div>
      )}

      {showMain && (
        <div
          ref={anchorRef}
          className="relative border p-4 pl-1 pr-8 mb-8 rounded-lg shadow-md border-gray-primary"
        >
          {/* <ProjectOverlay
            setProject={setProject}
            showProjectOverlay={showProjectOverlay}
            setShowProjectOverlay={setShowProjectOverlay}
            setShowTaskDate={setShowTaskDate}
            anchorRef={anchorRef}
          /> */}

          <TaskDate
            setTaskDate={setTaskDate}
            showTaskDate={showTaskDate}
            setShowProjectOverlay={setShowProjectOverlay}
            setShowTaskDate={setShowTaskDate}
            anchorRef={anchorRef}
          />

          <input
            type="text"
            placeholder="New Task"
            className="w-full border rounded border-gray-primary mx-4 px-2 py-0.5 my-2 focus:outline-none"
            value={task}
            onChange={({ target }) => setTask(target.value)}
          />

          <div className="flex items-baseline justify-between px-4">
            <span className="items-center space-x-4">
              <button
                className="button"
                onClick={() => {
                  addTask();
                  setShowTaskDate(false);
                  setShowProjectOverlay(false);
                }}
              >
                Add Task
              </button>

              <button
                className="button-secondary"
                onClick={() => {
                  setShowMain(false);
                  setShowProjectOverlay(false);
                  setShowTaskDate(false);
                }}
              >
                Cancel
              </button>
            </span>

            <span className="flex items-baseline space-x-4">
              {/* <span
                ref={anchorRef}
                className="cursor-pointer"
                onClick={() => {
                  setShowProjectOverlay(
                    (showProjectOverlay) => !showProjectOverlay
                  );
                  setShowTaskDate(false);
                }}
              >
                <FaRegListAlt className="text-primary" />
              </span> */}
              <ProjectList setProject={setProject} />
              <span
                className="cursor-pointer"
                onClick={() => {
                  setShowTaskDate((showTaskDate) => !showTaskDate);
                  setShowProjectOverlay(false);
                }}
              >
                <FaRegCalendarAlt className="text-primary" />
              </span>
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
}
