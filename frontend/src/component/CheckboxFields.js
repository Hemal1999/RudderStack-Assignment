import React from 'react'

const CheckboxFields = (props) => {
    const {
        inputObj:{label},
        template,
        name,
      } = props
  return (
    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
      <input
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        type="checkbox"
        id={name}
        name={name}
        checked={template[name] || false}
        onChange={(e) => props.changeHandler(e)}
      />
      <label
        for={name}
        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}
      </label>
    </div>
  );
}

export default CheckboxFields