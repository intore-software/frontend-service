import React, { useEffect, useState } from "react";
import "../../styles/navbar.css";
import avatar2Image from "../../assets/images/avatar2.jpg";
import { FaBars } from "react-icons/fa";
import { connect, useSelector } from "react-redux";

const navbarPopupOptions = {
  PROFILE: "PROFILE",
  NOTIFICATIONS: "NOTIFICATIONS",
};

const Navbar = ({ dispatch, breadCrumbData = [], changeisShown, notifications = [], loading, notificationNumber }) => {
  const [popup, setpopup] = React.useState("");
  const [render, setrender] = useState(false);
  const { user } = useSelector((state) => state.auth);
  let { firstName = "", lastName = "" } = user?.profile || {};


  const changePopup = (newValue) => {
    setpopup(newValue === popup ? "" : newValue);
  };

  const avatar2 =
    !firstName && !lastName
      ? avatar2Image
      : `https://ui-avatars.com/api/?name=${firstName}+${lastName}&bold=true`;

  useEffect(() => {
    setrender(true)
  }, []);

  return (
    <div className="navbar" style={{ zIndex: "999999" }}>
      <div>{renderBreadCrumb(breadCrumbData, changeisShown)}</div>
      <div className="right-nav flex items-center gap-4 md:gap-8">
        <div className="relative">
          <img
            src={avatar2}
            alt="Profile"
            className="profileImg"
            onClick={() => changePopup(navbarPopupOptions.PROFILE)}
          ></img>
        </div>
      </div>
    </div>
  );
};

const renderBreadCrumb = (items = [], changeisShown) => {
  return (
    <div className="breadcrumb flex items-center">
      <FaBars className="navbar-toggler mr-2" onClick={changeisShown}></FaBars>
      <div className="flex" style={{ overflowX: "auto", width: "60vw" }}>
        {items.map((item, index) => (
          <p
            className={`breadcrumb-item ${index === items.length - 1 && "active font-bold "
              }`}
            key={index}
          >
            {item}{" "}
            {index !== items.length - 1 && <span className="separator">/</span>}
          </p>
        ))}
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  message: state.message.message
});

export default connect(mapStateToProps)(Navbar);
