import React from "react";
import { useFormContext } from "react-hook-form";
import { relationshipEmergencyContact } from "../../utils/relationshipEmergencyContact";

const EmergencyContactForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">
        Contato de Emergência
      </h2>
      <div>
        <label className="block text-gray-600 font-medium">
          Responsável Legal
        </label>
        <input
          {...register("legalGuardian")}
          type="text"
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.legalGuardian?.message}</p>
      </div>
      <div>
        <label className="block text-gray-600 font-medium">
          Contato de Emergência
        </label>
        <input
          {...register("emergencyContact")}
          type="text"
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">
          {errors.emergencyContact?.message}
        </p>
      </div>
      <div>
        <label className="block text-gray-600 font-medium">
          Telefone de Emergência
        </label>
        <input
          {...register("emergencyPhone")}
          type="text"
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.emergencyPhone?.message}</p>
      </div>
      <div>
        <label className="block text-gray-600 font-medium">
          Relacionamento
        </label>
        <select className="student-form-input" {...register("relationship")}>
          <option value="">Selecione...</option>

          {relationshipEmergencyContact.map((relationship) => (
            <option key={relationship.value} value={relationship.value}>
              {relationship.description}
            </option>
          ))}
        </select>
        <p className="text-red-500 text-sm">{errors.relationship?.message}</p>
      </div>
      <div>
        <label className="block text-gray-600 font-medium">Observações</label>
        <textarea
          {...register("observation")}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.observation?.message}</p>
      </div>
    </div>
  );
};

export default EmergencyContactForm;
