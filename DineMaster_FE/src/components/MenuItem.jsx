import React from "react";

function MenuItem(props) {
  return (
    <div>
      <h2>{props.item.name}</h2>
      <img src={props.item.imageUrl} />
      <p>{props.item.ingredients}</p>
      <button class="selectItembtn">Select</button>
    </div>
  );
}
