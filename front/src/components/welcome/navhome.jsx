import React, { useState, useRef, useEffect } from "react";
import { FaBars } from "react-icons/fa";



import { links} from "./data";

import { GoLaw } from "react-icons/go";
import { AiFillHome } from "react-icons/ai";
import { FcAbout } from "react-icons/fc";
import { BiLogIn } from "react-icons/bi";
const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const linksContainerRef = useRef(null);
  const linksRef = useRef(null);
  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };
  useEffect(() => {
    const linksHeight = linksRef.current.getBoundingClientRect().height;
    if (showLinks) {
      linksContainerRef.current.style.height = `${linksHeight}px`;
    } else {
      linksContainerRef.current.style.height = "0px";
    }
  }, [showLinks]);
  return (
    <nav className="navhome">
      <div className="nav-center">
        <div className="nav-header">
          <div className="divparent">
            <div className="divlogo">
              <GoLaw className="logonavbar"></GoLaw>
            </div>
            <div className="divlogo">
              <h3>Cabinet Avocat</h3>
            </div>
          </div>
          <button className="nav-toggle" onClick={toggleLinks}>
            <FaBars />
          </button>
        </div>
        <div className="links-container" ref={linksContainerRef}>
          <ul className="links" ref={linksRef}>
            {links.map((link) => {
              const { id, url, text } = link;
              return (
                <li key={id}>
                  <a href={url}>{text}</a>
                </li>
              );
            })}
          </ul>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
