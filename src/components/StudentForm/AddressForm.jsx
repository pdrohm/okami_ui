import React from "react";

const AddressForm = ({ register, errors }) => {
  return (
    <>
      <h2 className="text-xl font-semibold mb-4">Endereco</h2>
      <div className="mb-4 flex gap-x-5">
        <div className="w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="address"
          >
            Rua/Logradouro
          </label>
          <input
            className="student-form-input"
            type="text"
            {...register("address")}
          />
        </div>

        <div className="w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="city"
          >
            Cidade
          </label>
          <input
            className="student-form-input"
            type="text"
            {...register("city")}
          />
        </div>

        <div className="w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="cep"
          >
            CEP
          </label>
          <input
            className="student-form-input"
            type="text"
            {...register("cep")}
          />
        </div>
      </div>
      <div className="mb-4 flex gap-x-5">
        <div className="w-1/4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="state"
          >
            Estado
          </label>
          <input
            className="student-form-input"
            type="text"
            {...register("state")}
          />
          {errors.state && (
            <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>
          )}
        </div>

        <div className="w-1/2">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="country"
          >
            País
          </label>
          <input
            className="student-form-input"
            type="text"
            {...register("country")}
          />
          {errors.country && (
            <p className="text-red-500 text-xs mt-1">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AddressForm;
