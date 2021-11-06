import Modal from "react-modal";

Modal.setAppElement("*");

interface Props {
  modalStatus: boolean;
  setModalStatus: (s: boolean) => void;
  deleteProject?: (s: string) => void;
  projectId?: string;
  title: string;
  deleteTask?: (s: string) => void;
  taskId?: string;
}

const DeleteModal: React.FC<Props> = ({
  modalStatus,
  setModalStatus,
  deleteProject = () => {},
  projectId = "",
  title = "",
  deleteTask = () => {},
  taskId = "",
}) => {
  function closeModal() {
    setModalStatus(false);
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
      <Modal
        isOpen={modalStatus}
        onRequestClose={closeModal}
        className="modal"
        contentLabel="Delete Modal"
      >
        <div className="flex justify-between mb-4">
          <h2 className="capitalize text-red-primary">Delete {title}?</h2>
          <button onClick={closeModal}>X</button>
        </div>
        <div>
          <p>Are you sure you want to delete the {title}?</p>
          <div className="flex items-center space-x-4 mt-4">
            <button className="button w-20" onClick={deleteHandler}>
              Yes
            </button>
            <button
              className="w-20 button-secondary"
              onClick={() => setModalStatus(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DeleteModal;
