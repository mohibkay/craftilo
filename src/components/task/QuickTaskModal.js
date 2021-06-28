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

export default function QuickTaskModal({
  setModalStatus,
  modalStatus,
  task,
  setTask,
  addTask,
}) {
  let subtitle;

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setModalStatus(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (task) {
      addTask();
      closeModal();
    }
  };

  return (
    <div>
      <Modal
        isOpen={modalStatus}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="flex justify-between mb-4">
          <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Quick Task</h2>
          <button onClick={closeModal}>X</button>
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Add Quick Task"
            className="w-full border border-gray-primary mx-0 px-2 py-1 rounded my-2 focus:outline-none"
            value={task}
            onChange={({ target }) => setTask(target.value)}
          />

          <div className="mt-4 space-x-4">
            <button
              type="submit"
              disabled={!task}
              className="bg-primary rounded text-white px-2.5 py-1 mt-2"
            >
              Add Task
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-light rounded px-3 py-1 mt-2"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
