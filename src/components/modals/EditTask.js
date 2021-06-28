import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "25%",
  },
};

Modal.setAppElement("*");

export default function EditTask({
  modalStatus,
  setModalStatus,
  taskName,
  setTaskName,
  handleUpdate,
}) {
  let subtitle;

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setModalStatus(false);
  }

  const handleEditProject = () => {
    if (taskName) {
      handleUpdate();
      closeModal();
    }
  };

  return (
    <div className="group">
      <Modal
        isOpen={modalStatus}
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
            Edit Task
          </h2>
          <button onClick={closeModal}>X</button>
        </div>
        <div>
          <input
            type="text"
            value={taskName}
            onChange={({ target }) => setTaskName(target.value)}
            className="w-full px-2 py-1.5 rounded my-2 border border-gray-primary bg-white focus:outline-none"
            placeholder="Name your project"
          />

          <div className="flex items-center space-x-4 mt-4">
            <button
              className="bg-primary rounded text-white px-3 w-20 py-1 mt-2"
              onClick={handleEditProject}
            >
              Update
            </button>
            <button
              className="bg-gray-primary rounded px-3 w-20 py-1 mt-2"
              onClick={closeModal}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
