// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link, NavLink } from "react-router-dom";
import PropTypes from "prop-types";
import { MdLeaderboard } from "react-icons/md";
import { RiChatThreadFill } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";

const Navigation = ({ name, logout }) => {
  return (
    <header className="fixed top-0 left-0 shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] right-0 z-50 flex items-center justify-between flex-col md:flex-row px-20 py-4 font-quicksand bg-primary">
      <h1 className="text-2xl md:text-3xl font-semibold">
        <Link to="/" className="text-white no-underline">
          Forum App
        </Link>
      </h1>
      <nav>
        <ul className="flex items-center justify-center gap-2 list-none md:gap-5">
          <li>
            <NavLink
              to="/"
              className="text-base flex items-center gap-2 text-white no-underline md:text-xl hover:text-secondary hover:underline hover:underline-offset-8"
            >
              <RiChatThreadFill />
              Threads
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/leaderboards"
              className="text-base flex items-center gap-2 text-white no-underline md:text-xl hover:text-secondary hover:underline hover:underline-offset-8"
            >
              <MdLeaderboard />
              Leaderboards
            </NavLink>
          </li>
          <li>
            <button
              onClick={logout}
              className="flex items-center text-white gap-1 p-[2px] text-base border-solid rounded-md cursor-pointer border-lightMode hover:bg-hoverBtn px-1 py-1 bg-primary text-lightMode md:text-xl"
            >
              <BiLogOut className="text-white w-6 h-6 hover:bg-hoverBtn" />
              {name}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

Navigation.propTypes = {
  logout: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
};

export default Navigation;
