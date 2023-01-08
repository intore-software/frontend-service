import React from "react";
import "../../styles/tables.css";
import TableHeaderInput from "../Reusable/TableHeaderInput";

const TableHeader = ({
  headerData = [],
  tabs = [],
  activeTab,
  changeActiveTab
}) => {
  return (
    <div className="flex flex-wrap justify-center md:justify-between table-header gap-4 md:gap-1">
      <div className="left">
        <div className="table-header-buttons flex">
          {tabs.map((tab, index) => (
            <React.Fragment key={index}>
              {index > 1 && <div className="dot"></div>}
              <button
                key={tab}
                className={`${activeTab === tab && "active"}`}
                onClick={() => changeActiveTab(tab)}
              >
                {tab}
              </button>
            </React.Fragment>
          ))}
          {headerData
            .filter((inp) => inp.placement === "left")
            .map((h, index) => (
              <TableHeaderInput
                select={h.type === "select"}
                {...h}
                key={index}
              ></TableHeaderInput>
            ))}
        </div>
      </div>
      <div className="right flex flex-wrap gap-2">
        {headerData
          .filter((inp) => inp.placement !== "left")
          .map((h, index) => (
            <TableHeaderInput
              select={h.type === "select"}
              {...h}
              key={index}
            ></TableHeaderInput>
          ))}
      </div>
    </div>
  );
};

export default TableHeader;
