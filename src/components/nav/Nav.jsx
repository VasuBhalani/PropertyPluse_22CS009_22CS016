import React, { useState } from "react";
import "./nav.scss";
import { Link } from "react-router-dom";

function Navbar() {
  const [click, setClick] = useState(false);

  const user = true;
  return (
    <nav>
      <div className="leftnav">
        <Link to="/" className="logo">
          <img src="logo.png" alt="Hello" />
          <span>Property Plus</span>
        </Link>
        <Link to="">Home</Link>
        <Link to="">About</Link>
        <Link to="">Contact</Link>
        <Link to="">Agents</Link>
      </div>

      <div className="rightnav">
        {user ? (
          <div className="user">
           <img src="https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="user" />
            <span>John Doe</span>
            <Link to="/profile">
             <div className="notification">3</div>
             <span>Profile</span>
            </Link>
          </div>
        ) : (
          <>
            <Link to="/login" className="login">
              Login
            </Link>
            <Link to="/register" className="signup">
              Register
            </Link>
          </>
        )}
        {/* for small screen  */}

        <div className="menuIcon">
          <img
            src="menu.png"
            onClick={() => {
              setClick((prev) => !prev);
              console.log("Click:", click);
            }}
            Linklt="menu"
          />
        </div>

        <div className={click ? "menu active" : "menu"}>
          <Link to="">Home</Link>
          <Link to="">About</Link>
          <Link to="">Contact</Link>
          <Link to="">Agents</Link>
          <Link to="">Log in </Link>
          <Link to="">Register</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
