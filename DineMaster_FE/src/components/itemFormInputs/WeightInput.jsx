import * as validation from "../../services/Validations";

function WeightInput({ register, errors }) {
  return (
    <>
      <h3 className="mb-1.5">Weight: (g)</h3>
      <div className="flex items-center">
        <img src="/icons/weightIcon.svg" className="w-[30px] h-auto pr-2" />
        <input
          {...register("itemWeightInput", {
            ...validation.requiredField(),
            ...validation.minMaxValue(0.0, 1000.0),
            validate: validation.validateDecimal,
          })}
          type="number"
          placeholder="Weight (g)"
          className="h-10 w-[90px] text-sm border border-black rounded"
        />
        {errors.itemWeightInput && (
          <p className="text-red-600">{errors.itemWeightInput.message}</p>
        )}
      </div>
    </>
  );
}

export default WeightInput;
