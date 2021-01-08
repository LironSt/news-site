import React from "react";
import { NavLink } from "react-router-dom";
import './header.css'

function Header() {
  return (
    <div>
      <nav>
        <ul className="nav-bar">
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/business">Business</NavLink>
          </li>
          <li>
            <NavLink to="/entertainment">Entertainment</NavLink>
          </li>
          <li>
            <NavLink to="/health">Health</NavLink>
          </li>
          <li>
            <NavLink to="/sports">Sports</NavLink>
          </li>
          <li>
            <NavLink to="/technology">Technology</NavLink>
          </li>
          <li>
            <NavLink to="/reporters">Reporters</NavLink>
          </li>

        </ul>
      </nav>
    </div>
  );
}

export default Header;
