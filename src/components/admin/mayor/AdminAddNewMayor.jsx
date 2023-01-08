import React from "react";
import { FaTimes } from "react-icons/fa";
import "../../../styles/forms.css";
import Input from "../../Reusable/Input";
import checkIcon from "../../../assets/icons/check.png";
import {
  postMayor,
  dispatchReloadMayors,
} from "../../../actions/admin/AdminMayorsAction";
import Select from "react-select";
import * as location from "../../../data/location";
import { toast } from "react-toastify";

const AdminAddNewMayor = ({
  isEdit = false,
  mayorDataToEdit = {},
  openModal,
  closeModal,
  sending,
  dispatch,
}) => {
  const [mayorPostData, setMayorPostData] = React.useState(
    isEdit ? mayorDataToEdit : {}
  );
  const [localSending, setlocalSending] = React.useState(false);
  const [error, seterror] = React.useState("");
  const [provinces, setProvinces] = React.useState([]);
  const [districts, setDistrict] = React.useState([]);
  
  const genders = [
    {
      value: "MALE",
      label: "Male"
    },
    {
      value: "FEMALE",
      label: "Female"
    },
    {
      value: "OTHER",
      label: "Other"
    },
  ]

  React.useEffect(() => {
    async function loadData() {
      setProvinces(await location.getProvinces());
    }
    loadData();
  }, []);

  React.useEffect(() => {
    async function loadDistricts() {
      setDistrict(
        await location.getAllDistrictsByProvince(mayorPostData.province)
      );
    }
    loadDistricts();
  }, [mayorPostData.province]);

  const inputHandler = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setMayorPostData({ ...mayorPostData, [name]: value });
  };

  const selectHandler = (payload) => {
    var name = payload.name;
    var value = payload.value;
    setMayorPostData({ ...mayorPostData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setlocalSending(true);
    let response = await postMayor(mayorPostData);
    if (response.success) {
      openModal(renderSuccessNotice(mayorPostData, closeModal));
      seterror("");
      dispatch(dispatchReloadMayors());
    } else {
      seterror(response.error?.response?.data?.message || "Error occured");
      toast.error(error)
    }
    setlocalSending(false);
  };

  return (
    <>
      <div className="table-holder">
        <div className="header text-white flex justify-center items-center relative">
          {"Register Mayor"}
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
                      defaultInputValue={mayorPostData.firstName || ""}
                      required={true}
                    ></Input>
                  </div>
                  <div className="form-group">
                    <Input
                      labelName="Lastname"
                      name="lastName"
                      inputHandler={inputHandler}
                      defaultInputValue={mayorPostData.lastName || ""}
                      required={true}
                    ></Input>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group-full">
                    <Input
                      labelName="Email"
                      name="email"
                      inputHandler={inputHandler}
                      defaultInputValue={mayorPostData.email || ""}
                      placeholder="Enter email"
                      required={true}
                    ></Input>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group-full">
                    <Input
                      labelName="Phone Number"
                      name="mobile"
                      inputHandler={inputHandler}
                      defaultInputValue={mayorPostData.mobile || ""}
                      required={true}
                    ></Input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group-full">
                    <Input
                      labelName="National ID"
                      name="nationalId"
                      inputHandler={inputHandler}
                      defaultInputValue={mayorPostData.nationalId || ""}
                      required={true}
                    ></Input>
                  </div>
                </div>

                <div className="form-row">
                <div className="form-group-full">
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
                      defaultValue={mayorPostData.gender || ""}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Province</label>
                    <Select
                      options={provinces}
                      name="province"
                      onChange={(payload) =>
                        selectHandler({ ...payload, name: "province" })
                      }
                      className="mt-3"
                      placeholder={
                        <div className="select-placeholder-text">
                          Select Province
                        </div>
                      }
                      defaultValue={mayorPostData.province || ""}
                    />
                  </div>
                  <div className="form-group">
                    <label>District</label>
                    <Select
                      options={districts}
                      name="district"
                      onChange={(payload) =>
                        selectHandler({ ...payload, name: "districtId" })
                      }
                      className="mt-3"
                      placeholder={
                        <div className="select-placeholder-text">
                          Select District
                        </div>
                      }
                      defaultValue={mayorPostData.districtId || ""}
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

function renderSuccessNotice(mayorData, closeModal) {
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

export default AdminAddNewMayor;
