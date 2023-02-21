import React from "react";

const CategoryField = (props) => {
  const {
    inputObj: { label, options },
    name,
  } = props;
  return (
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <di>{label}</di>
      <label
        for={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      />
      <select
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        name={name}
        id={name}
        onChange={(e) => props.changeHandler(e)}
      >
        {options.map((option, index) => {
          return (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default CategoryField;
