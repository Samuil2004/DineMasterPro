import * as validation from "../../services/Validations";

function BeverageSizeInput({ register, errors }) {
  return (
    <>
      <h3 className="mb-1.5">Size: (L)</h3>
      <div className="flex items-center">
        <img src="/icons/liquidDrop.svg" className="w-[30px] h-auto pr-2" />
        <input
          {...register("beverageSizeInput", {
            ...validation.requiredField(),
            ...validation.minMaxValue(0.0, 10.0),
            validate: validation.validateDecimal,
          })}
          type="number"
          placeholder="Size (L)"
          className="h-10 w-[90px] text-sm border border-black rounded"
        />
        {errors.beverageSizeInput && (
          <p className="text-red-600">{errors.beverageSizeInput.message}</p>
        )}
      </div>
    </>
  );
}

export default BeverageSizeInput;
