import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import AuthGuard from '../../guards/auth.guard';
const SidebarPage = ({
  breadCrumbData = [],
  role,
  children,
  whiteSidebar = false,
  pageGray = true,
  title = "",
  classes = "",
  titleLink = {},
}) => {
  const [sidebarShown, setSidebarShown] = React.useState(false);
  const toggleSidebarShown = () => {
    setSidebarShown(!sidebarShown);
  };
  return (
    <div className="flex">
      <AuthGuard />
      <Sidebar
        white={whiteSidebar}
        role={role}
        isShown={sidebarShown}
        changeisShown={toggleSidebarShown}
      ></Sidebar>
      <div className={`sidebar-page ${pageGray && "gray-page"}`}>
        <Navbar
          breadCrumbData={breadCrumbData}
          changeisShown={toggleSidebarShown}
        ></Navbar>
        <div className="flex w-full">
          {title && (
            <div
              style={{ height: "7vh" }}
              className="flex items-center justify-center sidebar-page-title flex-1"
            >
              {title}
            </div>
          )}
          {titleLink.path && titleLink.text && (
            <div className="bg-white flex items-center justify-center px-3">
              <Link to={titleLink.path} className="sidebar-title-link">
                {titleLink.text}
              </Link>
            </div>
          )}
        </div>
        <div
          className={`${pageGray ? "bg-white" : "bg-gray-100"} p-2 ${classes}`}
          style={{
            minHeight: title ? "80vh" : "87vh",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default SidebarPage;
