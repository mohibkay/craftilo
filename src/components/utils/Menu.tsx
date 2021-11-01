import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

interface Props {
  setModalStatus: (s: boolean) => void;
  setShowEditModal: (s: boolean) => void;
  type: number;
}

const MenuList: React.FC<Props> = ({
  setModalStatus,
  setShowEditModal,
  type,
}) => {
  const handleClick = (e: { stopPropagation: () => any }) => {
    e.stopPropagation();
  };

  return (
    <Menu
      className="border border-gray-primary"
      align="center"
      position="auto"
      direction={type === 100 ? "right" : "left"}
      arrow={true}
      portal={true}
      menuButton={
        <svg
          onClick={handleClick}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 p-1 hover:bg-primary hover:text-white  rounded-full cursor-pointer md:hidden group-hover:flex"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
          />
        </svg>
      }
    >
      <MenuItem
        className="border-b border-gray-primary"
        // @ts-ignore
        styles={{ active: "bg-primary" }}
        onClick={() => setShowEditModal(true)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 mr-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
        Edit
      </MenuItem>
      <MenuItem onClick={() => setModalStatus(true)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
          />
        </svg>
        Delete
      </MenuItem>
    </Menu>
  );
};

export default MenuList;
