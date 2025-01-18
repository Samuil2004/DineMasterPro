import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ItemForm from "../components/ItemForm";
import { useLocation } from "react-router-dom";
import ItemFormStore from "../services/stores/ItemFormStore";
import { toast } from "react-toastify";

function AddItem() {
  const location = useLocation();
  const category = location.state.category;
  const navigate = useNavigate();

  const {
    error,
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
    constructAndCreateItem,
    updateCategory,
  } = ItemFormStore();

  const createItem = (data) => {
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
    if (data.beverageSizeInput) {
      updateSizeOfBeverage(data.beverageSizeInput);
    }
    if (data.isItemVegetarianInput) {
      updateIsVegetarian(data.isItemVegetarianInput);
    }
    return constructAndCreateItem(
      `/admin/manageItems#${category}`,
      navigate
    ).catch((error) => toast.error(error.message));
  };

  useEffect(() => {
    updateCategory(category);
  }, []);

  return (
    <ItemForm
      itemImage={itemFileImage}
      visibleInMenu={visibleInMenu}
      setVisibleInMenu={updateIsVisibleInMenu}
      itemName={itemName}
      setItemName={updateItemName}
      pizzaSizes={pizzaSizes}
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
      onSubmit={
        (data) => createItem(data)
        // constructAndCreateItem(
        //   `/admin/manageItems#${category}`,
        //   navigate
        // ).catch((error) => toast.error(error.message))
      }
      submitButtonText="Add"
      deleteItem={null}
    />
  );
}

export default AddItem;
