import React, { useState, useEffect } from "react";

function KitchenNavigation(props) {
  const categories = [
    {
      PresentationName: "Preparation",
      value: "preparation",
      iconUrl: "/icons/preparationIcon.svg",
    },
    {
      PresentationName: "Quality",
      value: "quality",
      iconUrl: "/icons/qualityIcon.svg",
    },
  ];

  const [selectedCategory, setSelectedCategory] = useState(props.category);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category.value);
    props.onCategoryChange(category.value);
  };

  useEffect(() => {
    setSelectedCategory(props.category);
  }, [props.category]);

  return (
    <div className={"h-auto bg-black flex justify-center "}>
      <ul className={"flex justify-around list-none m-0 p-0 overflow-x-auto"}>
        {categories.map((category) => (
          <li
            key={category.value}
            className={`text-center mx-4 flex flex-col justify-center min-w-[65px] ${
              selectedCategory === category.value
                ? "border border-2 border-white bg-green-400"
                : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            <a className="flex flex-col items-center">
              <img
                src={category.iconUrl}
                className={
                  "h-14 w-auto mt-1 -my-1 border border-2 border-transparent"
                }
              />
              <p className={`text-white m-0 text-base`}>
                {category.PresentationName}
              </p>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default KitchenNavigation;
