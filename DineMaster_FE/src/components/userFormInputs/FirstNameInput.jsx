import * as validation from "../../services/Validations";

function FirstNameInput({ register, errors, setFirstName, populateData }) {
  return (
    <div className="relative w-full mt-2">
      <p className="text-xl text-left px-2">First name:</p>

      <input
        type="text"
        placeholder="First Name"
        data-cy="first-name-input"
        {...register("firstNameInput", {
          ...validation.requiredField(),
          ...validation.alphaPattern(),
        })}
        className="w-full h-12 bg-transparent border-2 border-[rgba(110,110,110,0.9)] rounded-full  px-5 pr-12 focus:outline-none placeholder-[rgba(110,110,110,0.9)] text-black text-lg"
      />
      {errors.firstNameInput && (
        <p className="text-red-600">{errors.firstNameInput.message}</p>
      )}
    </div>
  );
}

export default FirstNameInput;
