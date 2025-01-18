import React, { useState, useEffect } from "react";
import NavBar from "../components/layout/NavBar";
import { useLocation } from "react-router-dom";
import SelectedItemBox from "../components/SelectedItemBox";
import {
  getSelectedItemsByCategoryAndStatus,
  updateSelectedItemStatus,
} from "../services/controllers/OrdersController";
import { toast } from "react-toastify";

function KitchenView(props) {
  const [selectedCategory, setSelectedCategory] = useState();
  const [allSelectedItems, setAllSelectedItems] = useState([]);

  const location = useLocation();
  const handleCategoryChange = (category) => {
    if (selectedCategory !== category) {
      window.location.hash = category;

      setSelectedCategory(category);
    }
  };

  const loadData = (category) => {
    getSelectedItemsByCategoryAndStatus(category, "preparing")
      .then((response) => {
        console.log(response.data.selectedItems);
        setAllSelectedItems(response.data.selectedItems);
      })
      .catch((error) => toast.error(error.message));
  };

  useEffect(() => {
    props.setButtonContent("Go to quality");
    props.setHeaderNavigationPath("/kitchen/orders");
    let hash = location.hash.replace("#", "");
    if (location.pathname === "/kitchen/preparation") {
      if (!hash) {
        hash = "appetizer";
        window.location.hash = hash;
      }
    }
    setSelectedCategory(hash);
    console.log(hash + "sss");
    loadData(hash);

    const intervalId = setInterval(() => {
      loadData(hash);
    }, 10000);

    return () => clearInterval(intervalId);
  }, [location.hash]);

  const updateItemStatus = (selectedItemId) => {
    updateSelectedItemStatus(selectedItemId)
      .then(() => loadData(selectedCategory))
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <>
      <NavBar
        onCategoryChange={handleCategoryChange}
        category={selectedCategory}
      />
      {allSelectedItems && allSelectedItems.length === 0 ? (
        <div className="h-36 flex text-center items-center">
          <p className="text-red-600 w-full text-3xl">No orders</p>
        </div>
      ) : (
        <div
          className="min-h-[60vh] py-7 text-center grid 
              2xl:grid-cols-[repeat(4,288px)] 
              justify-center mx-10 gap-10
                xl:grid-cols-[repeat(3,288px)] 
                lg:grid-cols-[repeat(2,288px)] 
                lg:gap-10
                md:grid-cols-[repeat(1,384px)] 
                sm:grid-cols-[400px]"
        >
          {allSelectedItems.map((item, index) => (
            <SelectedItemBox
              key={`${item.selectedItemId}-${index}`}
              selectedItem={item}
              updateSelectedItemStatus={updateItemStatus}
            />
          ))}
        </div>
      )}
    </>
  );
}
export default KitchenView;
