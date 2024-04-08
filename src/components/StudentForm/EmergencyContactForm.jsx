import React from "react";
import { relationEmergencyContact } from "../../utils/relationEmergencyContact";
import InputMask from "react-input-mask";

const EmergencyContactForm = ({ register, errors }) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4 mt-10">
        Contato de emergência
      </h2>
      <div className="mb-4 flex gap-x-5">
        <div className="w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="emergencyContact"
          >
            Nome do contato
          </label>
          <input
            className="student-form-input"
            type="text"
            {...register("emergency_contact")}
          />
          {errors.emergency_contact && (
            <p className="text-red-500 text-xs mt-1">
              {errors.emergency_contact.message}
            </p>
          )}
        </div>

        <div className="w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="emergencyContactNumber"
          >
            Número do contato
          </label>
          <InputMask
            className="student-form-input"
            mask="(99) 99999-9999"
            placeholder="(48) 0000-0000"
            type="tel"
            {...register("emergency_contact_number")}
          />
          {errors.emergency_contact_number && (
            <p className="text-red-500 text-xs mt-1">
              {errors.emergency_contact_number.message}
            </p>
          )}
        </div>

        <div className="w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="relation"
          >
            Relação
          </label>
          <select className="student-form-input" {...register("relation")}>
            <option value="">Selecione...</option>

            {relationEmergencyContact.map((relation) => (
              <option key={relation.value} value={relation.value}>
                {relation.description}
              </option>
            ))}
          </select>
          {errors.gender && (
            <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>
          )}
        </div>
      </div>
    </>
  );
};

export default EmergencyContactForm;
