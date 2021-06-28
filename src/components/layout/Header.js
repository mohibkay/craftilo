import { useState } from "react";
import { FaPizzaSlice } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import AddTask from "../task/AddTask";
import { ROUTES } from "../../constants";
import { useHistory } from "react-router-dom";

export default function Header({ darkMode, setDarkMode }) {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const history = useHistory();
  const { signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut;
    history.push(ROUTES.LOGIN);
  };

  return (
    <header className={`${darkMode ? "bg-black" : "bg-primary"} sticky w-full`}>
      <nav className="flex justify-between items-center text-white py-2 px-4 md:px-0 text-xl max-w-screen-lg mx-auto">
        <div className="">
          <h2 className="cursor-pointer">craftilo</h2>
        </div>
        <div className="flex space-x-3">
          <ul className="flex items-baseline space-x-3">
            <li
              className="text-3xl cursor-pointer"
              onClick={() => {
                setOpenModal(true);
              }}
            >
              +
            </li>
            <li
              className=""
              onClick={() => setDarkMode((darkMode) => !darkMode)}
            >
              <FaPizzaSlice size="20" className="cursor-pointer" />
            </li>
          </ul>
          <button onClick={handleSignOut}>Sign Out</button>
        </div>
      </nav>

      <AddTask
        showAddTaskMain={false}
        shouldShowMain={shouldShowMain}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setShouldShowMain={setShouldShowMain}
      />
    </header>
  );
}
