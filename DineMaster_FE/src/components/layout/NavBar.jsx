import React, { useState, useEffect } from "react";

function NavBar(props) {
  const categories = [
    {
      PresentationName: "Appetizer",
      value: "appetizer",
      iconUrl: "/icons/appetizersIcon.svg",
    },
    {
      PresentationName: "Pizza",
      value: "pizza",
      iconUrl: "/icons/pizzasIcon.svg",
    },
    {
      PresentationName: "Pasta",
      value: "pasta",
      iconUrl: "/icons/pastaIcon.svg",
    },
    {
      PresentationName: "Salad",
      value: "salad",
      iconUrl: "/icons/saladsIcon.svg",
    },
    {
      PresentationName: "Grill",
      value: "grill",
      iconUrl: "/icons/grillIcon.svg",
    },
    {
      PresentationName: "Burger",
      value: "burger",
      iconUrl: "/icons/burgerIcon.svg",
    },
    {
      PresentationName: "Soup",
      value: "soup",
      iconUrl: "/icons/soupIcon.svg",
    },
    {
      PresentationName: "Beverage",
      value: "beverage",
      iconUrl: "/icons/drinksIcon.svg",
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
    <div
      className={
        "h-auto bg-[#222020] flex justify-center border border-2 border-white -mx-3 sm:mx-3"
      }
    >
      <ul className={"flex justify-around list-none m-0 p-0 overflow-x-auto"}>
        {categories.map((category) => (
          <li
            key={category.value}
            className={`text-center mx-2 flex flex-col justify-center min-w-[65px] ${
              selectedCategory === category.value
                ? "border border-2 border-white"
                : ""
            }`}
          >
            <button
              className="flex flex-col items-center"
              onClick={() => handleCategoryClick(category)}
              aria-label={`Select ${category.PresentationName}`}
            >
              <img
                src={category.iconUrl}
                className={
                  "h-10 w-auto mt-1 -my-1 border border-2 border-transparent"
                }
                width="40"
                height="40"
                alt={`Image of ${category.value}`}
              />
              <p className={`text-white m-0 text-base`}>
                {category.PresentationName}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default NavBar;
