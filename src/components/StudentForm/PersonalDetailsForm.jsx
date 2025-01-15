import React from "react";
import { useFormContext } from "react-hook-form";
import CPFInput from "../CPFInput";

const PersonalDetailsForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Detalhes Pessoais</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 font-medium">Nome</label>
          <input
            {...register("name")}
            type="text"
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.name?.message}</p>
        </div>
        <div>
          <label className="block text-gray-600 font-medium">
            Data de Nascimento
          </label>
          <input
            {...register("birthDate")}
            type="date"
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.birthDate?.message}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 font-medium">Email</label>
          <input
            {...register("email")}
            type="email"
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.email?.message}</p>
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Telefone</label>
          <input
            {...register("phone")}
            type="text"
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.phone?.message}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 font-medium">Gênero</label>
          <select
            {...register("gender")}
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione o Gênero</option>
            <option value="Masculino">Masculino</option>
            <option value="Feminino">Feminino</option>
          </select>
          <p className="text-red-500 text-sm">{errors.gender?.message}</p>
        </div>
        <CPFInput register={register} error={errors.document} />
      </div>
    </div>
  );
};

export default PersonalDetailsForm;