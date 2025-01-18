import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import UsernameInput from "../components/userFormInputs/UsernameInput";
import { Link } from "react-router-dom";
import { handleForgottenPassword } from "../services/controllers/publicApis/publicController";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function ForgottenPassword() {
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
    handleForgottenPassword(data.usernameInput)
      .then((response) => {
        toast.success("New password was send on the provided email.");
        navigate("/login");
      })
      .catch((error) => toast.error(error.message));
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center">
      <div className="w-[420px] bg-[rgba(255,255,255,0.9)] border border-[rgba(255,255,255,0.2)] backdrop-blur-lg shadow-xl text-[rgba(110,110,110,0.9)] rounded-lg p-10">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1 className="text-3xl text-center mb-6 font-semibold">
            Reset Password
          </h1>
          <UsernameInput register={register} errors={errors} />
          <div className="flex text-sm mb-4">
            <p>*Email with new password will be send</p>
          </div>
          <button
            type="submit"
            data-cy="login-button"
            className="w-full h-12 bg-[rgba(110,110,110,0.9)] text-white font-semibold rounded-full shadow hover:bg-[rgba(186,186,186,0.9)] hover:border hover:border-white"
          >
            Reset
          </button>
          <div className="text-sm text-center mt-6">
            <p>
              I know my password
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

export default ForgottenPassword;
