import * as validation from "../../services/Validations";
import UserStore from "../../services/stores/UserStore";

function StreetInput({ register, errors, populateData }) {
  const {
    street,
    updateAddressIsValid,
    updateAddressInputInProgress,
    updateStreet,
  } = UserStore();

  const { ref, onChange, ...rest } = register("streetInput", {
    ...validation.requiredField(),
  });

  return (
    <div className="relative w-full mt-2">
      <p className="text-xl text-left px-2">Street:</p>

      <input
        type="text"
        placeholder="Street"
        data-cy="street-input"
        ref={ref}
        {...rest}
        onChange={(e) => {
          onChange(e);
          updateStreet(e.target.value);
          updateAddressIsValid(false);
          updateAddressInputInProgress(true);
        }}
        className="w-full h-12 bg-transparent border-2 border-[rgba(110,110,110,0.9)] rounded-full px-5 pr-12 focus:outline-none placeholder-[rgba(110,110,110,0.9)] text-black text-lg"
      />
      {errors.streetInput && (
        <p className="text-red-600">{errors.streetInput.message}</p>
      )}
    </div>
  );
}

export default StreetInput;
