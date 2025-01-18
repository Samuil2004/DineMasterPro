import * as validation from "../../services/Validations";

function ItemIngredientsInput({ register, errors }) {
  return (
    <>
      <h3 className="mb-1.5">Ingredients:</h3>
      <input
        {...register("itemIngredientsInput", {
          ...validation.requiredField(),
          ...validation.alphaPattern(),
        })}
        type="text"
        className="h-10 w-4/5 text-base border border-black rounded-md"
        placeholder="Ingredients"
        data-cy={`item-ingredients-input`}
      />
      {errors.itemIngredientsInput && (
        <p className="text-red-600">{errors.itemIngredientsInput.message}</p>
      )}
    </>
  );
}

export default ItemIngredientsInput;
