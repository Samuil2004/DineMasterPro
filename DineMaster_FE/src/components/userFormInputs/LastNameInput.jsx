import * as validation from "../../services/Validations";

function LastNameInput({ register, errors, setLastName, populateData }) {
  return (
    <div className="relative w-full mt-2">
      <p className="text-xl text-left px-2">Last name:</p>

      <input
        type="text"
        placeholder="Last Name"
        data-cy="last-name-input"
        {...register("lastNameInput", {
          ...validation.requiredField(),
          ...validation.alphaPattern(),
        })}
        className="w-full h-12 bg-transparent border-2 border-[rgba(110,110,110,0.9)] rounded-full px-5 pr-12 focus:outline-none placeholder-[rgba(110,110,110,0.9) text-black text-lg"
      />
      {errors.lastNameInput && (
        <p className="text-red-600">{errors.lastNameInput.message}</p>
      )}
    </div>
  );
}

export default LastNameInput;
