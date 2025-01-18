import * as validation from "../../services/Validations";

function PizzaSizeInput({
  indexWithinTheArray,
  register,
  pizzaSize,
  errors,
  updatePizzaSize,
}) {
  return (
    <div className="flex flex-col mr-4">
      <input
        {...register(`pizzaSizes[${indexWithinTheArray}].size`, {
          ...validation.requiredField(),
          ...validation.maxLength(20),
          ...validation.alphaPattern(),
        })}
        type="text"
        value={pizzaSize.size}
        placeholder={`Size ${indexWithinTheArray + 1}`}
        onChange={(e) => {
          updatePizzaSize(indexWithinTheArray, "size", e.target.value);
        }}
        className="h-10 mr-2 text-md border border-1 border-black rounded-md max-w-[170px]"
      />
      {errors.pizzaSizes &&
        errors.pizzaSizes[indexWithinTheArray] &&
        errors.pizzaSizes[indexWithinTheArray].size && (
          <p className="text-red-600 max-w-[170px]">
            {errors.pizzaSizes[indexWithinTheArray].size.message}
          </p>
        )}
    </div>
  );
}

export default PizzaSizeInput;
