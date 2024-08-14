import React from "react";
import logo from "./image/logo.png";


const Logo = () => {
  return (
    <div
    style={{textAlign: 'center'}}
    >
    <img style={{maxWidth:150}} src={logo} alt=""/>
    </div>
  )
};

export default Logo;
