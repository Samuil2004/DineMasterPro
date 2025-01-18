import * as validation from "../../services/Validations";
import UserStore from "../../services/stores/UserStore";

function CityInput({ register, errors, populateData }) {
  const {
    city,
    updateAddressIsValid,
    updateAddressInputInProgress,
    updateCity,
  } = UserStore();

  const { ref, onChange, ...rest } = register("cityInput", {
    ...validation.requiredField(),
    ...validation.alphaPattern(),
  });

  return (
    <div className="relative w-full mt-2">
      <p className="text-xl text-left px-2">City:</p>

      <input
        type="text"
        placeholder="City"
        data-cy="city-input"
        ref={ref}
        {...rest}
        onChange={(e) => {
          onChange(e);
          updateCity(e.target.value);
          updateAddressIsValid(false);
          updateAddressInputInProgress(true);
        }}
        className="w-full h-12 bg-transparent border-2 border-[rgba(110,110,110,0.9)] rounded-full px-5 pr-12 focus:outline-none placeholder-[rgba(110,110,110,0.9)] text-black text-lg"
      />
      {errors.cityInput && (
        <p className="text-red-600">{errors.cityInput.message}</p>
      )}
    </div>
  );
}

export default CityInput;
