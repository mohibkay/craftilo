import { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Tasks from "../components/task";

export default function Dashboard() {
  const [theme, toggleTheme] = useState(false);

  useEffect(() => {
    document.title = `Dashboard - Craftilo`;
  }, []);

  return (
    <>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="max-w-screen-lg mx-auto grid grid-cols-4">
        <Sidebar />
        <Tasks />
      </main>
    </>
  );
}
