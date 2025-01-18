import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import ItemForm from "../components/ItemForm";
import Loader from "../components/states/Loader";
import ItemFormStore from "../services/stores/ItemFormStore";
import ErrorPage from "../components/ErrorPage";
import { toast } from "react-toastify";

function EditItem() {
  const location = useLocation();
  const { itemId, category, itemNameUrl } = useParams();
  const navigate = useNavigate();
  const [navigateToErrorPage, setNavigateToErrorPage] = useState(false);

  const {
    loading,
    error,
    selectedItem,
    loadItemData,
    deleteItem,
    itemName,
    itemPrice,
    itemIngredients,
    visibleInMenu,
    itemFileImage,
    isVegetarian,
    pizzaBase,
    pizzaSizes,
    pastaType,
    weight,
    sizeOfBeverage,
    updateIsVisibleInMenu,
    updateItemName,
    updateItemIngredients,
    updateItemPrice,
    updateIsVegetarian,
    updateWeight,
    updatePastaType,
    updatePizzaBase,
    updateSizeOfBeverage,
    addPizzaSize,
    removePizzaSize,
    updatePizzaSize,
    handleImageUpload,
    createAndUpdateItem,
    updateError,
  } = ItemFormStore();

  const updateItem = (data) => {
    updateItemName(data.itemNameInput);
    updateItemIngredients(
      data.itemIngredientsInput
        .split(",")
        .map((ingredient) => ingredient.trim())
    );
    updateItemPrice(data.itemPriceInput);
    if (data.pizzaBaseInput) {
      updatePizzaBase(data.pizzaBaseInput);
    }
    if (data.pastaTypeInput) {
      updatePastaType(data.pastaTypeInput);
    }
    if (data.itemWeightInput) {
      updateWeight(data.itemWeightInput);
    }
    if (data.BeverageSizeInput) {
      updateSizeOfBeverage(data.BeverageSizeInput);
    }
    if (data.isItemVegetarianInput) {
      updateIsVegetarian(data.isItemVegetarianInput);
    }
    return createAndUpdateItem(`/admin/manageItems#${category}`, navigate);
  };

  const loadData = (itemId) => {
    loadItemData(itemId)
      .then((response) => {
        if (
          response.itemCategory.categoryName.toLowerCase() !==
            category.toLowerCase() ||
          response.itemId != itemId ||
          response.itemName.toLowerCase() !== itemNameUrl.toLowerCase()
        ) {
          setNavigateToErrorPage(true);
          return;
        }
      })
      .catch((error) => {
        toast.error(error.message);
        setNavigateToErrorPage(true);
        return;
      });
  };
  useEffect(() => {
    if (!itemId || !category) {
      toast.error("Invalid item or category");
      setNavigateToErrorPage(true);
      return;
    }
    loadData(itemId);
  }, []);

  if (loading) {
    return <Loader />;
  }
  if (navigateToErrorPage) {
    return <ErrorPage />;
  }
  if (!itemId || !category) {
    return <div>Error: Missing item data</div>;
  }
  if (!selectedItem) {
    return <ErrorPage />;
  }

  return (
    <ItemForm
      itemImage={itemFileImage ? itemFileImage : selectedItem.itemImageVersion}
      itemImageUrl={itemFileImage ? itemFileImage : selectedItem.itemImageUrl}
      itemId={itemId}
      visibleInMenu={visibleInMenu}
      setVisibleInMenu={updateIsVisibleInMenu}
      itemName={itemName}
      pizzaSizes={pizzaSizes}
      setItemName={updateItemName}
      itemIngredients={itemIngredients}
      setItemIngredients={updateItemIngredients}
      itemPrice={itemPrice}
      setItemPrice={updateItemPrice}
      category={category}
      isVegetarian={isVegetarian}
      setIsVegetarian={updateIsVegetarian}
      weight={weight}
      updateWeight={updateWeight}
      pastaType={pastaType}
      updatePastaType={updatePastaType}
      pizzaBase={pizzaBase}
      setPizzaBase={updatePizzaBase}
      sizeOfBeverage={sizeOfBeverage}
      updateSizeOfBeverage={updateSizeOfBeverage}
      addPizzaSize={addPizzaSize}
      removePizzaSize={removePizzaSize}
      updatePizzaSize={updatePizzaSize}
      handleImageUpload={handleImageUpload}
      error={error}
      onSubmit={(data) => updateItem(data)}
      submitButtonText="Update"
      deleteItem={() => deleteItem(`/admin/manageItems#${category}`, navigate)}
      updateError={updateError}
    />
  );
}

export default EditItem;
