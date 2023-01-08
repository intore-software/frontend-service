import React from "react";
import ModalContainer from "../../components/Reusable/ModalContainer";
import { sidebarRoles } from "../../components/Reusable/Sidebar";
import SidebarPage from "../../components/Reusable/SidebarPage";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../styles/tables.css";
import { fetchMayors, postMayor } from "../../actions/admin/AdminMayorsAction";
import AdminMayorsTable from "../../components/admin/mayor/AdminMayorsTable";
import AdminAddNewMayor from "../../components/admin/mayor/AdminAddNewMayor";
import { decrypt } from "../../services/crypto";
const defaultModalStatus = {
  shown: false,
  component: null,
};

const AdminMayorsPage = ({ dispatch, loading, mayors, sending }) => {
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
    dispatch(fetchMayors(0, { name: null }, activeTab));
  }, [dispatch, activeTab]);

  const changeActiveTab = (newValue) => {
    setactiveTab(newValue);
  };

  const changePage = (newPage, searchValues) => {
    if (newPage !== mayors.number)
      dispatch(fetchMayors(newPage, searchValues));
  };

  let breadCrumbData = ["System Admin", "Dashboard", "Mayors"];
  const searchPage = (searchValues) => {
    if (!searchValues?.name && !mayors.searchValues) {
    } else {
      dispatch(fetchMayors(0, searchValues));
    }
  };
  const submitMayors = (dataTOSubmit) => {
    dispatch(postMayor(dataTOSubmit, history));
  };
  return (
    <>
      <SidebarPage
        breadCrumbData={breadCrumbData}
        role={sidebarRoles.ADMIN}
        whiteSidebar={false}
        pageGray={true}
        title="System Mayors"
        classes="p-4 md:p-8"
      >
        <AdminMayorsTable
          openModal={openModal}
          closeModal={closeModal}
          mayors={mayors?.content}
          pages={mayors?.totalPages}
          currentPage={mayors?.number + 1}
          changePage={changePage}
          loading={loading}
          searchPage={searchPage}
          defaultSearchValues={mayors?.searchValues}
          dispatch={dispatch}
          sending={sending}
          role={profile?.role}
          activeTab={activeTab}
          changeActiveTab={changeActiveTab}
        ></AdminMayorsTable>
        {profile?.role === "ADMIN" && (
          <div className="flex w-full justify-center">
            <div className="bg-white flex items-center justify-center w-full">
              <button
                className="button-link"
                onClick={() =>
                  openModal(
                    <AdminAddNewMayor
                      isEdit={false}
                      openModal={openModal}
                      closeModal={closeModal}
                      submit={submitMayors}
                      sending={sending}
                      dispatch={dispatch}
                    ></AdminAddNewMayor>
                  )
                }
              >
                Register Mayor
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
  loading: state.adminMayors.loading,
  mayors: state.adminMayors.mayors,
  sending: state.adminMayors.sending,
});

export default connect(mapStateToProps)(AdminMayorsPage);
