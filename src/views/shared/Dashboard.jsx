import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { logout } from "../../actions/auth/AuthActions";
import { sidebarRoles } from "../../components/Reusable/Sidebar";
import SidebarPage from "../../components/Reusable/SidebarPage";
import AdminDashboard from "../../components/dashboards/AdminDashboard";
import MayorDashboard from "../../components/dashboards/MayorDashboard";
import SystemOperatorDashboard from "../../components/dashboards/SystemOperatorDashboard";
import ModalContainer from "../../components/Reusable/ModalContainer";

const defaultModalStatus = {
  shown: false,
  component: null,
};

function Dashboard() {
  const [modalShown, setmodalShown] = React.useState(defaultModalStatus);
  const dispatch = useDispatch();
  const history = useHistory();
  const { user } = useSelector((state) => state.auth);
  const profile = user?.profile;

  const logOut = () => {
    dispatch(logout());
    history.push("/login");
  };

  const closeModal = () => {
    setmodalShown(defaultModalStatus);
  };
  const openModal = (component) => {
    if (!component) {
      return;
    }
    setmodalShown({ shown: true, component });
  };

  let breadCrumbData = ["Dashboard"];
  let role = profile?.role;
  let sidebarRole = "";
  let displayRole = "Admin";
  switch (role) {
    case "ADMIN":
      sidebarRole = sidebarRoles.ADMIN;
      breadCrumbData.splice(0, 0, "System Admin");
      displayRole = "System Admin";
      break;
    case "MAYOR":
      sidebarRole = sidebarRoles.MAYOR;
      breadCrumbData.splice(0, 0, "Mayor");
      displayRole = "Mayor";
      break;
    case "SYSTEM_OPERATOR":
        sidebarRole = sidebarRoles.SYSTEM_OPERATOR;
        breadCrumbData.splice(0, 0, "System Operator");
        displayRole = "System Operator";
        break;
    default:
      break;
  }

  const [render, setrender] = useState(false);

  useEffect(() => {
    setrender(true);
  }, []);

  return (
    <>
      <SidebarPage
        breadCrumbData={breadCrumbData}
        role={sidebarRole}
        whiteSidebar={true}
        pageGray={false}
        title=""
        classes="p-4 md:p-8"
      >
        <>
          <div className="flex w-full">
            {user && (
              <div className="flex flex-col md:pl-10 items-center w-full test-profile">
                {role === "ADMIN" && (
                  <AdminDashboard
                    AdminProfile={profile}
                    displayRole={displayRole}
                  />
                )}
                {role === "MAYOR" && (
                  <MayorDashboard
                    MayorProfile={profile}
                    displayRole={displayRole}
                  />
                )}

                {role === "SYSTEM_OPERATPR" && (
                  <SystemOperatorDashboard
                    SystemOperatorProfile={profile}
                    displayRole={displayRole}
                  />
                )}
              </div>
            )}
          </div>
        </>
      </SidebarPage>
      {modalShown.shown && (
        <ModalContainer>{modalShown.component}</ModalContainer>
      )}
    </>
  );
}

export default Dashboard;
