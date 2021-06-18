import Header from "../components/layout/Header";
import Sidebar from "../components/layout/Sidebar";
import Tasks from "../components/tasks";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-screen-lg mx-auto grid grid-cols-4">
        <Sidebar />
        <Tasks />
      </main>
    </>
  );
}
