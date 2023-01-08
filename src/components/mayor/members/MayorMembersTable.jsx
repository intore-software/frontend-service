import React, { useEffect } from "react";
import TableHeader from "../../pagination/TableHeader";
import "../../../styles/tables.css";
import TablePagination from "../../pagination/TablePagination";
const ENDPOINT = import.meta.env.VITE_REACT_APP_BASE_API_URL;
import authHeader from '../../../services/auth-header';

export default function MayorMembersTable({
  openModal,
  closeModal,
  members = [],
  pages = 0,
  currentPage = 0,
  changePage,
  loading,
  dispatch,
  searchPage,
  defaultSearchValues,
  sending,
  role,
}) {
  let searchValues = defaultSearchValues || {
    name: "",
  };
  const [checked, setchecked] = React.useState([]);
  let [downloadExcel, setDownloadExcel] = React.useState(false);


  const handleCheck = (newValue, id) => {
    let tempChecked = checked;
    if (newValue && !tempChecked.includes(id)) {
      tempChecked.push(id);
    } else {
      tempChecked = tempChecked.filter((c) => c !== id);
    }
    setchecked(tempChecked);
  };

  const handleFilterChange = (e) => {
    searchPage({ ...searchValues, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.warn(members);
  }, []);

  const headerData = [
    {
      type: "input",
      name: "name",
      handleChange: handleFilterChange,
      placeholder: "Search by name",
      placement: "right",
      value: searchValues.name,
    },
  ];

  let displayMembers = [...members];

  let dowloadHandler = () => {
    setDownloadExcel(true);
    fetch(`${ENDPOINT}/members/mayor-search/excel/download`, {
      method: "GET",
      headers: {
        ...authHeader(),
      },
    })
      .then((response) => response.blob())
      .then((blob) => {
        // Create blob link to download
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "Members.xlsx");

        // Append to html link element page
        document.body.appendChild(link);

        // Start download
        link.click();
        setDownloadExcel(false);
        // Clean up and remove the link
        link.parentNode.removeChild(link);
      });
  };
  return (
    <>
      <button
        className={`sidebar-title-link large mr-2 mb-2 lg:mb-0`}
        onClick={() => dowloadHandler()}
      >
        {downloadExcel ? "Downloading......" : "Download Members Excel"}
      </button>
      <TableHeader headerData={headerData}>{""}</TableHeader>
      {renderTable({
        tableData: displayMembers,
        loading,
      })}
      <TablePagination
        pages={pages}
        active={currentPage}
        changePage={changePage}
        loading={loading}
      ></TablePagination>
      <div className="h-10"></div>
    </>
  );
}

const renderTable = ({ tableData = [], loading }) => {
  return (
    <div
      style={{ width: "100%", overflowX: "auto", minHeight: "20rem" }}
      className="table-container"
    >
      <table className="table mt-8">
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Phone Number</th>
            <th>National ID</th>
            <th>Gender</th>
            <th>DOB</th>
            <th>District</th>
            <th>Sector</th>
            <th>Cell</th>
            <th>Village</th>
            <th>Isibo</th>
          </tr>
        </thead>

        <tbody>
          {!loading &&
            tableData.map((tr, index) => (
              <>
                <tr className="space"></tr>
                <tr key={index}>
                  <td>{tr?.firstName}</td>
                  <td>{tr?.lastName}</td>
                  <td>{tr?.phoneNumber}</td>
                  <td>{tr?.nationalId}</td>
                  <td>{tr?.gender}</td>
                  <td>{tr?.dateOfBirth}</td>
                  <td>{tr?.district?.name}</td>
                  <td>{tr?.sector?.name}</td>
                  <td>{tr?.cell?.name}</td>
                  <td>{tr?.village?.name}</td>
                  <td>{tr?.isibo?.name}</td>
                </tr>
              </>
            ))}
        </tbody>
      </table>
      {(loading || tableData.length === 0) && (
        <p
          className="mt-6 text-base"
          style={{
            color: "#868585",
          }}
        >
          {loading ? "Loading..." : "No results Found"}
        </p>
      )}
    </div>
  );
};
