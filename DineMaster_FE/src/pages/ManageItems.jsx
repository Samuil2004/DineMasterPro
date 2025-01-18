import React, { useEffect, useState } from "react";
import NavBar from "../components/layout/NavBar";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Loader from "../components/states/Loader";
import ItemBox from "../components/ItemBox";
import { getAllItemsFromCategory } from "../services/controllers/ItemsController";
import { toast } from "react-toastify";

function ManageItems() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("appetizer");
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const loadItems = (category) => {
    getAllItemsFromCategory(category)
      .then((response) => {
        setItems(response.data.itemsInCategory);
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  };

  const getPathToPage = (item) => {
    return `/admin/manageItems/${selectedCategory}/${item.itemName}/${item.itemId}`;
  };

  const handleCategoryChange = (category) => {
    if (selectedCategory !== category) {
      window.location.hash = category;
      setSelectedCategory(category);
    }
  };

  useEffect(() => {
    let hash = location.hash.replace("#", "");

    if (!hash) {
      hash = "appetizer";
      window.location.hash = hash;
    }

    setSelectedCategory(hash);
    loadItems(hash);
  }, [location.hash]);

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <NavBar
        onCategoryChange={handleCategoryChange}
        category={selectedCategory}
      />
      <div
        className="min-h-[60vh] py-7 text-center grid 
              2xl:grid-cols-[repeat(5,230px)] 
              justify-center mx-10 gap-8
                xl:grid-cols-[repeat(4,230px)] 
                lg:grid-cols-[repeat(3,230px)] 
                lg:gap-5
                md:grid-cols-[repeat(2,300px)] 
                sm:grid-cols-[350px]"
      >
        {items.map((item, index) => (
          <ItemBox
            key={item.itemId}
            item={item}
            navigationPath={getPathToPage(item)}
            category={selectedCategory}
            buttonText="Edit"
            index={index}
          />
        ))}
        <div className="bg-green-500 flex h-24 w-[70%] max-w-[70%] rounded-lg self-center jusify-center hover:bg-green-400">
          <NavLink
            className="flex justify-center items-center text-white font-sans no-underline text-xl h-full w-full"
            to={`/admin/manageItems/addItem`}
            state={{ category: selectedCategory }}
            data-cy={`button-select-add-item`}
          >
            + Add new
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default ManageItems;
