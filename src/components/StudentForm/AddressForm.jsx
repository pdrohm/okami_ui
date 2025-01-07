import React, { useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import cepService from "../../services/cepService";

const AddressForm = () => {
  const { register, setValue, formState: { errors } } = useFormContext();
  const [cepError, setCepError] = useState("");
  const [cepValue, setCepValue] = useState("");

  const debounce = (func, delay) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func(...args), delay);
    };
  };

  const fetchAddress = async (cep) => {
    if (cep.length === 8) {
      try {
        setCepError("");
        const address = await cepService.fetchAddressByCep(cep);
        setValue("address", address.logradouro || "");
        setValue("city", address.localidade || "");
        setValue("state", address.uf || "");
        setValue("postalCode", cep);
      } catch (error) {
        setCepError("CEP inválido ou não encontrado");
      }
    }
  };

  const handleCepChange = (event) => {
    const cep = event.target.value.replace(/\D/g, ""); // Only allow numbers
    setCepValue(cep);
    if (cep.length === 8) {
      debouncedFetchAddress(cep);
    }
  };

  const debouncedFetchAddress = useCallback(
    debounce((cep) => {
      fetchAddress(cep);
    }, 500),
    []
  );

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Endereço</h2>
      <div>
        <label className="block text-gray-600 font-medium">CEP</label>
        <input
          {...register("postalCode")}
          type="text"
          value={cepValue}
          onChange={handleCepChange}
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {cepError && <p className="text-red-500 text-sm">{cepError}</p>}
        <p className="text-red-500 text-sm">{errors.postalCode?.message}</p>
      </div>
      <div>
        <label className="block text-gray-600 font-medium">Endereço</label>
        <input
          {...register("address")}
          type="text"
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.address?.message}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-600 font-medium">Cidade</label>
          <input
            {...register("city")}
            type="text"
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.city?.message}</p>
        </div>
        <div>
          <label className="block text-gray-600 font-medium">Estado</label>
          <input
            {...register("state")}
            type="text"
            className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-red-500 text-sm">{errors.state?.message}</p>
        </div>
      </div>
      <div>
        <label className="block text-gray-600 font-medium">País</label>
        <input
          {...register("country")}
          type="text"
          className="w-full border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <p className="text-red-500 text-sm">{errors.country?.message}</p>
      </div>
    </div>
  );
};

export default AddressForm;