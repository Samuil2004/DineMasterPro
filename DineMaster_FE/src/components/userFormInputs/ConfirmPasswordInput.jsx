import * as validation from "../../services/Validations";

function ConfirmPasswordInput({
  register,
  errors,
  setConfirmedPassword,
  password,
}) {
  return (
    <div className="relative w-full mt-2">
      <p className="text-xl text-left px-2">Confirm Password:</p>

      <input
        {...register("confirmPasswordInput", {
          ...validation.requiredField(),
          validate: {
            validatePassword: validation.validatePassword,
            validate: (value) => value === password || "Passwords must match",
          },
        })}
        type="password"
        placeholder="Confirm Password"
        data-cy="confirm-password-input"
        className="w-full h-12 bg-transparent border-2 border-[rgba(110,110,110,0.9)] rounded-full px-5 pr-12 focus:outline-none placeholder-[rgba(110,110,110,0.9)] text-black text-lg"
      />
      {errors.confirmPasswordInput && (
        <p
          className="text-red-600"
          data-cy="password-confirmation-input-validation"
        >
          {errors.confirmPasswordInput.message}
        </p>
      )}
    </div>
  );
}

export default ConfirmPasswordInput;
