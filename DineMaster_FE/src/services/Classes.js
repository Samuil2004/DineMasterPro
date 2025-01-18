class Item {
  constructor(
    itemName,
    itemImageVersion,
    itemPrice,
    ingredients,
    image,
    visibleInMenu
  ) {
    this.itemName = itemName;
    this.itemImageVersion = itemImageVersion;
    this.itemPrice = itemPrice;
    this.ingredients = ingredients;
    this.image = image;
    this.visibleInMenu = visibleInMenu;
  }
}

class Appetizer extends Item {
  constructor(
    itemName,
    itemImageVersion,
    itemPrice,
    ingredients,
    image,
    visibleInMenu,
    isVegetarian
  ) {
    super(
      itemName,
      itemImageVersion,
      itemPrice,
      ingredients,
      image,
      visibleInMenu
    );
    this.isVegetarian = isVegetarian;
  }
}

class Beverage extends Item {
  constructor(
    itemName,
    itemImageVersion,
    itemPrice,
    ingredients,
    image,
    visibleInMenu,
    size
  ) {
    super(
      itemName,
      itemImageVersion,
      itemPrice,
      ingredients,
      image,
      visibleInMenu
    );
    this.size = size;
  }
}

class Burger extends Item {
  constructor(
    itemName,
    itemImageVersion,
    itemPrice,
    ingredients,
    image,
    visibleInMenu,
    weight
  ) {
    super(
      itemName,
      itemImageVersion,
      itemPrice,
      ingredients,
      image,
      visibleInMenu
    );
    this.weight = weight;
  }
}

class Grill extends Item {
  constructor(
    itemName,
    itemImageVersion,
    itemPrice,
    ingredients,
    image,
    visibleInMenu,
    weight
  ) {
    super(
      itemName,
      itemImageVersion,
      itemPrice,
      ingredients,
      image,
      visibleInMenu
    );
    this.weight = weight;
  }
}

class Pasta extends Item {
  constructor(
    itemName,
    itemImageVersion,
    itemPrice,
    ingredients,
    image,
    visibleInMenu,
    pastaType,
    weight
  ) {
    super(
      itemName,
      itemImageVersion,
      itemPrice,
      ingredients,
      image,
      visibleInMenu
    );
    this.pastaType = pastaType;
    this.weight = weight;
  }
}

class Pizza extends Item {
  constructor(
    itemName,
    itemImageVersion,
    itemPrice,
    ingredients,
    image,
    visibleInMenu,
    sizes,
    base
  ) {
    super(
      itemName,
      itemImageVersion,
      itemPrice,
      ingredients,
      image,
      visibleInMenu
    );
    this.sizes = sizes;
    this.base = base;
  }
}

class Salad extends Item {
  constructor(
    itemName,
    itemImageVersion,
    itemPrice,
    ingredients,
    image,
    visibleInMenu,
    weight
  ) {
    super(
      itemName,
      itemImageVersion,
      itemPrice,
      ingredients,
      image,
      visibleInMenu
    );
    this.weight = weight;
  }
}

class Soup extends Item {
  constructor(
    itemName,
    itemImageVersion,
    itemPrice,
    ingredients,
    image,
    visibleInMenu,
    isVegetarian
  ) {
    super(
      itemName,
      itemImageVersion,
      itemPrice,
      ingredients,
      image,
      visibleInMenu
    );
    this.isVegetarian = isVegetarian;
  }
}

class SelectedPizza {
  constructor(
    itemOfReferenceId,
    amount,
    itemName,
    itemImageVersion,
    itemPrice,
    ingredients,
    comment,
    sizes,
    base
  ) {
    this.itemOfReferenceId = itemOfReferenceId;
    this.amount = amount;
    this.itemName = itemName;
    this.itemImageVersion = itemImageVersion;
    this.itemPrice = itemPrice;
    this.ingredients = ingredients;
    this.comment = comment;
    this.sizes = sizes;
    this.base = base;
  }
}

class SelectedItem {
  constructor(
    itemOfReferenceId,
    amount,
    itemName,
    itemImageVersion,
    itemPrice,
    ingredients,
    comment
  ) {
    this.itemOfReferenceId = itemOfReferenceId;
    this.amount = amount;
    this.itemName = itemName;
    this.itemImageVersion = itemImageVersion;
    this.itemPrice = itemPrice;
    this.ingredients = ingredients;
    this.comment = comment;
  }
}

export {
  Item,
  Appetizer,
  Beverage,
  Burger,
  Grill,
  Pasta,
  Pizza,
  Salad,
  Soup,
  SelectedPizza,
  SelectedItem,
};
