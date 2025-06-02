import { useState } from "react";
import "./App.css";
import Footer from "./layouts/Footer";
import Header from "./layouts/Header";
import Sidebar from "./layouts/Sidebar";

function App() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed Header at Top */}

      <Header />

      <Sidebar />
      {/* Main content placeholder */}
      <main className="flex-1 px-4 py-6">
        <h1 className="text-2xl font-bold text-center"></h1>
      </main>

      {/* Fixed Footer at Bottom */}
      <Footer />
    </div>
  );
}

export default App;
