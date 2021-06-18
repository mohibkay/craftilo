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

export default function DeleteModal({ showConfirm, deleteProject, docId }) {
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

  return (
    <div>
      <FaTrashAlt onClick={openModal} />
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div className="flex justify-between mb-4">
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Delete Project?</h2>
          <button onClick={closeModal}>X</button>
        </div>
        <div>
          <p>Are you sure you want to delete the project?</p>
          <div className="flex items-center space-x-4 mt-4">
            <button
              className="bg-maroon text-white px-3 w-20 py-1 mt-2"
              onClick={() => deleteProject(docId)}
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
