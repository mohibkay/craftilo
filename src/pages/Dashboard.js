import { useState, useEffect } from "react";
import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Tasks from "../components/task";

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    document.title = `Dashboard - Craftilo`;
  }, []);

  return (
    <>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="max-w-screen-lg mx-auto grid grid-cols-4">
        <Sidebar />
        <Tasks />
      </main>
    </>
  );
}
