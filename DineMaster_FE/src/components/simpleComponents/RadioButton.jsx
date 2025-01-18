import React from "react";

const RadioButton = ({ title, setSelectedRole, selectedRole }) => {
  return (
    <div className="flex justify-center content-center items-center  mr-2">
      <input
        id="default-radio-1"
        type="radio"
        value=""
        name="default-radio"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        onClick={(e) => setSelectedRole(title)}
        checked={selectedRole === title}
      />
      <label className="ms-2 text-sm font-medium text-black dark:text-gbalck">
        {title}
      </label>
    </div>
  );
};

export default RadioButton;
