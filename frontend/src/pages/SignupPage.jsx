import { useForm } from "react-hook-form";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { PiWarningOctagonFill } from "react-icons/pi";

function SignupPage() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [invalidMail, setInvalidMail] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      const res = await signUp(data);
      if (res.code === 1) {
        setInvalidMail(true);
      } else {
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <>
      <form onSubmit={onSubmit} className="flex justify-center text-neutral">
        <div className="bg-accent shadow-xl pt-6 pb-6 pl-10 pr-10 flex flex-col gap-3 w-11/12 md:w-[1200px]">
          <h1 className="text-2xl tracking-wide textce">
            Regístrate como proveedor
          </h1>
          <hr className="bg-primary h-0.5 border-none" />
          {invalidMail && (
            <div className="grid grid-cols-4 justify-center items-center p-3 rounded-md gap-3 bg-darkerAccent">
              <div className="flex justify-center">
                <PiWarningOctagonFill size={60} />
              </div>
              <h2 className="col-span-3" style={{ textWrap: "balance" }}>
                Este correo electrónico ya está registrado. Por favor, utiliza
                otra dirección de correo electrónico o inicia sesión si ya
                tienes una cuenta
              </h2>
            </div>
          )}
          {/* form inputs */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="mail" className="text-neutral">
                Correo
              </label>
              <input
                {...register("mail", {
                  required: {
                    value: true,
                    message: "Dirección de correo requerida",
                  },
                  pattern: {
                    value: /^[a-z0-9._%+-]+@[a-z0-9·-]+\.[a-z]{2,4}$/,
                    message: "Correo no válido",
                  },
                })}
                id="mail"
                type="email"
                className="px-3 py-2 border-2  border-neutral rounded-md focus:outline-none focus:ring focus:border-accent text-fontcolor"
                placeholder="Ingrese su dirección de mail"
              />
              {errors.mail && <span>{errors.mail.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-neutral" htmlFor="password">
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
                placeholder="Ingrese su contraseña"
              />
              {errors.password && (
                <span className="">{errors.password.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-neutral" htmlFor="name">
                Nombre
              </label>
              <input
                {...register("name", {
                  required: {
                    value: true,
                    message: "Nombre es requerido",
                  },
                  minLength: {
                    value: 2,
                    message: "Nombre debe tener al menos 2 caracteres",
                  },
                  maxLength: {
                    value: 20,
                    message: "Nombre debe tener maximo 20 caracteres",
                  },
                })}
                id="name"
                type="text"
                className="px-3 py-2 border-2  border-neutral rounded-md focus:outline-none focus:ring focus:border-accent text-fontcolor"
                placeholder="Ingrese su nombre"
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-neutral" htmlFor="last-name">
                Apellido
              </label>
              <input
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "Apellido requerido",
                  },
                })}
                id="last-name"
                type="text"
                className="px-3 py-2 border-2  border-neutral rounded-md focus:outline-none focus:ring focus:border-accent text-fontcolor"
                placeholder="Ingrese su apellido"
              />
              {errors.lastName && (
                <span className="">{errors.lastName.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-neutral" htmlFor="phone">
                Numero de teléfono
              </label>
              <input
                {...register("phone", {
                  required: {
                    value: true,
                    message: "Número de telefono requerido",
                  },
                })}
                id="phone"
                type="tel"
                className="px-3 py-2 border-2  border-neutral rounded-md focus:outline-none focus:ring focus:border-accent text-fontcolor"
                placeholder="Ingrese su numero de telefono"
              />
              {errors.phone && <span className="">{errors.phone.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                className="bg-primary text-neutral p-2 rounded-md text-xl font-bold tracking-wide hover:bg-opacity-95 mt-auto "
              >
                Crear cuenta
              </button>
            </div>
          </div>
        </div>
      </form>
      <div className="flex justify-center gap-4">
        <p>¿Ya tienes una cuenta?</p>
        <a href="/login" className="underline">
          Inicia sesión
        </a>
      </div>
    </>
  );
}

export default SignupPage;
