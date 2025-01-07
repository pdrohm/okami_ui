import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import PersonalDetailsForm from "./PersonalDetailsForm";
import AddressForm from "./AddressForm";
import EmergencyContactForm from "./EmergencyContactForm";
import PhysicalDetailsForm from "./PhysicalDetailsForm";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório"),
  email: Yup.string().email("Email inválido").required("Email é obrigatório"),
  phone: Yup.string().required("Telefone é obrigatório"),
  weight: Yup.number().positive("Peso deve ser positivo").required("Peso é obrigatório"),
  height: Yup.number().positive("Altura deve ser positiva").required("Altura é obrigatória"),
  birthDate: Yup.date().required("Data de Nascimento é obrigatória"),
});

const StudentForm = ({ initialValues, onSubmit }) => {
  const methods = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: initialValues || {
      name: "",
      birthDate: "",
      email: "",
      phone: "",
      gender: "",
      legalGuardian: "",
      emergencyContact: "",
      emergencyPhone: "",
      relationship: "",
      observation: "",
      address: "",
      postalCode: "",
      city: "",
      state: "",
      country: "",
      weight: "",
      height: "",
      beltId: "",
      degreeId: "",
    },
  });

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-6 bg-white shadow-md rounded-lg p-8 max-w-4xl mx-auto"
      >
        <h1 className="text-2xl font-bold text-gray-700 text-center">
          {initialValues ? "Editar Aluno" : "Cadastrar Aluno"}
        </h1>
        <PersonalDetailsForm />
        <AddressForm />
        <EmergencyContactForm />
        <PhysicalDetailsForm />
        <button
          type="submit"
          className="w-full bg-black hover:bg-blue-600 text-white ont-bold py-2 px-4 rounded-lg transition"
        >
          {initialValues ? "Atualizar" : "Cadastrar"}
        </button>
      </form>
    </FormProvider>
  );
};

export default StudentForm;