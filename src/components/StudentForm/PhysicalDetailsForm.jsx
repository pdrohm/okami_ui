import React from "react";
import { useFormContext } from "react-hook-form";

const PhysicalDetailsForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Detalhes Físicos</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 font-medium">Peso (kg)</label>
          <input
            {...register("weight")}
            type="number"
            step="0.1"
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.weight?.message}</p>
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Altura (m)</label>
          <input
            {...register("height")}
            type="number"
            step="0.01"
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.height?.message}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 font-medium">ID da Faixa</label>

          <input
            {...register("beltId", {
              required: "O ID da Faixa é obrigatório",
              valueAsNumber: true,
              validate: (value) => !isNaN(value) || "Deve ser um número válido",
            })}
            type="number"
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.beltId?.message}</p>
        </div>
        <div>
          <label className="block text-gray-600 font-medium">ID do Grau</label>
          <input
            {...register("degreeId", {
              required: "O ID do Grau é obrigatório",
              valueAsNumber: true,
              validate: (value) => !isNaN(value) || "Deve ser um número válido",
            })}
            type="number"
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.degreeId?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default PhysicalDetailsForm;
