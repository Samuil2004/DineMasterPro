import * as validation from "../../services/Validations";

function PizzaBaseInput({ register, errors }) {
  return (
    <>
      <h3 className="mb-1.5">Base:</h3>
      <input
        {...register("pizzaBaseInput", {
          ...validation.requiredField(),
          ...validation.maxLength(20),
          ...validation.alphaPattern(),
        })}
        type="text"
        placeholder="Base"
        className="h-10 w-1/5 text-sm border border-black rounded"
      ></input>
      {errors.pizzaBaseInput && (
        <p className="text-red-600">{errors.pizzaBaseInput.message}</p>
      )}
    </>
  );
}

export default PizzaBaseInput;
