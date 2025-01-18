import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import UsernameInput from "../components/userFormInputs/UsernameInput";
import PasswordInput from "../components/userFormInputs/PasswordInput";
import { useAuthForm } from "../hooks/useAuthForm";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Login() {
  const { setUsername, setPassword, handleAuth } = useAuthForm(true);
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data, e) => {
    handleAuth(data);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center">
      <div className="w-[420px] bg-[rgba(255,255,255,0.9)] border border-[rgba(255,255,255,0.2)] backdrop-blur-lg shadow-xl text-[rgba(110,110,110,0.9)] rounded-lg p-10">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1 className="text-3xl text-center mb-6 font-semibold">Login</h1>
          <UsernameInput register={register} errors={errors} />
          <PasswordInput register={register} errors={errors} />
          <div className="flex justify-end text-sm mb-4">
            <a
              href="/forgottenPassword"
              className="text-[rgba(110,110,110,0.9)] hover:underline px-4 pt-2"
            >
              Forgot Password?
            </a>
          </div>
          <button
            type="submit"
            data-cy="login-button"
            className="w-full h-12 bg-[rgba(110,110,110,0.9)] text-white font-semibold rounded-full shadow hover:bg-[rgba(186,186,186,0.9)] hover:border hover:border-white"
          >
            Login
          </button>
          <div className="text-sm text-center mt-6">
            <p>
              Don’t have an account?
              <Link
                to="/signUp"
                className="text-green-600 font-semibold hover:underline"
              >
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
