import * as validation from "../../services/Validations";

function PhoneNumberInput({ register, errors, populateData }) {
  return (
    <div className="relative w-full mt-2">
      <p className="text-xl text-left px-2">Phone number:</p>

      <input
        {...register("userPhoneNumber", {
          ...validation.requiredField(),
          validate: validation.validateDutchPhoneNumber,
        })}
        placeholder="+31XXXXXXXXX"
        data-cy="phone-number-input"
        className="w-full h-12 bg-transparent border-2 border-[rgba(110,110,110,0.9)] rounded-full px-5 pr-12 focus:outline-none placeholder-[rgba(110,110,110,0.9)] text-black text-lg"
      />
      {errors.userPhoneNumber && (
        <p className="text-red-600 px-2 ">{errors.userPhoneNumber.message}</p>
      )}
    </div>
  );
}

export default PhoneNumberInput;
