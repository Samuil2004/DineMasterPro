import * as validation from "../../services/Validations";
import UserStore from "../../services/stores/UserStore";

function PostalCodeInput({ register, errors, populateData }) {
  const {
    postalCode,
    updateAddressIsValid,
    updateAddressInputInProgress,
    updatePostalCode,
  } = UserStore();

  const { ref, onChange, ...rest } = register("postalCodeInput", {
    ...validation.requiredField(),
    validate: validation.validateDutchPostalCode,
  });

  return (
    <div className="relative w-full mt-2">
      <p className="text-xl text-left px-2">Postal code:</p>

      <input
        placeholder="Postal code"
        data-cy="postal-code-input"
        ref={ref}
        {...rest}
        onChange={(e) => {
          onChange(e);
          updatePostalCode(e.target.value.replace(/\s+/g, ""));
          updateAddressIsValid(false);
          updateAddressInputInProgress(true);
        }}
        className="w-full h-12 bg-transparent border-2 border-[rgba(110,110,110,0.9)] rounded-full px-5 pr-12 focus:outline-none placeholder-[rgba(110,110,110,0.9)] text-black text-lg"
      />
      {errors.postalCodeInput && (
        <p className="text-red-600">{errors.postalCodeInput.message}</p>
      )}
    </div>
  );
}

export default PostalCodeInput;
