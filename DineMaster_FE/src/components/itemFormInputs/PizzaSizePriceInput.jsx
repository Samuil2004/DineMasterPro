import * as validation from "../../services/Validations";

function PizaSizePriceInput({
  indexWithinTheArray,
  register,
  pizzaSize,
  errors,
  updatePizzaSize,
  removePizzaSize,
}) {
  return (
    <div className="flex flex-col">
      <div className="flex">
        <input
          {...register(`pizzaSizes[${indexWithinTheArray}].additionalPrice`, {
            ...validation.requiredField(),
            ...validation.minMaxValue(0.0, 1000.0),
            validate: validation.validateDecimal,
          })}
          type="number"
          value={pizzaSize.additionalPrice}
          placeholder="Additional price (€)"
          onChange={(e) =>
            updatePizzaSize(
              indexWithinTheArray,
              "additionalPrice",
              e.target.value
            )
          }
          className="h-10 mr-2 text-md border border-1 border-black rounded-md max-w-[170px]"
        />
        {indexWithinTheArray + 1 != 1 ? (
          <button
            type="button"
            onClick={() => {
              removePizzaSize(indexWithinTheArray);
            }}
            className="h-5 bg-transparent border-none"
          >
            <img src="/icons/cross.svg" className="h-full" />
          </button>
        ) : (
          <></>
        )}
      </div>
      {errors.pizzaSizes &&
        errors.pizzaSizes[indexWithinTheArray] &&
        errors.pizzaSizes[indexWithinTheArray].additionalPrice && (
          <p className="text-red-600">
            {errors.pizzaSizes[indexWithinTheArray].additionalPrice.message}
          </p>
        )}
    </div>
  );
}

export default PizaSizePriceInput;
