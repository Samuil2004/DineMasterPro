import React from "react";
import PaginationPrevButton from "./simpleComponents/PaginationPrevButton";
import PaginationNextButton from "./simpleComponents/PaginationNextButton";
const NavigationPanel = ({
  currentItems,
  totalNumberOfItems,
  pageNumber,
  setPageNumber,
}) => {
  return (
    <>
      {currentItems.length > 0 ? (
        <div className="flex mt-2 w-1/4 justify-between">
          <div className="">
            {pageNumber == 1 ? (
              <></>
            ) : (
              <PaginationPrevButton
                currentPageNumber={pageNumber}
                setPageNumber={setPageNumber}
              />
            )}
          </div>
          <div className="">
            {pageNumber == Math.ceil(totalNumberOfItems / 10) ? (
              <></>
            ) : (
              <PaginationNextButton
                currentPageNumber={pageNumber}
                setPageNumber={setPageNumber}
              />
            )}
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default NavigationPanel;
