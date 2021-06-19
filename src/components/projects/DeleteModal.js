import { useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement("*");

export default function DeleteModal({
  showConfirm,
  deleteProject = () => {},
  projectId = "",
  title = "",
  deleteTask = () => {},
  taskId = "",
}) {
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(showConfirm);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setIsOpen(false);
  }

  function deleteHandler() {
    if (projectId) {
      deleteProject(projectId);
    }
    if (taskId) {
      deleteTask(taskId);
    }
    closeModal();
  }

  return (
    <div className="group">
      <FaTrashAlt
        className="cursor-pointer hidden group-hover:block opacity-50 hover:opacity-100"
        onClick={openModal}
      />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex justify-between mb-4">
          <h2
            className="capitalize"
            ref={(_subtitle) => (subtitle = _subtitle)}
          >
            Delete {title}?
          </h2>
          <button onClick={closeModal}>X</button>
        </div>
        <div>
          <p>Are you sure you want to delete the {title}?</p>
          <div className="flex items-center space-x-4 mt-4">
            <button
              className="bg-maroon text-white px-3 w-20 py-1 mt-2"
              onClick={deleteHandler}
            >
              Yes
            </button>
            <button
              className="bg-gray-primary px-3 w-20 py-1 mt-2"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
