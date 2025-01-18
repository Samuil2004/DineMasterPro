import { NavLink } from "react-router-dom";
import { getImageForItemBoxMenu } from "../services/controllers/ImageController";
import { toast } from "react-toastify";

function SelectedItemBox(props) {
  return (
    <>
      <div
        key={props.selectedItem.selectedItemId}
        className="bg-black h-[500px] lg:w-72 md:w-96 w-[400px] rounded-xl flex flex-col box-border text-black transition-transform transform hover:scale-105 hover:shadow-lg border border-2 border-white text-white text-left"
      >
        <div className="flex w-full px-3 items-center justify-between  border-b-2 border-[#d7d7d7]">
          <p className=" mb-[1px] text-[25px] m-0 overflow-hidden text-ellipsis whitespace-nowrap">
            23
          </p>
          <p className=" mb-[1px] text-[20px] m-0 overflow-hidden text-ellipsis whitespace-nowrap  text-[#FF1E00]">
            {props.selectedItem.selectedItemId}
          </p>
        </div>
        <div className="flex h-[30%] w-full justify-center items-center ">
          {getImageForItemBoxMenu(
            props.selectedItem.itemOfReference.itemId,
            props.selectedItem.itemOfReference.itemImageVersion,
            props.selectedItem.itemOfReference.itemImageUrl,
            150,
            150
          )}
        </div>
        <div className="flex w-full items-center justify-between px-[10px] border-b-2 border-[#d7d7d7]">
          <p className=" mb-[1px] text-[25px] m-0 overflow-hidden text-ellipsis whitespace-nowrap">
            {props.selectedItem.itemOfReference.itemName}
          </p>
        </div>
        {props.selectedItem.itemOfReference.itemCategory.categoryName ===
        "PIZZA" ? (
          <div className="flex w-full justify-center mt-[2px]">
            <p className="px-[10px] mb-[1px] text-[20px] m-0 w-11/12 ">Size:</p>
            <p className="px-[10px] mb-[1px] text-[#77CDFF] text-[20px] m-0 w-11/12 ">
              {props.selectedItem.sizes.size}
            </p>
          </div>
        ) : (
          <></>
        )}
        <div className="flex w-full justify-center">
          <p className="px-[10px] mb-[1px]  text-[20px] m-0 w-11/12 ">
            Quantity:
          </p>
          <p className="px-[10px] mb-[1px] text-[#77CDFF] text-[20px] m-0 w-11/12 ">
            {props.selectedItem.amount}
          </p>
        </div>
        <div className="flex flex-col w-full justify-center">
          <p className="px-[10px] mb-[1px]  text-[20px] m-0 w-11/12 ">
            Comments:
          </p>
          <p className="px-[10px] mb-[1px] text-[#77CDFF] text-[18px] m-0 w-11/12 ">
            {props.selectedItem.comment}
          </p>
        </div>
        <div className="flex flex-grow h-[15%] items-center text-left">
          <p className="p-2 text-[#59CE8F] text-lg overflow-hidden whitespace-normal">
            {props.selectedItem.itemOfReference.ingredients.join(", ")}
          </p>
        </div>
        {/* <button className="bg-[rgb(95,95,253)] flex border-2 border-blue-500 justify-center items-center text-white font-sans text-[17px] w-full h-[15%] rounded-b-[10px] hover:text-[rgb(95,95,253)] hover:bg-white">
          Pass
        </button> */}
        <button
          onClick={() =>
            props.updateSelectedItemStatus(props.selectedItem.selectedItemId)
          }
          className="bg-[rgb(95,95,253)] flex border-2 border-blue-500 justify-center items-center text-white font-sans text-[17px] w-full h-[15%] rounded-b-[10px] hover:text-[rgb(95,95,253)] hover:bg-white"
        >
          Ready
        </button>
      </div>
    </>
  );
}
export default SelectedItemBox;
