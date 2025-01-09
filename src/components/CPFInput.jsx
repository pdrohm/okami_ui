import React from "react";
import { validateCPF } from "../utils/string";

const CPFInput = ({ register, error }) => {
  const handleCPFChange = (e) => {
    let value = e.target.value.replace(/\D/g, "");

    if (value.length > 11) value = value.slice(0, 11);

    e.target.value = value
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  };

  return (
    <div>
      <label className="block text-gray-600 font-medium">CPF</label>
      <input
        type="text"
        className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        onInput={handleCPFChange}
        {...register("document", {
          validate: (value) =>
            validateCPF(value.replace(/\D/g, "")) || "Insira um CPF válido",
        })}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default CPFInput;