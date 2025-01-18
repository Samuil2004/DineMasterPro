import React from "react";
function PaginationPrevButton({ currentPageNumber, setPageNumber }) {
  return (
    <a
      href="#"
      className="flex items-center justify-center px-3 h-8 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      onClick={(e) => setPageNumber(currentPageNumber + 1)}
    >
      Next
    </a>
  );
}

export default PaginationPrevButton;
