import * as validation from "../../services/Validations";

function ItemPriceInput({ register, errors }) {
  return (
    <>
      <h3 className="mb-1.5">Base price: (€)</h3>
      <input
        {...register("itemPriceInput", {
          ...validation.requiredField(),
          ...validation.minMaxValue(0.0, 1000.0),
          validate: validation.validateDecimal,
        })}
        type="number"
        className="h-10 w-16 text-base border border-black rounded-md"
        placeholder="Price"
        data-cy={`item-price-input`}
      />
      {errors.itemPriceInput && (
        <p className="text-red-600" data-cy={`item-price-validation`}>
          {errors.itemPriceInput.message}
        </p>
      )}
    </>
  );
}

export default ItemPriceInput;
