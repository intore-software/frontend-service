import React, { useEffect, useState } from "react";
import logo from "../../assets/logos/logo.png";
import "../../styles/sidebar.css";
import { Link, useHistory, useLocation } from "react-router-dom";

//icons
import { FaAngleDown, FaAngleRight, FaTimes } from "react-icons/fa";
import dashboardIcon from "../../assets/icons/dashboard.png";
import waiterIcon from "../../assets/icons/waiter.png"
import clerkIcon from "../../assets/icons/clerk.png"
import chefIcon from "../../assets/icons/chef.png"
import managerIcon from "../../assets/icons/manager.png"
import logoutIcon from "../../assets/icons/logout.png";
import { decrypt } from "../../services/crypto";
import { useDispatch } from "react-redux";

export const sidebarRoles = {
  ADMIN: "ADMIN",
  MAYOR: "MAYOR",
  SYSTEM_OPERATOR: "SYSTEM_OPERATOR"
};

const Sidebar = ({
  role = sidebarRoles.ADMIN,
  white = false,
  isShown = true,
  changeisShown,
}) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();


  const [userRole, setUserRole] = useState();

  useEffect(() => {
    const profilePayload = sessionStorage.getItem("hash");
    const profile = decrypt(profilePayload);
    const userRole = profile?.profile?.role;

    setUserRole(userRole);

  }, [dispatch]);


  let links = [
    {
      index: 100,
      title: "Home",
      path: "/dashboard",
      icon: dashboardIcon,
    }
  ]
  if (role === sidebarRoles.ADMIN) {
    links = [
      {
        index: 100,
        title: "Home",
        path: "/dashboard",
        icon: dashboardIcon,
      },
      {
        index: 101,
        title: "Mayors",
        icon: managerIcon,
        path: "/admin/mayors",
      },
      {
        index: 102,
        title: "System Operators",
        icon: managerIcon,
        path: "/admin/system-operators",
      },
      {
        index: 103,
        title: "Members",
        icon: managerIcon,
        path: "/admin/members"
      },
    ];
  }

  if(role === sidebarRoles.MAYOR){
    links = [
      {
        index: 100,
        title: "Home",
        path: "/dashboard",
        icon: dashboardIcon,
      },
      {
        index: 101,
        title: "Members",
        path: "/mayor/members",
        icon: managerIcon
      }
    ]
  }

  if(role === sidebarRoles.SYSTEM_OPERATOR){
    links = [
      {
        index: 100,
        title: "Home",
        path: "/dashboard",
        icon: dashboardIcon,
      },
      {
        index: 101,
        title: "Members",
        path: "/system-operator/members",
        icon: managerIcon
      },
      {
        index: 102,
        title: "Amasibo",
        path: "/system-operator/amasibo",
        icon: managerIcon
      },
    ]
  }

  //active status on links
  links = links.map((link) => {
    if (link.sublinks) {
      link.sublinks = link.sublinks.map((sublink) => {
        // if (sublink.path === location.pathname) sublink.active = true;
        if (location.pathname.startsWith(sublink.path)) sublink.active = true;
        return sublink;
      });
      // if (link.sublinks.find((sublink) => sublink.path === location.pathname))
      if (
        link.sublinks.find((sublink) =>
          location.pathname.startsWith(sublink.path)
        )
      ) {
        link.active = true;
      }

      // active sublink on subs activation
      link.sublinks = link.sublinks?.map((sublink) => {
        if (sublink.sub) {
          sublink.sub.map((s) => {
            if (location.pathname.startsWith(s)) {
              sublink.active = true;
            }
            return s;
          });
        }
        return sublink;
      });
    }
    if (link.path === location.pathname) link.active = true;
    return link;
  });

  const [active, setactive] = React.useState(
    links.find((link) => link.active)?.index
  );
  const changeActive = (newValue) => {
    setactive(active === newValue ? null : newValue);
  };

  return (
    <div
      className={`sidebar ${isShown && "sidebar-mobile-shown"} ${
        !white && "sidebar-gray"
      }`}
    >
      {isShown && <FaTimes className="close" onClick={changeisShown}></FaTimes>}
      <div className="logo-container">
        <img src="" alt="Intore Software"></img>
      </div>
      <div className="links-section">
        <div className="top-links">
          {renderLinks(links, changeActive, active, history)}
        </div>
        <div className="bottom-links">{renderBottomLinks()}</div>
      </div>
    </div>
  );
};

const renderLinks = (links = [], changeActive, active, history) => {
  return links.map((link, index) => (
    <div key={index} onClick={() => !link.sublinks && history.push(link.path)}>
      <div
        className={`sidebar-link ${link.active && "sidebar-link-active"}`}
        onClick={() =>
          link.sublinks && link.sublinks.length > 0 && changeActive(link.index)
        }
      >
        <div className={`sidebar-line ${link.active && "active"}`}></div>
        <img
          src={link.icon || dashboardIcon}
          alt={link.title}
          className="sidebar-img-icon"
        ></img>
        <span>{link.title}</span>
        {link.sublinks &&
          link.sublinks.length > 0 &&
          (link.index === active ? (
            <FaAngleDown className="angle-right"></FaAngleDown>
          ) : (
            <FaAngleRight className="angle-right"></FaAngleRight>
          ))}
      </div>
      {link.index === active &&
        link.sublinks &&
        link.sublinks.length > 0 &&
        renderSubLinks(link.sublinks)}
    </div>
  ));
};

const renderBottomLinks = () => {
  return (
    <Link to="/logout" className="sidebar-link">
      <div className={`sidebar-line`}></div>
      {/* <img src="" alt="Logout" className="sidebar-img-icon"></img> */}
      <span>Logout</span>
    </Link>
  );
};

const renderSubLinks = (sublinks = []) => {
  return (
    <div className="sublinks">
      {sublinks.map((sublink, index) =>
        sublink.hidden ? (
          <React.Fragment key={index}></React.Fragment>
        ) : (
          <Link to={sublink.path} className="sublink" key={index}>
            <div className={`sidebar-dot ${sublink.active && "active"}`}></div>
            <img
              src={sublink.icon || dashboardIcon}
              alt={sublink.title}
              className="sidebar-img-icon"
            ></img>
            <span>{sublink.title}</span>
          </Link>
        )
      )}
    </div>
  );
};

export default Sidebar;
