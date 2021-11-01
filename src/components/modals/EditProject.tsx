import Modal from "react-modal";

Modal.setAppElement("*");

interface Props {
  modalStatus: boolean;
  setModalStatus: (s: boolean) => void;
  projectName: string;
  setProjectName: (s: string) => void;
  handleUpdate: () => void;
  addProject: () => void;
  type: number;
}

const EditModal: React.FC<Props> = ({
  modalStatus,
  setModalStatus,
  projectName,
  setProjectName,
  handleUpdate,
  addProject,
  type,
}) => {
  function closeModal() {
    setModalStatus(false);
  }

  const handleEditProject = () => {
    if (projectName) {
      if (type === 100) {
        addProject();
      } else {
        handleUpdate();
      }
      closeModal();
    }
  };

  return (
    <div className="group">
      <Modal
        isOpen={modalStatus}
        onRequestClose={closeModal}
        className="modal"
        contentLabel="Edit Project Modal"
      >
        <div className="flex justify-between mb-4">
          <h2 className="capitalize text-red-primary">
            {type === 100 ? "Add Project" : " Edit Project Title"}
          </h2>
          <button onClick={closeModal}>X</button>
        </div>
        <div>
          <input
            type="text"
            value={projectName}
            onChange={({ target }) => setProjectName(target.value)}
            className="w-full px-2 py-1.5 rounded my-2 border border-gray-primary bg-white focus:outline-none"
            placeholder="Name your project"
          />

          <div className="flex items-center space-x-4 mt-4">
            <button className="button w-20 mt-2" onClick={handleEditProject}>
              {type === 100 ? "Add" : "Update"}
            </button>
            <button className="button-secondary w-20" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default EditModal;
