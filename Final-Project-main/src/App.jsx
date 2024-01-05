import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { logo } from "./assets";
import "./App.css";
import { Home, CrP } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <header className="w-full  flex justify-between items-center bg-blue-950 sm:px-8 px-4 py-4 border-b border-b[#e6ebf4]">
        <Link to="/">
          <img src={logo} alt="logo" className="w-28 object-contain" />
        </Link>

        <Link
          to="/CreatingPage"
          className="font-inter font-medium bg-[#6469ff] text-white w-32  text-center mr-11  text-[24px] p-4 rounded-md"
        >
          Create
        </Link>
      </header>
      <main className='className="sm:p-8 px-4 py-8 w-full bg-[#12151E] min-h-[calc(100vh-73px)]"'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/CreatingPage" element={<CrP />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
