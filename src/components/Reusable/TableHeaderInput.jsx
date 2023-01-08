import React from "react";
import "../../styles/forms.css";
import { isObject } from "lodash";

const TableHeaderInput = ({
  select = false,
  name,
  options = [],
  placeholder,
  handleChange,
  value,
  className = "",
}) => {
  return select
    ? renderSelect(name, options, handleChange, placeholder, value, className)
    : renderInput(name, handleChange, placeholder, value, className);
};

const renderInput = (name, handleChange, placeholder, value, className) => {
  return (
    <input
      type="text"
      className={"edit-placeholder " + className}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      defaultValue={value}
    ></input>
  );
};

const renderSelect = (
  name,
  options,
  handleChange,
  placeholder,
  value,
  className
) => {
  return (
    <select
      name={name}
      onInput={handleChange}
      className={"edit-select " + className}
      defaultValue={value}
    >
      <option value="">{placeholder || "Filter"}</option>
      {options.map((opt) => (
        <option
          value={isObject(opt) ? opt.value : opt}
          key={isObject(opt) ? opt.value : opt}
        >
          {isObject(opt) ? opt.label : opt}
        </option>
      ))}
    </select>
  );
};

export default TableHeaderInput;
