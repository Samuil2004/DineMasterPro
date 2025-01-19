import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import PhoneNumberInput from "../components/userFormInputs//PhoneNumberInput";
import StreetInput from "../components/userFormInputs//StreetInput";
import CountryInput from "../components/userFormInputs//CountryInput";
import CityInput from "../components/userFormInputs//CityInput";
import PostalCodeInput from "../components/userFormInputs//PostalCodeInput";
import UsernameInput from "../components/userFormInputs/UsernameInput";
import LastNameInput from "../components/userFormInputs/LastNameInput";
import FirstNameInput from "../components/userFormInputs/FirstNameInput";
import PasswordInput from "../components/userFormInputs/PasswordInput";
import ConfirmPasswordInput from "../components/userFormInputs/ConfirmPasswordInput";
import { useAuthForm } from "../hooks/useAuthForm";
import { useNavigate } from "react-router-dom";
function SignUp() {
  const navigate = useNavigate();
  const {
    setFirstName,
    setLastName,
    setUsername,
    //password,
    setPassword,
    setConfirmedPassword,
    handleAuth,
  } = useAuthForm(false);

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: "onChange" });
  const password = watch("passwordInput");

  const onSubmit = (data, e) => {
    console.log(data);

    handleAuth(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center mt-2">
      <div className="w-[420px] bg-[rgba(255,255,255,0.9)] border border-[rgba(255,255,255,0.2)] backdrop-blur-lg shadow-xl text-[rgba(110,110,110,0.9)] rounded-lg p-10">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1 className="text-3xl text-center mb-6 font-semibold">Sign Up</h1>
          <FirstNameInput register={register} errors={errors} />
          <LastNameInput register={register} errors={errors} />
          <UsernameInput register={register} errors={errors} />

          <PhoneNumberInput register={register} errors={errors} />
          <CountryInput register={register} errors={errors} />
          <CityInput register={register} errors={errors} />
          <PostalCodeInput register={register} errors={errors} />
          <StreetInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} />
          <ConfirmPasswordInput
            register={register}
            errors={errors}
            password={password}
          />

          <button
            type="submit"
            className="w-full h-12 mt-2 bg-[rgba(110,110,110,0.9)] text-white font-semibold rounded-full shadow hover:bg-[rgba(186,186,186,0.9)] hover:border hover:border-white"
          >
            Sign up
          </button>
          <div className="text-sm text-center mt-6">
            {/* <p>
              Already have an account?
              <a
                href="/login"
                className="text-green-600 font-semibold hover:underline"
              >
                Login
              </a>
            </p> */}
            <p>
              <Link
                to="/login"
                className="text-green-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
