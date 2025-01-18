import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import UsernameInput from "../components/userFormInputs/UsernameInput";
import LastNameInput from "../components/userFormInputs/LastNameInput";
import FirstNameInput from "../components/userFormInputs/FirstNameInput";
import PasswordInput from "../components/userFormInputs/PasswordInput";
import ConfirmPasswordInput from "../components/userFormInputs/ConfirmPasswordInput";
import { useAuthForm } from "../hooks/useAuthForm";
import { useNavigate } from "react-router-dom";
import { getAllUserRoles } from "../services/controllers/UserController";
import { toast } from "react-toastify";

function Profile() {
  const [allUserRoles, setAllUserRoles] = useState([]);

  const {
    isUserCustomer,
    handleCreateStaffMember,
    setStaffMemberRole,
    staffMemberRole,
  } = useAuthForm(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({ mode: "onChange" });
  const password = watch("passwordInput");

  const onSubmit = (data, e) => {
    handleCreateStaffMember(data);
  };

  const loadData = () => {
    getAllUserRoles()
      .then((response) => {
        setAllUserRoles(response.data.allUserRolesNames);
      })
      .catch((error) => toast.error(error.message));
  };

  useEffect(() => loadData(), []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-cover bg-center my-2">
      <div className=" w-full bg-[rgba(255,255,255,0.9)] border border-[rgba(255,255,255,0.2)] backdrop-blur-lg shadow-xl text-[rgba(110,110,110,0.9)] rounded-lg p-10">
        <div className="flex justify-end"></div>
        <h1 className="text-3xl text-center mb-2 font-semibold">Add new</h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className={`grid ${
            !isUserCustomer()
              ? "grid-cols-1"
              : "grid-cols-1 lg:grid-cols-2 lg:gap-4"
          } gap-0`}
        >
          <div className="col-span-1">
            <FirstNameInput
              register={register}
              errors={errors}
              populateData={false}
            />
            <LastNameInput
              register={register}
              errors={errors}
              populateData={false}
            />
            <UsernameInput
              register={register}
              errors={errors}
              populateData={false}
            />
            <PasswordInput register={register} errors={errors} />
            <ConfirmPasswordInput
              register={register}
              errors={errors}
              password={password}
            />
            <div className="w-full text-center">
              <p className="text-xl text-left px-2 mt-2">Role:</p>
              <select
                className="w-full h-8 text-lg px-5 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
                value={staffMemberRole || ""}
                onChange={(e) => {
                  const selectedValue = e.target.value;
                  setStaffMemberRole(selectedValue);
                }}
              >
                <option value="" disabled>
                  Select an option
                </option>
                {allUserRoles.map((role, index) => (
                  <option value={role} key={index}>
                    {role}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className={"w-full"}>
            <button
              type="submit"
              className={
                "w-full h-12 mt-2 text-white font-semibold rounded-full shadow  hover:border hover:border-white bg-green-500 hover:bg-green-400"
              }
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
