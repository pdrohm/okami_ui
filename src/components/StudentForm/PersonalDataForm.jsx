import React, { useState } from "react";
import { adultBelts, kidsBelts } from "../../utils/belts";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Controller } from "react-hook-form";
import ptBR from "date-fns/locale/pt-BR";

const DateInput = ({ value, onChange }) => (
  <DatePicker
    className="student-form-input"
    selected={value}
    onChange={onChange}
    dateFormat="dd/MM/yyyy"
    placeholderText="dd/mm/yyyy"
  />
);

const PersonalDataForm = ({ register, errors, control }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  console.log(`selectedDate`, selectedDate);

  return (
    <div className="mb-10">
      <h2 className="text-xl font-semibold mb-4">Dados Pessoais</h2>
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
            htmlFor="number"
          >
            Numero para contato
          </label>
          <input
            className="student-form-input"
            type="text"
            {...register("number", { required: "Numero is required" })}
          />
          {errors.number && (
            <p className="text-red-500 text-xs mt-1">{errors.number.message}</p>
          )}
        </div>

        <div className="w-full">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="birthday"
          >
            Data de nascimento
          </label>
          <Controller
            control={control}
            name="birthday"
            rules={{ required: "Data de nascimento é obrigatória" }}
            render={({ field }) => (
              <DatePicker
                className="student-form-input"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
                dateFormat="dd/MM/yyyy"
                placeholderText="dd/mm/yyyy"
                showYearDropdown
                showMonthDropdown
                locale={ptBR}
              />
            )}
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
      <div className="mb-4 flex gap-x-5">
        <div className="w-1/4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="legal_guardian"
          >
            Peso
          </label>
          <input
            className="student-form-input"
            type="number"
            {...register("weight")}
          />
        </div>

        <div className="w-1/4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="belt"
          >
            Faixa
          </label>
          <select className="student-form-input" {...register("belt")}>
            <option value="">Selecione...</option>
            <optgroup label="Adulto">
              {adultBelts.map((adultBelt) => (
                <option key={adultBelt.value} value={adultBelt.value}>
                  {adultBelt.description}
                </option>
              ))}
            </optgroup>
            <optgroup label="Infantil">
              {kidsBelts.map((kidBelt) => (
                <option key={kidBelt.value} value={kidBelt.value}>
                  {kidBelt.description}
                </option>
              ))}
            </optgroup>
          </select>

          {errors.weight && (
            <p className="text-red-500 text-xs mt-1">{errors.weight.message}</p>
          )}
        </div>
        <div className="w-1/4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="degree"
          >
            Graus
          </label>
          <select className="student-form-input" {...register("degree")}>
            <option value="">Selecione...</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
        </div>
      </div>
      <div className="mb-4 flex gap-x-5">
        <div className="w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="legal_guardian"
          >
            Responsavel
          </label>
          <input
            className="student-form-input"
            type="text"
            {...register("legal_guardian")}
          />
          {errors.legal_guardian && (
            <p className="text-red-500 text-xs mt-1">
              {errors.legal_guardian.message}
            </p>
          )}
        </div>
        <div className="w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="legal_guardian_number"
          >
            Numero para contato do responsavel
          </label>
          <input
            className="student-form-input"
            type="text"
            {...register("legal_guardian")}
          />
          {errors.legal_guardian && (
            <p className="text-red-500 text-xs mt-1">
              {errors.legal_guardian.message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalDataForm;
