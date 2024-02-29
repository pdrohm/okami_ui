import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PersonalDataForm from "./PersonalDataForm";
import AddressForm from "./AddressForm";
import EmergencyContactForm from "./EmergencyContactForm";
import PictureForm from "./PictureForm";

const StudentForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [imageFile, setImageFile] = useState(null);

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="max-w-4xl  mt-8 p-6 bg-whiter shadow-md rounded-md w-full flex-col flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
        <PersonalDataForm register={register} errors={errors} />
        <AddressForm register={register} errors={errors} />
        <EmergencyContactForm register={register} errors={errors} />
        <PictureForm setImageFile={setImageFile} />

        <div className="flex w-full justify-end">
          <button
            className="bg-orange px-4 py-2 rounded-3xl hover:bg-orange/80 hover:scale-105"
            type="submit"
          >
            Finalizar cadastro
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
