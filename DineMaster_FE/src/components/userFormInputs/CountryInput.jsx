import * as validation from "../../services/Validations";
import UserStore from "../../services/stores/UserStore";

function CountryInput({ register, errors, populateData }) {
  const {
    country,
    updateAddressIsValid,
    updateAddressInputInProgress,
    updateCountry,
  } = UserStore();

  const { ref, onChange, ...rest } = register("countryInput", {
    ...validation.requiredField(),
    ...validation.alphaPattern(),
  });

  return (
    <div className="relative w-full mt-2">
      <p className="text-xl text-left px-2">Country:</p>
      <input
        type="text"
        placeholder="Country"
        data-cy="country-input"
        ref={ref}
        {...rest}
        onChange={(e) => {
          onChange(e);
          updateAddressIsValid(false);
          updateAddressInputInProgress(true);
          updateCountry(e.target.value);
        }}
        className="w-full h-12 bg-transparent border-2 border-[rgba(110,110,110,0.9)] rounded-full px-5 pr-12 focus:outline-none placeholder-[rgba(110,110,110,0.9)] text-black text-lg"
      />
      {errors.countryInput && (
        <p className="text-red-600">{errors.countryInput.message}</p>
      )}
    </div>
  );
}

export default CountryInput;
