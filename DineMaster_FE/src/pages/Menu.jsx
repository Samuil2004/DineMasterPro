import React, { useState, useEffect } from "react";
import MenuList from "../components/MenuList";
import NavBar from "../components/layout/NavBar";
import { useLocation } from "react-router-dom";
import Loader from "../components/states/Loader";
import { getAllVsibleItemsFromCategory } from "../services/controllers/publicApis/publicController";
import { toast } from "react-toastify";

function Menu() {
  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const loadItems = (category) => {
    getAllVsibleItemsFromCategory(category)
      .then((response) => {
        setItems(response.data.itemsInCategory);
      })
      .catch((error) => toast.error(error.message))
      .finally(() => setLoading(false));
  };

  const handleCategoryChange = (category) => {
    if (selectedCategory !== category) {
      window.location.hash = category;
      setSelectedCategory(category);
    }
  };

  useEffect(() => {
    let hash = location.hash.replace("#", "");
    if (location.pathname === "/menu") {
      if (!hash) {
        hash = "appetizer";
        window.location.hash = hash;
      }
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
        <MenuList items={items} category={selectedCategory} />
      </div>
    </>
  );
}

export default Menu;
