import React from "react";
import ModalContainer from "../../components/Reusable/ModalContainer";
import { sidebarRoles } from "../../components/Reusable/Sidebar";
import SidebarPage from "../../components/Reusable/SidebarPage";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import "../../styles/tables.css";
import { fetchMembers } from "../../actions/system-operator/SystemOperatorMembersAction";
import SystemOperatorMembersTable from "../../components/system-operator/members/SystemOperatorMembersTable";
import SystemOperatorAddNewMember from "../../components/system-operator/members/SystemOperatorAddNewMember";
import { postMember} from "../../actions/system-operator/SystemOperatorMembersAction";
import { decrypt } from "../../services/crypto";

const defaultModalStatus = {
  shown: false,
  component: null,
};

const SystemOperatorMembers = ({ dispatch, loading, members, sending }) => {
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

  let breadCrumbData = ["System Operator", "Dashboard", "Members"];
  const searchPage = (searchValues) => {
    if (!searchValues?.name && !members.searchValues) {
    } else {
      dispatch(fetchMembers(0, searchValues));
    }
  };

  const submitMembers = (dataTOSubmit) => {
    dispatch(postMember(dataTOSubmit, history));
  };

  return (
    <>
      <SidebarPage
        breadCrumbData={breadCrumbData}
        role={sidebarRoles.SYSTEM_OPERATOR}
        whiteSidebar={false}
        pageGray={true}
        title="Members"
        classes="p-4 md:p-8"
      >
        <SystemOperatorMembersTable
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
        ></SystemOperatorMembersTable>
        {profile?.role === "SYSTEM_OPERATOR" && (
          <div className="flex w-full justify-center">
            <div className="bg-white flex items-center justify-center w-full">
              <button
                className="button-link"
                onClick={() =>
                  openModal(
                    <SystemOperatorAddNewMember
                      isEdit={false}
                      openModal={openModal}
                      closeModal={closeModal}
                      submit={submitMembers}
                      sending={sending}
                      dispatch={dispatch}
                    ></SystemOperatorAddNewMember>
                  )
                }
              >
                Register Member
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
  loading: state.systemOperatorMembers.loading,
  members: state.systemOperatorMembers.members,
});

export default connect(mapStateToProps)(SystemOperatorMembers);
