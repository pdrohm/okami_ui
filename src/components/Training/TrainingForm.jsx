import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import TrainingContext from "../../context/TrainingContext";
import { useNavigate } from "react-router-dom";
import trainingService from '../../services/trainingService';

const TrainingForm = ({ trainingData }) => {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const { fetchTrainings } = useContext(TrainingContext);


  const onSubmit = async (data) => {
    if (trainingData) {
      await trainingService.updateTraining(trainingData.id, data);
    } else {
      await trainingService.createTraining(data);
    }
    afterSubmit();
  };

  const afterSubmit = () => {
    console.log("passiy after")
    fetchTrainings();
    reset();
    navigate("/treino");
  };

  return (
    <div className="max-w-4xl  mt-8 p-6 bg-whiter shadow-md rounded-md w-full flex-col flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full h-full">
        <h2 className="text-xl font-semibold mb-4 mt-10">Novo treino</h2>
        <div className="mb-4 flex gap-x-5">
          <div className="w-1/2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="emergencyContact"
            >
              Título do treino
            </label>
            <input
              className="student-form-input"
              type="text"
              {...register("training_name")}
            />
            {errors.training_name && (
              <p className="text-red-500 text-xs mt-1">
                {errors.training_name.message}
              </p>
            )}
          </div>

          <div className="w-1/2">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="emergencyContactNumber"
            >
              Modalidade
            </label>
            <select className="student-form-input" {...register("relation")}>
              <option value="jiujitsu">Jiu Jitsu</option>
              <option value="yoga">Yoga</option>
              <option value="muaythai">Muay Thai</option>
              <option value="outro">Outro</option>
            </select>
            {errors.modality && (
              <p className="text-red-500 text-xs mt-1">
                {errors.modality.message}
              </p>
            )}
          </div>
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

export default TrainingForm;
