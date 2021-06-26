import { Menu, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";

export default function MenuList({ setModalStatus, setShowEditModal }) {
  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <Menu
      menuButton={
        <svg
          onClick={handleClick}
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 p-1 hover:bg-primary rounded-full cursor-pointer"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
      }
    >
      <MenuItem
        onClick={() => {
          setShowEditModal(true);
          return false;
        }}
      >
        Edit
      </MenuItem>
      <MenuItem
        onClick={(e) => {
          setModalStatus(true);
          e.keepOpen = false;
          return false;
        }}
      >
        Delete
      </MenuItem>
    </Menu>
  );
}
