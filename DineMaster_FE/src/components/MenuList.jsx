import React from "react";
import ItemBox from "./ItemBox";
function MenuList(props) {
  const getPathToPage = (category, item) => {
    return `/${category}/${item.itemName}/${item.itemId}`;
  };

  return (
    <>
      {props.items.map((item, index) => (
        <ItemBox
          key={item.itemId}
          item={item}
          navigationPath={getPathToPage(props.category, item)}
          category={props.category}
          buttonText="Select"
          index={index}
        />
      ))}
    </>
  );
}

export default MenuList;
