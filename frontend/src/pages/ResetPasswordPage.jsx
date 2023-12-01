import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [token, setToken] = useState();
  const { restorePassword } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
    console.log({ token, password: data.password })
      await restorePassword({ token, password: data.password });
      alert("Contraseña modificada con exito")
    } catch (error) {
      console.log(error);
    }
  });

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");
    console.log(token);
    if (!token) {
      navigate("/login");
      return;
    }
    setToken(token);
  }, [location.search, navigate]);

  return (
    <div className="min-h-screen w-full flex justify-center items-center flex-col gap-6">
      <div className=" pb-6 px-6 flex flex-col gap-4 rounded-lg justify-center shadow items-center w-full bg-neutral p-12 md:w-3/5">
        <h1 className="text-fontcolor text-2xl font-bold text-center">
          Recuperar contraseña
        </h1>
        <form onSubmit={onSubmit} className="w-3/4 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-fontcolor" htmlFor="password">
              Contraseña
            </label>
            <input
              {...register("password", {
                required: {
                  value: true,
                  message: "Contraseña requerida",
                },
                pattern: {
                  value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                  message:
                    "La contraseña debe contener al menos un número, una letra mayúscula, una letra minúscula y tener al menos 8 caracteres",
                },
              })}
              id="password"
              type="password"
              className="px-3 py-2 border-2  border-neutral rounded-md focus:outline-none focus:ring focus:border-accent text-fontcolor"
              placeholder="Ingrese su nueva contraseña"
            />
            {errors.password && (
              <span className="text-fontcolor">{errors.password.message}</span>
            )}
          </div>
          <button className="bg-accent p-2 rounded-md hover:bg-darkerAccent text-white">
            Aplicar
          </button>
          <div></div>
          <div></div>
        </form>
      </div>
      <span className="underline">
        <a href="/">Volver al inicio</a>
      </span>
    </div>
  );
};

export default ResetPasswordPage;
