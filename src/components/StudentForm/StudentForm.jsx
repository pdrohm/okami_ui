import React from "react";
import { useForm } from "react-hook-form";
import PersonalDataForm from "./PersonalDataForm";
import AddressForm from "./AddressForm";

const StudentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-4xl  mt-8 p-6 bg-whiter shadow-md rounded-md w-full flex-col flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
        <PersonalDataForm register={register} errors={errors} />
        <AddressForm register={register} errors={errors} />

        <button
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors duration-300"
          type="submit"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default StudentForm;
