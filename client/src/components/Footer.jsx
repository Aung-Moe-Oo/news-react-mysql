import React from "react";
import Logo from "../img/logo.png";

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="logo" />
      <span>
        Made By Aung with <b>React.js</b>
      </span>
    </footer>
  );
};

export default Footer;
