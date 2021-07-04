import { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Tasks from "../components/task";

export default function Dashboard() {
  const [theme, toggleTheme] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);

  useEffect(() => {
    document.title = `Dashboard - Craftilo`;
  }, []);

  return (
    <>
      <Header
        theme={theme}
        toggleTheme={toggleTheme}
        setShowSidebar={setShowSidebar}
        showSidebar={showSidebar}
      />
      <main className="max-w-screen-lg mx-auto grid grid-cols-4">
        <Sidebar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
        <Tasks showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      </main>
    </>
  );
}
