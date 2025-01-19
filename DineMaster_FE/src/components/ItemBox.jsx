import { NavLink } from "react-router-dom";
import { getImageForItemBoxMenu } from "../services/controllers/ImageController";

function ItemBox(props) {
  return (
    <NavLink
      key={props.item.itemId}
      to={props.navigationPath}
      className="bg-white h-[350px] lg:w-60 md:w-80 w-[370px] rounded-xl flex flex-col box-border text-black transition-transform transform hover:scale-105 hover:shadow-lg"
      state={{ itemId: props.item.itemId, category: props.category }}
    >
      <div className="flex w-full justify-center">
        <p className="p-[10px] border-b-2 border-[#d7d7d7] mb-[1px] text-[20px] m-0 w-11/12 text-lg overflow-hidden text-ellipsis whitespace-nowrap">
          {props.item.itemName}
        </p>
      </div>
      <div className="flex flex-grow h-[40%] w-full justify-center items-center ">
        {getImageForItemBoxMenu(
          props.item.itemId,
          props.item.itemImageVersion,
          props.item.itemImageUrl,
          150,
          150
        )}
      </div>
      <div className="flex h-[15%] justify-center items-center text-center">
        <p className="p-2 text-sm overflow-hidden">
          {props.item.ingredients.join(", ")}
        </p>
      </div>
      {props.buttonText === "Select" ? (
        <button
          className="bg-[#3A611F] flex justify-center items-center text-white text-xl font-sans w-full h-[15%] rounded-b-[10px] border-none hover:bg-[#63b21e]"
          data-cy={`button-select-${props.index}`}
        >
          {props.buttonText}
        </button>
      ) : (
        <button
          className="bg-[#0202D9] flex border-2 border-blue-500 justify-center items-center text-white font-sans text-[17px] w-full h-[15%] rounded-b-[10px] hover:text-[#3030FD] hover:bg-white"
          data-cy={`button-select-${props.index}`}
        >
          {props.buttonText}
        </button>
      )}
    </NavLink>
  );
}

export default ItemBox;
