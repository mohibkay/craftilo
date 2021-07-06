import Modal from "react-modal";

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
    setTask("");
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
        className="modal"
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
            <button type="submit" disabled={!task} className="button">
              Add Task
            </button>
            <button onClick={closeModal} className="button-secondary">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
