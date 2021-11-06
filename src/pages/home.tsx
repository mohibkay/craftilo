import { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Tasks from "../components/task";
import { darkToast } from "../components/utils/Toast";

const Dashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    if (darkMode) darkToast("Dark Mode coming soon");
  }, [darkMode]);

  return (
    <>
      <Header
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
      />
      <main className="max-w-screen-lg mx-auto grid grid-cols-4">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <Tasks showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </main>
    </>
  );
};

export default Dashboard;
