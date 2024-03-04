import React from "react";
import { useForm } from "react-hook-form";
import authService from "../../services/authService";
import { toast } from "react-toastify";

const UserRegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    await authService.createUser(data);

    afterSubmit();
  };

  const afterSubmit = () => {
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="px-5 py-10 flex flex-col gap-y-4"
    >
      <div>
        <div>
          <label>Nome Completo</label>
          <input
            {...register("name", { required: true })}
            className="student-form-input"
          />
          {errors.name && <span>Name is required</span>}
        </div>
      </div>
      <div className="flex gap-x-4">
        <div>
          <label>Usuario</label>
          <input
            {...register("username", { required: true })}
            className="student-form-input"
          />
          {errors.username && <span>Username is required</span>}
        </div>
        <div>
          <label>Senha</label>
          <input
            type="password"
            {...register("password", { required: true })}
            className="student-form-input"
          />
          {errors.password && <span>Password is required</span>}
        </div>
      </div>
      <div>
        <label>Email</label>
        <input
          type="email"
          {...register("email", { required: true })}
          className="student-form-input"
        />
        {errors.email && <span>Email is required</span>}
      </div>

      <button type="submit" className="form-button">
        Submit
      </button>
    </form>
  );
};

export default UserRegisterForm;
