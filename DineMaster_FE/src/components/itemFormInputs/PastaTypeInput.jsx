import * as validation from "../../services/Validations";

function PastaTypeInput({ register, errors }) {
  return (
    <>
      <h3 className="mb-1.5">Pasta Type:</h3>
      <input
        {...register("pastaTypeInput", {
          ...validation.requiredField(),
          ...validation.maxLength(20),
          ...validation.alphaPattern(),
        })}
        type="text"
        placeholder={"Pasta type"}
        className="h-10 w-[110px] text-sm border border-black rounded"
      />
      {errors.pastaTypeInput && (
        <p className="text-red-600">{errors.pastaTypeInput.message}</p>
      )}
    </>
  );
}

export default PastaTypeInput;
