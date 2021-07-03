import { useState } from "react";
import { useAuth } from "../../context/authContext";
import AddTask from "../task/AddTask";
import { ROUTES } from "../../constants";
import { useHistory } from "react-router-dom";

export default function Header({
  theme,
  toggleTheme,
  showSidebar,
  setShowSidebar,
  sidebarRef,
}) {
  const [shouldShowMain, setShouldShowMain] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const history = useHistory();
  const { signOut, currentUser } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    history.push(ROUTES.LOGIN);
  };

  const handleShowSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <header
      className={`${theme ? "bg-maroon" : "bg-primary"} sticky w-full h-12`}
    >
      <nav className="flex justify-between items-center text-white py-2 px-4 md:px-0 text-xl max-w-screen-lg mx-auto">
        <div className="flex space-x-3 items-center">
          <button
            onClick={handleShowSidebar}
            className="md:hidden focus:outline-none"
          >
            {showSidebar ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
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
          <h2 className="cursor-pointer">Craftilo</h2>
        </div>
        <div className="flex items-center space-x-3">
          <ul className="flex items-center space-x-3">
            {currentUser && (
              <li
                className="text-3xl cursor-pointer"
                onClick={() => {
                  setOpenModal(true);
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
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
            )}
            <li onClick={() => toggleTheme((theme) => !theme)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                  clipRule="evenodd"
                />
              </svg>
            </li>
          </ul>

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
        shouldShowMain={shouldShowMain}
        openModal={openModal}
        setOpenModal={setOpenModal}
        setShouldShowMain={setShouldShowMain}
      />
    </header>
  );
}
