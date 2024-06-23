import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <ul className="flex space-x-4">
        <li>
          <Link to="/" className="text-white">
            Home
          </Link>
        </li>
        <li>
          <Link to="/admin" className="text-white">
            Admin Panel
          </Link>
        </li>
        <li>
          <Link to="/quizzes" className="text-white">
            Take Quiz
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
