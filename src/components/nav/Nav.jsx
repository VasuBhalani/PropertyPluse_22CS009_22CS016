import React, { useContext,useState } from "react";
import "./nav.scss";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext.jsx";
function Navbar() {
  const [click, setClick] = useState(false);
  const {currentUser}=useContext(AuthContext);

  return (
    <nav>
      <div className="leftnav">
        <Link to="/" className="logo">
          <img src="/logo.png" alt="Hello" />
          <span>Property Plus</span>
        </Link>
        <Link to="/">Home</Link>
        <Link to="/">About</Link>
        <Link to="/">Contact</Link>
        <Link to="/">Agents</Link>
      </div>

        {/* if user is login -> currentuser  
             currentuser ?  to profile valo part render : login and signup
        */}

      <div className="rightnav">
        {currentUser ? (
          <div className="user">
           <img src={currentUser.avtar || "/noavatar.jpg"} alt="user" />
            <span>{currentUser.username}</span>
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
          />
        </div>

        <div className={click ? "menu active" : "menu"}>
          <Link to="/">Home</Link>
          <Link to="/">About</Link>
          <Link to="/">Contact</Link>
          <Link to="/">Agents</Link>
          <Link to="/">Log in </Link>
          <Link to="/">Register</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
