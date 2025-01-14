import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import PersonalDetailsForm from "./PersonalDetailsForm";
import AddressForm from "./AddressForm";
import EmergencyContactForm from "./EmergencyContactForm";
import PhysicalDetailsForm from "./PhysicalDetailsForm";
import PasswordForm from "./PasswordForm";

// Validation schema
const createValidationSchema = () => {
  return Yup.object().shape({
    name: Yup.string().required("Nome é obrigatório"),
    email: Yup.string().email("Email inválido").required("Email é obrigatório"),
    phone: Yup.string().required("Telefone é obrigatório"),
    weight: Yup.number().positive("Peso deve ser positivo").required("Peso é obrigatório"),
    height: Yup.number().positive("Altura deve ser positiva").required("Altura é obrigatória"),
    birthDate: Yup.date().required("Data de Nascimento é obrigatória"),
    document: Yup.string().required("CPF é obrigatório"),
    password: Yup.string()
      .required("Senha é obrigatória")
      .matches(/^\d{4,6}$/, "A senha deve conter entre 4 e 6 dígitos"),
  });
};

// Default form values
const getDefaultValues = (initialValues) => ({
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
  document: "",
  password: "",
  ...initialValues,
});

const StudentForm = ({ initialValues, onSubmit }) => {
  const methods = useForm({
    resolver: yupResolver(createValidationSchema()),
    defaultValues: getDefaultValues(initialValues),
  });

  const formTitle = initialValues ? "Editar Aluno" : "Cadastrar Aluno";
  const submitButtonText = initialValues ? "Atualizar" : "Cadastrar";

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="space-y-6 bg-white shadow-md rounded-lg p-8 md:w-2/3 w-full mx-auto"
      >
        <h1 className="text-2xl font-bold text-gray-700 text-center">
          {formTitle}
        </h1>
        <PersonalDetailsForm />
        <AddressForm />
        <EmergencyContactForm />
        <PhysicalDetailsForm />
        <PasswordForm />
        <button
          type="submit"
          className="w-full bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          {submitButtonText}
        </button>
      </form>
    </FormProvider>
  );
};

export default StudentForm;