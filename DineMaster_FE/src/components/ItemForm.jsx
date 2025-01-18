import React, { useRef, useState, useEffect } from "react";
import styles from "./ItemForm.module.css";
import { getImageForItemView } from "../services/controllers/ImageController";
import ConfirmationDialog from "../components/states/ConfirmationDialog";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import * as validation from "../services/Validations";
import ErrorAlert from "../components/states/ErrorAlert";
import PizaSizePriceInput from "./itemFormInputs/PizzaSizePriceInput";
import PizzaSizeInput from "./itemFormInputs/PizzaSizeInput";
import { toast } from "react-toastify";
import ItemNameInput from "../components/itemFormInputs/ItemNameInput";
import ItemIngredientsInput from "../components/itemFormInputs/ItemIngredientsInput";
import ItemPriceInput from "../components/itemFormInputs/ItemPriceInput";
import PizzaBaseInput from "../components/itemFormInputs/PizzaBaseInput";
import PastaTypeInput from "../components/itemFormInputs/PastaTypeInput";
import WeightInput from "../components/itemFormInputs/WeightInput";
import BeverageSizeInput from "../components/itemFormInputs/BeverageSizeInput";
import VegetarianInput from "../components/itemFormInputs/VegetarianInput";
import { deleteItemFromOrders } from "../services/controllers/ItemsController";
import ItemFormStore from "../services/stores/ItemFormStore";
function ItemForm({
  itemImage,
  itemImageUrl,
  itemId,
  visibleInMenu,
  setVisibleInMenu,
  itemName,
  pizzaSizes,
  itemIngredients,
  itemPrice,
  category,
  isVegetarian,
  weight,
  pastaType,
  pizzaBase,
  sizeOfBeverage,
  addPizzaSize,
  removePizzaSize,
  updatePizzaSize,
  handleImageUpload,
  error,
  onSubmit,
  submitButtonText = "Submit",
  deleteItem,
}) {
  const [visibleForOrders, setVisibleForOrders] = useState(false);
  const [visibleForDelete, setVisibleForDelete] = useState(false);

  const { loadItemData } = ItemFormStore();

  const navigate = useNavigate();
  const {
    control,
    register,
    handleSubmit,
    watch,
    unregister,
    reset,
    formState: { errors },
    setValue,
  } = useForm({ mode: "onChange" });

  const populateItemData = () => {
    setValue("itemNameInput", itemName);
    setValue("itemIngredientsInput", itemIngredients.join(", "));
    setValue("itemPriceInput", itemPrice);
    setValue("pizzaBaseInput", pizzaBase);
    setValue("pastaTypeInput", pastaType);
    setValue("itemWeightInput", weight);
    setValue("BeverageSizeInput", sizeOfBeverage);
    setValue("isItemVegetarianInput", isVegetarian);
  };
  useEffect(() => populateItemData(), []);

  const removePizzaSizeItemForm = (indexToRemove) => {
    removePizzaSize(indexToRemove);
    unregister(`pizzaSizes[${indexToRemove}].size`);
    unregister(`pizzaSizes[${indexToRemove}].additionalPrice`);
  };

  const renderItemDetails = () => {
    switch (category) {
      case "pizza":
        return (
          <>
            <PizzaBaseInput register={register} errors={errors} />
            {renderPizzaSizes()}
          </>
        );
      case "pasta":
        return (
          <>
            <PastaTypeInput register={register} errors={errors} />
            <WeightInput register={register} errors={errors} />
          </>
        );
      case "salad":
        return (
          <>
            <WeightInput register={register} errors={errors} />
          </>
        );
      case "beverage":
        return (
          <>
            <BeverageSizeInput register={register} errors={errors} />
          </>
        );
      case "grill":
        return (
          <>
            {" "}
            <WeightInput register={register} errors={errors} />
          </>
        );
      case "appetizer": {
        return (
          <>
            <VegetarianInput register={register} errors={errors} />
          </>
        );
      }
      case "soup": {
        return (
          <>
            {" "}
            <VegetarianInput register={register} errors={errors} />
          </>
        );
      }
      case "burger":
        return (
          <>
            {" "}
            <WeightInput register={register} errors={errors} />
          </>
        );
      default:
        return <></>;
    }
  };

  const renderPizzaSizes = () => {
    return (
      <>
        <h3 className="my-2">Sizes:</h3>
        {pizzaSizes.map((pizzaSize, indexWithinTheArray) => (
          <div className="h-auto mb-2 flex " key={indexWithinTheArray}>
            <PizzaSizeInput
              updatePizzaSize={updatePizzaSize}
              indexWithinTheArray={indexWithinTheArray}
              register={register}
              pizzaSize={pizzaSize}
              errors={errors}
            />

            <PizaSizePriceInput
              updatePizzaSize={updatePizzaSize}
              indexWithinTheArray={indexWithinTheArray}
              register={register}
              pizzaSize={pizzaSize}
              errors={errors}
              removePizzaSize={removePizzaSizeItemForm}
            />
          </div>
        ))}
        {pizzaSizes.length < 3 ? (
          <button
            onClick={(e) => {
              e.preventDefault(), addPizzaSize();
            }}
            className="h-10 w-[150px] bg-[rgb(95,95,253)] border border-2 border-indigo-600 rounded-md text-white font-sans text-lg hover:bg-white hover:text-[rgb(95,95,253)]"
          >
            + Add Pizza Size
          </button>
        ) : (
          <></>
        )}
      </>
    );
  };

  const handleFormSubmission = (data, e) => {
    return onSubmit(data).catch((error) => {
      toast.error(error.message);
    });
  };

  const onConfirmDeleteItem = () => {
    deleteItem();
  };

  const onConfirmDeleteFromOrders = () => {
    return deleteItemFromOrders(itemId)
      .then((response) => {
        if (response.status == 204) {
          toast.success("Item sucessfully deleted from orders");
        }
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const onReject = () => {
    setVisibleForDelete(false);
    setVisibleForOrders(false);
  };

  const onSubmitTest = (data) => {
    alert(JSON.stringify(data));
  };

  return (
    <div className={`${styles.centeredContainerForItem}`}>
      <div className={`${styles.imageHolder}`}>
        {itemImage ? (
          itemImage instanceof File ? (
            <>
              <img
                src={URL.createObjectURL(itemImage)}
                alt="Uploaded preview"
                className={styles.imagePreview}
              />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className={styles.uploadInput}
              />
            </>
          ) : (
            <>
              {getImageForItemView(itemId, itemImage, itemImageUrl)}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className={styles.uploadInput}
              />
            </>
          )
        ) : (
          <input
            {...register("itemImage", {
              ...validation.requiredField(),
            })}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className={styles.uploadInput}
            data-cy={`item-image-input`}
          />
        )}
        {errors.itemImage && (
          <p className="text-red-600">{errors.itemImage.message}</p>
        )}
      </div>
      <form
        className={`${styles.detailsHolder}`}
        onSubmit={handleSubmit(handleFormSubmission)}
        noValidate
      >
        {deleteItem != null ? (
          <>
            <div className="flex justify-end">
              <div className={"flex justify-end pr-16 mt-5 mb-2 items-center"}>
                <button
                  type="button"
                  className={
                    "h-10 w-[180px] bg-gray-500 text-black rounded-md font-sans text-lg border-none flex justify-center items-center hover:bg-gray-600 hover:text-white"
                  }
                  onClick={() => setVisibleForOrders(true)}
                >
                  Delete from orders
                </button>

                {visibleForOrders && (
                  <ConfirmationDialog
                    visible={visibleForOrders}
                    setVisible={setVisibleForOrders}
                    onConfirm={onConfirmDeleteFromOrders}
                    onReject={onReject}
                    content={
                      "Are you sure you want to delete this item from all orders?"
                    }
                  />
                )}
              </div>
              <div className={"flex justify-end pr-16 mt-5 mb-2 items-center"}>
                <button
                  type="button"
                  className={
                    "h-10 w-[150px] bg-red-600 text-black rounded-md font-sans text-lg border-none flex justify-center items-center hover:bg-black hover:text-white"
                  }
                  onClick={() => setVisibleForDelete(true)}
                >
                  Delete
                </button>

                {visibleForDelete && (
                  <ConfirmationDialog
                    visible={visibleForDelete}
                    setVisible={setVisibleForDelete}
                    onConfirm={onConfirmDeleteItem}
                    onReject={onReject}
                    content={"Are you sure you want to delete this item?"}
                  />
                )}
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
        <div className={`${styles.switchHolder}`}>
          <p className={`${styles.greyColor}`}>Show in menu:</p>
          <label className={`${styles.switch}`}>
            <input
              type="checkbox"
              checked={visibleInMenu}
              onChange={(e) => setVisibleInMenu(e.target.checked)}
            />
            <span className={`${styles.slider} ${styles.round}`}></span>
          </label>
        </div>
        <ItemNameInput register={register} errors={errors} />
        <ItemIngredientsInput register={register} errors={errors} />
        <ItemPriceInput register={register} errors={errors} />
        {renderItemDetails(category)}
        {error && <ErrorAlert errorMessage={error} />}
        <div className={`${styles.saveItem}`}>
          <button
            type="submit"
            className={`${styles.saveButton}`}
            data-cy={`button-create-item`}
          >
            {submitButtonText}
          </button>
        </div>
      </form>
    </div>
  );
}
export default ItemForm;
