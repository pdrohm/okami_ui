import { useFormContext } from "react-hook-form";

const PASSWORD_VALIDATION = {
  required: "Senha é obrigatória",
  pattern: {
    value: /^\d{4,6}$/,
    message: "A senha deve conter entre 4 e 6 dígitos",
  },
  minLength: {
    value: 4,
    message: "A senha deve ter no mínimo 4 dígitos",
  },
  maxLength: {
    value: 6,
    message: "A senha deve ter no máximo 6 dígitos",
  },
};

const PasswordForm = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">Criar Senha de CheckIn</h2>
      
      <div className="relative">
        <input
          type="password"
          placeholder="Digite sua senha numérica"
          {...register("password", PASSWORD_VALIDATION)}
          className="w-full md:w-1/2 border rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {errors.password && (
          <span className="text-red-500 text-sm mt-1 block">
            {errors.password.message}
          </span>
        )}
      </div>

      <p className="text-sm text-gray-600">
        Senha numérica de 4 a 6 dígitos
      </p>
    </div>
  );
};

export default PasswordForm;
