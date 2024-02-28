import React from "react";

const EmergencyContactForm = ({ register, errors }) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4 mt-10">
        Contato de emergencia
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
            Numero do contato
          </label>
          <input
            className="student-form-input"
            type="text"
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
            Relacao
          </label>
          <select className="student-form-input" {...register("relation")}>
            <option value="">Selecione...</option>
            <option value="parent">Pai/Mae</option>
            <option value="family_member">Familiar</option>
            <option value="friend">Amigo</option>
            <option value="other">Outro</option>
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
