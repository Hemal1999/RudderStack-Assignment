import React from "react";

const InputFields = (props) => {
  const {
    inputObj: { label, placeholder, regexErrorMessage, required },
    template,
    name,
  } = props;

  return (
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <label
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        for="grid-first-name"
      >
        {name}
      </label>

      <input
        className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type="text"
        name={name}
        value={template[name] || ""}
        placeholder={placeholder}
        onChange={(e) => props.changeHandler(e)}
        required={required}
      />
      <p class="text-red-500 text-xs italic">{regexErrorMessage}.</p>
    </div>
  );
};

export default InputFields;
