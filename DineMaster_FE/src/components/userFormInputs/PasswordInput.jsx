import * as validation from "../../services/Validations";

function PasswordInput({ register, errors, setPassword }) {
  return (
    <div className="relative w-full mt-2">
      <p className="text-xl text-left px-2">Password:</p>

      <input
        type="password"
        placeholder="Password"
        data-cy="password-input"
        {...register("passwordInput", {
          ...validation.requiredField(),
          validate: validation.validatePassword,
        })}
        className="w-full h-12 bg-transparent border-2 border-[rgba(110,110,110,0.9)] rounded-full px-5 pr-12 focus:outline-none placeholder-[rgba(110,110,110,0.9)] text-black text-lg"
      />
      {errors.passwordInput && (
        <p className="text-red-600" data-cy="password-input-validation">
          {errors.passwordInput.message}
        </p>
      )}
    </div>
  );
}

export default PasswordInput;
