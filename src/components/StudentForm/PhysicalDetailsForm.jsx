import React, { useEffect } from "react";
import Select from "react-select";
import { useFormContext } from "react-hook-form";
import { useBeltStore } from "../../store/useBeltStore";

const PhysicalDetailsForm = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const { getBelts, getDegrees, degrees, adultBelts, kidsBelts } = useBeltStore();

  useEffect(() => {
    getBelts();
    getDegrees();
  }, []);

  const beltGroupedOptions = [
    {
      label: "Adulto",
      options: adultBelts
        .sort((a, b) => a.description.localeCompare(b.description))
        .map((belt) => ({
          value: belt.id,
          label: belt.description,
        })),
    },
    {
      label: "Infantil",
      options: kidsBelts
        .sort((a, b) => a.description.localeCompare(b.description))
        .map((belt) => ({
          value: belt.id,
          label: belt.description,
        })),
    },
  ];

  const degreeOptions = degrees
    .sort((a, b) => a.description.localeCompare(b.description))
    .map((degree) => ({
      value: degree.id,
      label: degree.description,
    }));

  const handleBeltChange = (selectedOption) => {
    setValue("beltId", selectedOption?.value);
  };

  const handleDegreeChange = (selectedOption) => {
    setValue("degreeId", selectedOption?.value);
  };

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
          <label className="block text-gray-600 font-medium">Faixa</label>
          <Select
            options={beltGroupedOptions}
            onChange={handleBeltChange}
            className="w-full mt-1"
            placeholder="Selecione uma faixa"
            isSearchable
          />
          <input
            {...register("beltId", { required: "O ID da Faixa é obrigatório" })}
            type="hidden"
          />
          <p className="text-red-500 text-sm">{errors.beltId?.message}</p>
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Grau</label>
          <Select
            options={degreeOptions}
            onChange={handleDegreeChange}
            className="w-full mt-1"
            placeholder="Selecione um grau"
            isSearchable
          />
          <input
            {...register("degreeId", {
              required: "O ID do Grau é obrigatório",
              valueAsNumber: true,
              validate: (value) => !isNaN(value) || "Deve ser um número válido",
            })}
            type="hidden"
          />
          <p className="text-red-500 text-sm">{errors.degreeId?.message}</p>
        </div>
      </div>
    </div>
  );
};

export default PhysicalDetailsForm;