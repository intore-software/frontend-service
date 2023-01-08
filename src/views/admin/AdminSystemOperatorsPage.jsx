import React from "react";
import ModalContainer from "../../components/Reusable/ModalContainer";
import { sidebarRoles } from "../../components/Reusable/Sidebar";
import SidebarPage from "../../components/Reusable/SidebarPage";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../styles/tables.css";
import { fetchSystemOperators, postSystemOperator } from "../../actions/admin/AdminSystemOperatorsAction";
import AdminSystemOperatorsTable from "../../components/admin/system-operators/AdminSystemOperatorsTable";
import AdminAddNewSystemOperator from "../../components/admin/system-operators/AdminAddNewSystemOperator";
import { decrypt } from "../../services/crypto";
const defaultModalStatus = {
  shown: false,
  component: null,
};

const AdminSystemOperatorsPage = ({ dispatch, loading, systemOperators, sending }) => {
  const [modalShown, setmodalShown] = React.useState(defaultModalStatus);
  const [activeTab, setactiveTab] = React.useState("Active");

  const history = useHistory();
  const hash = sessionStorage.getItem("hash");
  const decode = decrypt(hash);
  const { profile } = decode;
  const closeModal = () => {
    setmodalShown(defaultModalStatus);
  };
  const openModal = (component) => {
    if (!component) {
      return;
    }
    setmodalShown({ shown: true, component });
  };

  React.useEffect(() => {
    dispatch(fetchSystemOperators(0, { name: null }, activeTab));
    console.warn(systemOperators)
  }, [dispatch, activeTab]);

  const changeActiveTab = (newValue) => {
    setactiveTab(newValue);
  };

  const changePage = (newPage, searchValues) => {
    if (newPage !== systemOperators.number)
      dispatch(fetchSystemOperators(newPage, searchValues));
  };

  let breadCrumbData = ["System Admin", "Dashboard", "System Operators"];
  const searchPage = (searchValues) => {
    if (!searchValues?.name && !systemOperators.searchValues) {
    } else {
      dispatch(fetchSystemOperators(0, searchValues));
    }
  };
  const submitSystemOperators = (dataTOSubmit) => {
    dispatch(postSystemOperator(dataTOSubmit, history));
  };
  return (
    <>
      <SidebarPage
        breadCrumbData={breadCrumbData}
        role={sidebarRoles.ADMIN}
        whiteSidebar={false}
        pageGray={true}
        title="System Operators"
        classes="p-4 md:p-8"
      >
        <AdminSystemOperatorsTable
          openModal={openModal}
          closeModal={closeModal}
          systemOperators={systemOperators?.content}
          pages={systemOperators?.totalPages}
          currentPage={systemOperators?.number + 1}
          changePage={changePage}
          loading={loading}
          searchPage={searchPage}
          defaultSearchValues={systemOperators?.searchValues}
          dispatch={dispatch}
          sending={sending}
          role={profile?.role}
          activeTab={activeTab}
          changeActiveTab={changeActiveTab}
        ></AdminSystemOperatorsTable>
        {profile?.role === "ADMIN" && (
          <div className="flex w-full justify-center">
            <div className="bg-white flex items-center justify-center w-full">
              <button
                className="button-link"
                onClick={() =>
                  openModal(
                    <AdminAddNewSystemOperator
                      isEdit={false}
                      openModal={openModal}
                      closeModal={closeModal}
                      submit={submitSystemOperators}
                      sending={sending}
                      dispatch={dispatch}
                    ></AdminAddNewSystemOperator>
                  )
                }
              >
                New
              </button>
            </div>
          </div>
        )}
      </SidebarPage>
      {modalShown.shown && (
        <ModalContainer>{modalShown.component}</ModalContainer>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.adminSystemOperators.loading,
  systemOperators: state.adminSystemOperators.systemOperators,
  sending: state.adminSystemOperators.sending,
});

export default connect(mapStateToProps)(AdminSystemOperatorsPage);
