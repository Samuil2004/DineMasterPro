import { create } from "zustand";

import {
  getItemById,
  updateItem,
  deleteItemFromMenu,
  createItem,
} from "../controllers/ItemsController";
import * as classes from "../Classes";
import { toast } from "react-toastify";

const ItemFormStore = create((set, get) => ({
  //From state
  itemId: null,
  category: "",

  //Page components
  loading: true,
  error: null,

  //Item details
  selectedItem: null,
  itemName: "",
  itemPrice: "",
  itemIngredients: [],
  visibleInMenu: true,
  itemImageVersion: "",
  itemFileImage: null,
  isVegetarian: false,
  pizzaBase: "",
  pizzaSizes: [{ size: "", additionalPrice: "" }],
  pastaType: "",
  weight: "",
  sizeOfBeverage: "",

  resetFields: () => {
    set({
      selectedItem: null,
      itemName: "",
      itemPrice: "",
      itemIngredients: [],
      visibleInMenu: true,
      itemImageVersion: "",
      itemFileImage: null,
      isVegetarian: false,
      pizzaBase: "",
      loading: true,
      pizzaSizes: [{ size: "", additionalPrice: "" }],
      pastaType: "",
      weight: "",
      sizeOfBeverage: "",
      error: null,
    });
  },

  loadItemData: (itemId, category) => {
    set({ loading: true, error: null }),
      set({ itemId: itemId }),
      get().resetFields();
    return getItemById(itemId)
      .then((response) => {
        const foundItem = response.data.foundItem;
        set({
          selectedItem: foundItem,
          category: foundItem.itemCategory.categoryName.toLowerCase(),
          itemName: foundItem.itemName,
          itemPrice: foundItem.itemPrice,
          itemIngredients: foundItem.ingredients,
          visibleInMenu: foundItem.visibleInMenu,
          itemImageVersion: foundItem.itemImageVersion,
          isVegetarian:
            foundItem.itemCategory.categoryName.toLowerCase() === "appetizer"
              ? foundItem.isVegetarian
              : false,
          pizzaBase:
            foundItem.itemCategory.categoryName.toLowerCase() === "pizza"
              ? foundItem.base
              : "",
          pizzaSizes:
            foundItem.itemCategory.categoryName.toLowerCase() === "pizza"
              ? foundItem.sizes.map((size) => ({
                  size: size.size,
                  additionalPrice: size.additionalPrice,
                }))
              : [{ size: "", additionalPrice: "" }],
          pastaType:
            foundItem.itemCategory.categoryName.toLowerCase() === "pasta"
              ? foundItem.pastaType
              : "",
          weight:
            foundItem.itemCategory.categoryName.toLowerCase() === "pasta" ||
            foundItem.itemCategory.categoryName.toLowerCase() === "salad" ||
            foundItem.itemCategory.categoryName.toLowerCase() === "grill" ||
            foundItem.itemCategory.categoryName.toLowerCase() === "burger"
              ? foundItem.weight
              : "",
          sizeOfBeverage:
            foundItem.itemCategory.categoryName.toLowerCase() === "beverage"
              ? foundItem.size
              : "",
        });
        return response.data.foundItem;
      })
      .catch((error) => {
        throw error;
      })
      .finally(() => set({ loading: false }));
  },
  handleImageUpload: (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        set({ itemFileImage: file });
      };
      reader.readAsDataURL(file);
    }
  },
  deleteItem: (navigationPath, navigate) => {
    deleteItemFromMenu(get().category, get().itemId)
      .then(() => {
        navigate(navigationPath);
      })
      .catch((error) => toast.error(error.message));
  },
  addPizzaSize: () => {
    if (get().pizzaSizes.length < 3) {
      set({
        pizzaSizes: [...get().pizzaSizes, { size: "", additionalPrice: "" }],
      });
    }
  },
  removePizzaSize: (index) => {
    if (get().pizzaSizes.length > 1) {
      const newSizes = [...get().pizzaSizes];
      newSizes.splice(index, 1);
      set({ pizzaSizes: newSizes });
    }
  },

  updatePizzaSize: (index, field, value) => {
    const updatedSizes = [...get().pizzaSizes];
    updatedSizes[index][field] = value;
    set({ pizzaSizes: updatedSizes });
  },
  updateCategory: (value) => {
    get().resetFields();
    set({ category: value });
  },
  updateWeight: (value) => {
    set({ weight: value });
  },
  updateError: (value) => {
    set({ error: value });
  },

  updatePastaType: (value) => {
    set({ pastaType: value });
  },
  updateIsVisibleInMenu: (value) => {
    set({ visibleInMenu: value });
  },

  updateSizeOfBeverage: (value) => {
    set({ sizeOfBeverage: value });
  },
  updateItemName: (value) => {
    set({ itemName: value });
  },
  updateItemIngredients: (value) => {
    set({ itemIngredients: value });
  },
  updateItemPrice: (value) => {
    set({ itemPrice: value });
  },
  updateIsVegetarian: (value) => {
    set({ isVegetarian: value });
  },
  updatePizzaBase: (value) => {
    set({ pizzaBase: value });
  },

  createAndUpdateItem: (navigationPath, navigate) => {
    const {
      category,
      itemName,
      itemImageVersion,
      itemPrice,
      itemIngredients,
      itemFileImage,
      visibleInMenu,
      pizzaSizes,
      pizzaBase,
      pastaType,
      weight,
      sizeOfBeverage,
      isVegetarian,
      itemId,
    } = get();
    let updatedItem = null;
    if (category === "appetizer") {
      updatedItem = new classes.Appetizer(
        itemName,
        itemImageVersion,
        itemPrice,
        itemIngredients,
        itemFileImage,
        visibleInMenu,
        isVegetarian
      );
    }
    if (category === "pizza") {
      updatedItem = new classes.Pizza(
        itemName,
        itemImageVersion,
        itemPrice,
        itemIngredients,
        itemFileImage,
        visibleInMenu,
        pizzaSizes,
        pizzaBase
      );
    }
    if (category === "pasta") {
      updatedItem = new classes.Pasta(
        itemName,
        itemImageVersion,
        itemPrice,
        itemIngredients,
        itemFileImage,
        visibleInMenu,
        pastaType,
        weight
      );
    }
    if (category === "salad") {
      updatedItem = new classes.Salad(
        itemName,
        itemImageVersion,
        itemPrice,
        itemIngredients,
        itemFileImage,
        visibleInMenu,
        weight
      );
    }
    if (category === "grill") {
      updatedItem = new classes.Grill(
        itemName,
        itemImageVersion,
        itemPrice,
        itemIngredients,
        itemFileImage,

        visibleInMenu,
        weight
      );
    }
    if (category === "burger") {
      updatedItem = new classes.Burger(
        itemName,
        itemImageVersion,
        itemPrice,
        itemIngredients,
        itemFileImage,
        visibleInMenu,
        weight
      );
    }
    if (category === "soup") {
      updatedItem = new classes.Soup(
        itemName,
        itemImageVersion,
        itemPrice,
        itemIngredients,
        itemFileImage,
        visibleInMenu,
        isVegetarian
      );
    }
    if (category === "beverage") {
      updatedItem = new classes.Beverage(
        itemName,
        itemImageVersion,
        itemPrice,
        itemIngredients,
        itemFileImage,
        visibleInMenu,
        sizeOfBeverage
      );
    }

    return updateItem(category, itemId, updatedItem)
      .then(() => {
        navigate(navigationPath);
      })
      .catch((error) => {
        throw error;
      });
  },

  constructAndCreateItem: (navigationPath, navigate) => {
    const {
      category,
      itemName,
      itemImage,
      itemPrice,
      itemIngredients,
      itemFileImage,
      visibleInMenu,
      pizzaSizes,
      pizzaBase,
      pastaType,
      weight,
      sizeOfBeverage,
      isVegetarian,
    } = get();
    let newItem = null;
    if (category === "appetizer") {
      newItem = new classes.Appetizer(
        itemName,
        itemImage,
        itemPrice,
        itemIngredients,
        itemFileImage,
        visibleInMenu,
        isVegetarian
      );
    }
    if (category === "pizza") {
      newItem = new classes.Pizza(
        itemName,
        itemImage,
        itemPrice,
        itemIngredients,
        itemFileImage,
        visibleInMenu,
        pizzaSizes,
        pizzaBase
      );
    }
    if (category === "pasta") {
      newItem = new classes.Pasta(
        itemName,
        itemImage,
        itemPrice,
        itemIngredients,
        itemFileImage,
        visibleInMenu,
        pastaType,
        weight
      );
    }
    if (category === "salad") {
      newItem = new classes.Salad(
        itemName,
        itemImage,
        itemPrice,
        itemIngredients,
        itemFileImage,
        visibleInMenu,
        weight
      );
    }
    if (category === "grill") {
      newItem = new classes.Grill(
        itemName,
        itemImage,
        itemPrice,
        itemIngredients,
        itemFileImage,
        visibleInMenu,
        weight
      );
    }
    if (category === "burger") {
      newItem = new classes.Burger(
        itemName,
        itemImage,
        itemPrice,
        itemIngredients,
        itemFileImage,
        visibleInMenu,
        weight
      );
    }
    if (category === "soup") {
      newItem = new classes.Soup(
        itemName,
        itemImage,
        itemPrice,
        itemIngredients,
        itemFileImage,
        visibleInMenu,
        isVegetarian
      );
    }
    if (category === "beverage") {
      newItem = new classes.Beverage(
        itemName,
        itemImage,
        itemPrice,
        itemIngredients,
        itemFileImage,
        visibleInMenu,
        sizeOfBeverage
      );
    }
    console.log(category);
    return createItem(category, newItem).then(() => {
      navigate(navigationPath);
    });
  },
}));
export default ItemFormStore;
