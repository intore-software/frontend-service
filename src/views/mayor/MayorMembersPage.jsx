import React from "react";
import ModalContainer from "../../components/Reusable/ModalContainer";
import { sidebarRoles } from "../../components/Reusable/Sidebar";
import SidebarPage from "../../components/Reusable/SidebarPage";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../styles/tables.css";
import { fetchMembers } from "../../actions/mayor/MayorMembersAction";
import MayorMembersTable from "../../components/mayor/members/MayorMembersTable";
import { decrypt } from "../../services/crypto";

const defaultModalStatus = {
  shown: false,
  component: null,
};

const MayorMembersPage = ({ dispatch, loading, members, sending }) => {
  const [modalShown, setmodalShown] = React.useState(defaultModalStatus);

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
    dispatch(fetchMembers(0, { name: null }));
  }, [dispatch]);

  const changePage = (newPage, searchValues) => {
    if (newPage !== members.number)
      dispatch(fetchMembers(newPage, searchValues));
  };

  let breadCrumbData = ["Mayor", "Dashboard", "Members"];
  const searchPage = (searchValues) => {
    if (!searchValues?.name && !members.searchValues) {
    } else {
      dispatch(fetchMembers(0, searchValues));
    }
  };

  return (
    <>
      <SidebarPage
        breadCrumbData={breadCrumbData}
        role={sidebarRoles.MAYOR}
        whiteSidebar={false}
        pageGray={true}
        title="Members"
        classes="p-4 md:p-8"
      >

        <MayorMembersTable
          openModal={openModal}
          closeModal={closeModal}
          members={members?.content}
          pages={members?.totalPages}
          currentPage={members?.number + 1}
          changePage={changePage}
          loading={loading}
          searchPage={searchPage}
          defaultSearchValues={members?.searchValues}
          dispatch={dispatch}
          sending={sending}
          role={profile?.role}
        ></MayorMembersTable>
      </SidebarPage>
      {modalShown.shown && (
        <ModalContainer>{modalShown.component}</ModalContainer>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  loading: state.mayorMembers.loading,
  members: state.mayorMembers.members,
});

export default connect(mapStateToProps)(MayorMembersPage);
