import { useState } from "react";
import { useAuth } from "../../context/authContext";
import AddTask from "../task/AddTask";
import { ROUTES } from "../../constants";
import { useHistory } from "react-router-dom";

interface Props {
  darkMode?: boolean;
  setDarkMode?: (s: boolean) => void;
  showSidebar?: boolean;
  setShowSidebar?: (s: boolean) => void;
}

const Header: React.FC<Props> = ({
  darkMode,
  setDarkMode,
  showSidebar,
  setShowSidebar,
}) => {
  const [openModal, setOpenModal] = useState(false);

  const history = useHistory();
  const { signOut, currentUser } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    history.push(ROUTES.LOGIN);
  };

  const handleShowSidebar = () => {
    setShowSidebar?.(!showSidebar);
  };

  return (
    <header
      className={`${darkMode ? "bg-black" : "bg-primary"} sticky w-full h-12`}
    >
      <nav className="flex justify-between items-center text-white py-2 px-4 md:px-0 text-xl max-w-screen-lg mx-auto">
        <div className="flex space-x-3 items-center">
          {currentUser && (
            <button
              onClick={handleShowSidebar}
              className="md:hidden focus:outline-none"
            >
              {showSidebar ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              )}
            </button>
          )}
          <h2 className="cursor-pointer">Craftilo</h2>
        </div>
        <div className="flex items-center space-x-3">
          {currentUser && (
            <ul className="flex items-center space-x-3">
              <li
                className="text-3xl cursor-pointer"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 cursor-pointer"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </li>
              <li onClick={() => setDarkMode?.(!darkMode)}>
                {darkMode ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 cursor-pointer"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                    />
                  </svg>
                )}
              </li>
            </ul>
          )}

          {currentUser && (
            <button className="focus:outline-none" onClick={handleSignOut}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          )}
        </div>
      </nav>

      <AddTask
        showAddTaskMain={false}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </header>
  );
};

export default Header;
