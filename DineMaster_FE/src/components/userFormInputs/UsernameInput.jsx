import * as validation from "../../services/Validations";
import UserStore from "../../services/stores/UserStore";

function UsernameInput({ register, errors, setUsername, populateData }) {
  const { email } = UserStore();

  return (
    <div className="relative w-full mt-2">
      <p className="text-xl text-left px-2">Email:</p>

      <input
        type="text"
        placeholder="Email"
        data-cy="username-input"
        {...register("usernameInput", {
          ...validation.requiredField(),
          validate: validation.validateEmail,
        })}
        className="w-full h-12 bg-transparent border-2 border-[rgba(110,110,110,0.9)] rounded-full px-5 pr-12 focus:outline-none placeholder-[rgba(110,110,110,0.9)] text-black text-lg"
      />
      {errors.usernameInput && (
        <p className="text-red-600" data-cy="username-input-error">
          {errors.usernameInput.message}
        </p>
      )}
    </div>
  );
}

export default UsernameInput;
