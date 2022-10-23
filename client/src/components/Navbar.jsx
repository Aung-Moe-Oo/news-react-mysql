import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import Logo from "../img/logo.png";

const Navbar = () => {
  const { currentUser, logout } = useContext(AuthContext);
  const [menu, setMenu] = useState(false);
  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} width={100} height={100} alt="logo" />
          </Link>
        </div>
        <div className="menu">
          {!menu ? (
            <div className="hamburger" onClick={() => setMenu(true)}>
              <div className="line line1"></div>
              <div className="line line2"></div>
              <div className="line line3"></div>
            </div>
          ) : (
            <div
              className="hamburger ham-closed"
              onClick={() => setMenu(false)}
            >
              <div className="line line1"></div>
              <div className="line line2"></div>
            </div>
          )}

          {menu && (
            <div className="links">
              <Link
                className="link"
                to="/?cat=art"
                onClick={() => setMenu(false)}
              >
                <h6>art</h6>
              </Link>
              <Link
                className="link"
                to="/?cat=science"
                onClick={() => setMenu(false)}
              >
                <h6>science</h6>
              </Link>
              <Link
                className="link"
                to="/?cat=technology"
                onClick={() => setMenu(false)}
              >
                <h6>technology</h6>
              </Link>
              <Link
                className="link"
                to="/?cat=cinema"
                onClick={() => setMenu(false)}
              >
                <h6>cinema</h6>
              </Link>
              <Link
                className="link"
                to="/?cat=design"
                onClick={() => setMenu(false)}
              >
                <h6>design</h6>
              </Link>
              <Link
                className="link lastlink"
                to="/?cat=food"
                onClick={() => setMenu(false)}
              >
                <h6>food</h6>
              </Link>
              <span>{currentUser?.username}</span>
              {currentUser ? (
                <span onClick={logout}>Logout</span>
              ) : (
                <Link className="link" to="/login">
                  Login
                </Link>
              )}
              {currentUser && (
                <span className="write" onClick={() => setMenu(false)}>
                  <Link className="link" to="/write">
                    Write
                  </Link>
                </span>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
