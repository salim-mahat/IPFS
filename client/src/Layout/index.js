import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProfileContent from "../components/ProfileContent";

const NavigationBar = ({ logoSrc, children }) => {
  return (
    <div className="nav-wrapper">
      <Link to="/">
        <div className="logo-wrapper">
          <img src={logoSrc} alt="logo" />
        </div>
      </Link>
      <div className="nav-items">{children}</div>
    </div>
  );
};

const Body = (props) => {
  const userData = useSelector((s) => s.userData);

  return (
    <div className="body-wrapper">
      {userData.isLoggedIn && (
        <div className="profile-wrapper">
          <ProfileContent />
        </div>
      )}
      {props.children}
    </div>
  );
};

function Layout(props) {
  return <div className="layout">{props.children}</div>;
}

Layout.Body = Body;
Layout.NavigationBar = NavigationBar;

export default Layout;
