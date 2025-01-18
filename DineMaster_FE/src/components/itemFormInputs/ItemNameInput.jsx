import * as validation from "../../services/Validations";

function ItemNameInput({ register, errors }) {
  return (
    <>
      <h3 className="mb-1.5">Item name:</h3>
      <input
        {...register("itemNameInput", {
          ...validation.requiredField(),
          ...validation.maxLength(30),
          ...validation.alphaPattern(),
        })}
        type="text"
        className="h-10 w-3/4 text-lg text-[#58a4b0] border border-black rounded-md"
        placeholder="Item name"
        data-cy={`item-name-input`}
      />
      {errors.itemNameInput && (
        <p className="text-red-600" data-cy={`item-name-input-validation`}>
          {errors.itemNameInput.message}
        </p>
      )}
    </>
  );
}

export default ItemNameInput;
