import React, { useState } from "react";
import { Link } from "react-router-dom";
const titleGet = localStorage.getItem("companyLogo");
const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(titleGet);

  setTimeout(() => {
    localStorage.setItem("companyLogo", title);
  }, 0);

  const toggel = () => {
    setOpen(!open);
  };

  const handleInputChange = (e) => {
    setTitle(e.target.value);
  };
  return (
    <div>
      <aside className="shadow-xl h-screen flex-shrink-0 hidden w-64 bg-white dark:bg-gray-800 lg:block">
        <div className="py-4 text-gray-500 dark:text-gray-400">
          <div className="ml-6 font-bold text-black text-sm">Company Name : </div>
          <div
            className="ml-6 border-2 mr-4 px-4 text-xl font-bold text-gray-800 dark:text-gray-200"
            href="#"
          >
            <input
              type="text"
              className="focus:outline-none w-48"
              value={title}
              placeholder="Ex. CODAT.IO"
              onChange={(e) => handleInputChange(e)}
            />
          </div>
          <ul className="mt-6">
            <li className="relative px-6 py-3">
              <Link
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                to="/invoice"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <span className="ml-4 text-xl">Invoices</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>

      {/* mobile display */}
      <div className="w-screen bg-white lg:hidden">
        <button
          className="p-5 mr-5 -ml-1 rounded-md lg:hidden focus:outline-none focus:shadow-outline-purple"
          aria-label="Menu"
          onClick={toggel}
        >
          <svg
            className="w-6 h-6"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
              clipRule="evenodd"
            ></path>
          </svg>
        </button>
        <div className="lg:hidden">
          <div
            className="-mt-12 ml-16 text-2xl font-bold text-gray-800 dark:text-gray-200"
            href="#"
          >
            <input
              type="text"
              className="focus:outline-none"
              value={title}
              onChange={(e) => handleInputChange(e)}
            />
          </div>
        </div>
      </div>
      {open && (
        <div className="absolute top-0 h-screen lg:hidden bg-white w-[50vw] sm:w-[300px] shadow-2xl">
          <div className="flex items-center justify-between flex-row-reverse">
            <button className="m-5" onClick={() => setOpen(false)}>
              <span className="bg-transparent text-black text-4xl block outline-none focus:outline-none">
                ×
              </span>
            </button>
            <div></div>
          </div>
          <ul className="mt-6">
            <li className="relative px-6 py-3">
              <Link
                className="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-800 dark:hover:text-gray-200"
                to="/invoice"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
                </svg>
                <span className="ml-4 text-xl">Invoices</span>
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Sidebar;