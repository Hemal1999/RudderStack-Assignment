import React from "react";

const ReadioFields = (props) => {
  const {
    inputObj: { label, options },
    name,
  } = props;

  return (
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <p>{label}</p>
      {options.map((option, index) => {
        return (
          <div key={index} class="flex items-center">
            <input
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              key={index}
              type="radio"
              id={option.label}
              name={name}
              onChange={(e) => props.changeHandler(e)}
            />
            <label
              for="default-radio-2"
              className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {option.label}
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default ReadioFields;
