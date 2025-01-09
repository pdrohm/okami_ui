import React, { useEffect } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useClassStore } from "../../store/useClassStore";

const classSchema = yup.object().shape({
  name: yup.string().required("Título do treino é obrigatório"),
  description: yup
    .string()
    .required("Descrição é obrigatória")
    .max(500, "Descrição não pode exceder 500 caracteres"),
  startHour: yup
    .string()
    .required("Horário de início é obrigatório")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato inválido (HH:MM)"),
  endHour: yup
    .string()
    .required("Horário de término é obrigatório")
    .matches(/^([01]\d|2[0-3]):([0-5]\d)$/, "Formato inválido (HH:MM)")
    .test(
      "is-after-start",
      "O horário de término deve ser após o início",
      function (value) {
        const { startHour } = this.parent;
        return startHour && value > startHour;
      }
    ),
  modalityId: yup.number().required("Modalidade é obrigatória"),
});

const ClassForm = ({ classData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(classSchema),
    defaultValues: {
      name: "",
      description: "",
      startHour: "",
      endHour: "",
      modalityId: "",
    },
  });

  const navigate = useNavigate();
  const { getClasses, createClass, editClass, modalities } = useClassStore();

  useEffect(() => {
    getClasses();
  }, []);

  useEffect(() => {
    if (classData) {
      Object.keys(classData).forEach((key) => {
        setValue(key, classData[key]);
      });
    }
  }, [classData, setValue]);

  const handleModalityChange = (selectedOption) => {
    setValue("modalityId", selectedOption?.value || null);
  };

  const onSubmit = async (data) => {
    try {
      const currentDate = new Date().toISOString().split("T")[0];
      const startHour = `${currentDate}T${data.startHour}:00.000Z`;
      const endHour = `${currentDate}T${data.endHour}:00.000Z`;
  
      const payload = { ...data, startHour, endHour };
  
      if (classData) {
        await editClass(classData.id, payload);
      } else {
        await createClass(payload);
      }
  
      reset(); 
      navigate("/treino");
    } catch (error) {
      console.error("Erro ao salvar treino:", error);
    }
  };

  return (
    <div className="max-w-4xl mt-8 p-6 bg-whiter shadow-md rounded-md w-full flex-col flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
        <h2 className="text-xl font-semibold mb-4 mt-10">Novo treino</h2>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Título do treino
          </label>
          <input
            className="student-form-input"
            type="text"
            {...register("name")}
          />
          <p className="text-red-500 text-xs mt-1">{errors.name?.message}</p>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Descrição
          </label>
          <textarea
            className="student-form-input"
            {...register("description")}
          ></textarea>
          <p className="text-red-500 text-xs mt-1">
            {errors.description?.message}
          </p>
        </div>

        <div className="mb-4 flex gap-x-5">
          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Horário de início
            </label>
            <input
              className="student-form-input"
              type="time"
              {...register("startHour")}
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.startHour?.message}
            </p>
          </div>

          <div className="w-1/2">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Horário de término
            </label>
            <input
              className="student-form-input"
              type="time"
              {...register("endHour")}
            />
            <p className="text-red-500 text-xs mt-1">
              {errors.endHour?.message}
            </p>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Modalidade
          </label>
          <Select
            options={modalities.map((modality) => ({
              value: modality.id,
              label: modality.name,
            }))}
            onChange={handleModalityChange}
            className="w-full mt-1"
            placeholder="Selecione uma modalidade"
            isSearchable
          />
          <input
            {...register("modalityId")}
            type="hidden"
          />
          <p className="text-red-500 text-xs mt-1">
            {errors.modalityId?.message}
          </p>
        </div>

        <div className="flex w-full justify-end">
          <button className="form-button" type="submit">
            Finalizar cadastro
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClassForm;