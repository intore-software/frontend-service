import React from "react";
import { FaTimes } from "react-icons/fa";
import "../../../styles/forms.css";
import Input from "../../Reusable/Input";
import checkIcon from "../../../assets/icons/check.png";
import {
  postSystemOperator,
  dispatchReloadSystemOperators,
} from "../../../actions/admin/AdminSystemOperatorsAction";
import Select from "react-select";
import * as location from "../../../data/location";
import { toast } from "react-toastify";

const AdminAddNewSystemOperator = ({
  isEdit = false,
  systemOperatorDataToEdit = {},
  openModal,
  closeModal,
  sending,
  dispatch,
}) => {
  const [systemOperatorPostData, setSystemOperatorPostData] = React.useState(
    isEdit ? systemOperatorDataToEdit : {}
  );
  const [localSending, setlocalSending] = React.useState(false);
  const [error, seterror] = React.useState("");
  const [provinces, setProvinces] = React.useState([]);
  const [districts, setDistrict] = React.useState([]);
  const [sectors, setSectors] = React.useState([]);
  const [cells, setCells] = React.useState([]);
  const [villages, setVillages] = React.useState([]);

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
    async function loadData() {
      setProvinces(await location.getProvinces());
    }
    loadData();
  }, []);

  React.useEffect(() => {
    async function loadDistricts() {
      setDistrict(
        await location.getAllDistrictsByProvince(
          systemOperatorPostData.province
        )
      );
    }
    loadDistricts();
  }, [systemOperatorPostData.province]);

  React.useEffect(() => {
    async function loadData() {
      setSectors(
        await location.getAllSectorsByDistrict(systemOperatorPostData.districtId)
      );
    }
    loadData();
  }, [systemOperatorPostData.districtId]);

  React.useEffect(() => {
    async function loadData() {
      setCells(
        await location.getAllCellsBySectors(systemOperatorPostData.sector)
      );
    }
    loadData();
  }, [systemOperatorPostData.sector]);

  React.useEffect(() => {
    async function loadData() {
      setVillages(
        await location.getAllVillagesByCell(systemOperatorPostData.cell)
      );
    }
    loadData();
  }, [systemOperatorPostData.cell]);

  const inputHandler = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setSystemOperatorPostData({ ...systemOperatorPostData, [name]: value });
  };

  const selectHandler = (payload) => {
    var name = payload.name;
    var value = payload.value;
    setSystemOperatorPostData({ ...systemOperatorPostData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setlocalSending(true);
    let response = await postSystemOperator(systemOperatorPostData);
    if (response.success) {
      openModal(renderSuccessNotice(systemOperatorPostData, closeModal));
      seterror("");
      dispatch(dispatchReloadSystemOperators());
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
          {"Register System Operator"}
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
                      defaultInputValue={systemOperatorPostData.firstName || ""}
                      required={true}
                    ></Input>
                  </div>
                  <div className="form-group">
                    <Input
                      labelName="Lastname"
                      name="lastName"
                      inputHandler={inputHandler}
                      defaultInputValue={systemOperatorPostData.lastName || ""}
                      required={true}
                    ></Input>
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <Input
                      labelName="Email"
                      name="email"
                      inputHandler={inputHandler}
                      defaultInputValue={systemOperatorPostData.email || ""}
                      placeholder="Enter email"
                      required={true}
                    ></Input>
                  </div>
                  <div className="form-group">
                    <Input
                      labelName="Phone Number"
                      name="mobile"
                      inputHandler={inputHandler}
                      defaultInputValue={systemOperatorPostData.mobile || ""}
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
                      defaultInputValue={
                        systemOperatorPostData.nationalId || ""
                      }
                      required={true}
                    ></Input>
                  </div>
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
                      defaultValue={systemOperatorPostData.gender || ""}
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
                      defaultValue={systemOperatorPostData.province || ""}
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
                      defaultValue={systemOperatorPostData.districtId || ""}
                    />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Sector</label>
                    <Select
                      options={sectors}
                      name="sector"
                      onChange={(payload) =>
                        selectHandler({ ...payload, name: "sector" })
                      }
                      className="mt-3"
                      placeholder={
                        <div className="select-placeholder-text">
                          Select Sector
                        </div>
                      }
                      defaultValue={systemOperatorPostData.sector || ""}
                    />
                  </div>

                  <div className="form-group">
                    <label>Cell</label>
                    <Select
                      options={cells}
                      name="cell"
                      onChange={(payload) =>
                        selectHandler({ ...payload, name: "cell" })
                      }
                      className="mt-3"
                      placeholder={
                        <div className="select-placeholder-text">
                          Select Cell
                        </div>
                      }
                      defaultValue={systemOperatorPostData.cell || ""}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Village</label>
                    <Select
                      options={villages}
                      name="villageId"
                      onChange={(payload) =>
                        selectHandler({ ...payload, name: "villageId" })
                      }
                      className="mt-3"
                      placeholder={
                        <div className="select-placeholder-text">
                          Select Village
                        </div>
                      }
                      defaultValue={systemOperatorPostData.villageId || ""}
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

function renderSuccessNotice(systemOperatorData, closeModal) {
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

export default AdminAddNewSystemOperator;
