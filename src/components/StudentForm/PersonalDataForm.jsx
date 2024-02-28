import React from "react";

const PersonalDataForm = ({ register, errors }) => {
  return (
    <>
      <div className="mb-4 flex gap-x-5">
        <div className="w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nome completo *
          </label>
          <input
            className="student-form-input"
            type="text"
            {...register("name", { required: "Nome obrigatorio" })}
          />
          {errors.name && (
            <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        <div className="w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email *
          </label>
          <input
            className="student-form-input"
            type="email"
            {...register("email", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>
      </div>

      <div className="mb-4 flex gap-x-5">
        <div className="w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="birthday"
          >
            Numero para contato
          </label>
          <input
            className="student-form-input"
            type="text"
            {...register("number", { required: "Email is required" })}
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        <div className="w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="birthday"
          >
            Data de nascimento
          </label>
          <input
            className="student-form-input"
            type="date"
            {...register("birthday", { required: "Birthday is required" })}
          />
          {errors.birthday && (
            <p className="text-red-500 text-xs mt-1">
              {errors.birthday.message}
            </p>
          )}
        </div>

        <div className="w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="gender"
          >
            Gênero
          </label>
          <select
            className="student-form-input"
            {...register("gender", { required: "Gênero obrigatório" })}
          >
            <option value="">Selecione...</option>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="O">Outro</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default PersonalDataForm;
