import React from "react";
import { FaTimes } from "react-icons/fa";
import "../../../styles/forms.css";
import Input from "../../Reusable/Input";
import checkIcon from "../../../assets/icons/check.png";
import {
  postMember,
  dispatchReloadMembers,
} from "../../../actions/system-operator/SystemOperatorMembersAction";
import Select from "react-select";
import * as location from "../../../data/location";
import { toast } from "react-toastify";
import { getLoginUserProfile } from "../../../services/profile.service";

const SystemOperatorAddNewMember = ({
  isEdit = false,
  memberDataToEdit = {},
  openModal,
  closeModal,
  sending,
  dispatch,
}) => {
  const [memberPostData, setmemberPostData] = React.useState(
    isEdit ? memberDataToEdit : {}
  );
  const [localSending, setlocalSending] = React.useState(false);
  const [error, seterror] = React.useState("");
  const [amasibo, setAmasibo] = React.useState([]);

  const genders = [
    {
      value: "MALE",
      label: "Male",
    },
    {
      value: "FEMALE",
      label: "Female",
    },
    {
      value: "OTHER",
      label: "Other",
    },
  ];

  React.useEffect(() => {
    async function loadAmasibo() {
      let profile = await getLoginUserProfile();
      let villageId = profile.profile.village.id;
      setAmasibo(await location.getAmasibo(villageId));
    }
    loadAmasibo();
  }, []);

  const inputHandler = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setmemberPostData({ ...memberPostData, [name]: value });
  };

  const selectHandler = (payload) => {
    var name = payload.name;
    var value = payload.value;
    setmemberPostData({ ...memberPostData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setlocalSending(true);
    let response = await postMember(memberPostData);
    if (response.success) {
      openModal(renderSuccessNotice(memberPostData, closeModal));
      seterror("");
      dispatch(dispatchReloadMembers());
    } else {
      seterror(response.error?.response?.data?.message || "Error occured");
      toast.error(error);
    }
    setlocalSending(false);
  };

  return (
    <>
      <div className="table-holder">
        <div className="header text-white flex justify-center items-center relative">
          {"Register Member"}
          <FaTimes
            className="text-white absolute right-4 cursor-pointer"
            onClick={closeModal}
          ></FaTimes>
        </div>
        <div className="content bg-white p-4">
          <form className="form" onSubmit={handleSubmit}>
            <div className="w-full ">
              <div className="flex flex-col items-center  justify-center">
                <div className="form-row">
                  <div className="form-group">
                    <Input
                      labelName="Firstname"
                      name="firstName"
                      inputHandler={inputHandler}
                      defaultInputValue={memberPostData.firstName || ""}
                      required={true}
                    ></Input>
                  </div>
                  <div className="form-group">
                    <Input
                      labelName="Lastname"
                      name="lastName"
                      inputHandler={inputHandler}
                      defaultInputValue={memberPostData.lastName || ""}
                      required={true}
                    ></Input>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Gender</label>
                    <Select
                      options={genders}
                      name="gender"
                      onChange={(payload) =>
                        selectHandler({ ...payload, name: "gender" })
                      }
                      className="mt-3"
                      placeholder={
                        <div className="select-placeholder-text">
                          Select Gender
                        </div>
                      }
                      defaultValue={memberPostData.gender || ""}
                    />
                  </div>
                  <div className="form-group">
                    <Input
                      labelName="Phone Number"
                      name="mobile"
                      inputHandler={inputHandler}
                      defaultInputValue={memberPostData.mobile || ""}
                      required={true}
                    ></Input>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      labelName="National ID"
                      name="nationalId"
                      inputHandler={inputHandler}
                      defaultInputValue={memberPostData.nationalId || ""}
                      required={true}
                    ></Input>
                  </div>
                  <div className="form-group">
                    <Input
                      name="dateOfBirth"
                      inputHandler={inputHandler}
                      type="date"
                      defaultInputValue={memberPostData.dateOfBirth || ""}
                      labelName="Date Of Birth"
                      placeholder="Date Of Birth"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group-full">
                    <label>Isibo</label>
                    <Select
                      options={amasibo}
                      name="isiboId"
                      onChange={(payload) =>
                        selectHandler({ ...payload, name: "isiboId" })
                      }
                      className="mt-3"
                      placeholder={
                        <div className="select-placeholder-text">
                          Select Isibo
                        </div>
                      }
                      defaultValue={memberPostData.isiboId || ""}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      labelName="Swearing In Place"
                      name="swearingInPlace"
                      inputHandler={inputHandler}
                      defaultInputValue={memberPostData.swearingInPlace || ""}
                    ></Input>
                  </div>
                  <div className="form-group">
                    <Input
                      name="swearingInDate"
                      inputHandler={inputHandler}
                      type="date"
                      defaultInputValue={memberPostData.swearingInDate || ""}
                      labelName="Swearing In Date"
                      placeholder="Swearing In Date"
                    />
                  </div>
                </div>

                <button type="submit" className="save-btn">
                  {sending || localSending ? "wait..." : "Register"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

function renderSuccessNotice(memberData, closeModal) {
  return (
    <div className="table-holder small">
      <div className="header text-white flex justify-center items-center relative">
        Notice
        <FaTimes
          className="text-white absolute right-4 cursor-pointer"
          onClick={closeModal}
        ></FaTimes>
      </div>
      <div className="content bg-white p-2 flex flex-col items-center justify-center">
        <p className="text-lg" style={{ color: "#868585" }}>
          Successfull
        </p>
        <img src={checkIcon} className="mt-2 h-8" alt="success"></img>
      </div>
    </div>
  );
}

export default SystemOperatorAddNewMember;
