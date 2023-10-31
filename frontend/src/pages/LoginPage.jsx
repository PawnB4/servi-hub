import { PiWarningOctagonFill } from "react-icons/pi";
import { AiFillCloseCircle } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";

function LoginPage() {
  const [forgotPass, setForgotPass] = useState(false);
  const [changedPass, setChangedPass] = useState(false);
  const [invalidPet, setInvalidPet] = useState(false);
  const petName = useRef();
  const emailRef = useRef();
  const newPassword = useRef();
  const dialogRef = useRef(null);
  const { logIn, restorePassword } = useAuth();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    try {
      await logIn(data);
      navigate("/profile");
    } catch (error) {
      setForgotPass(true);
    }
  });

  const changePassword = async () => {
    let data = {
      email: emailRef.current.value,
      pet_name: petName.current.value,
      new_password: newPassword.current.value,
    };
    try {
      await restorePassword(data);
      setChangedPass(true);
    } catch (error) {
      setInvalidPet(true);
    }
  };

  const reloadPage = () => {
    setForgotPass(false);
    setInvalidPet(false);
    setChangedPass(false);
  };

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };
  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close();
    }
  };

  if (changedPass) {
    return (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  z-10 shadow-lg bg-secondary">
        <div className="p-12 text-center flex flex-col gap-3">
          <h1 className="text-fontcolor text-2xl font-bold">
            Contraseña modificada con éxito
          </h1>
          <h1 className="text-fontcolor text-2xl font-bold">
            Por favor inicie sesión nuevamente
          </h1>
          <div></div>
          <button
            className="bg-accent p-2  hover:bg-darkerAccent text-white"
            onClick={reloadPage}
          >
            Aceptar
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <>
        <form onSubmit={onSubmit} className="flex justify-center text-neutral">
          <div
            className="bg-accent  shadow-xl pt-6 pb-6 pl-10 pr-10 flex flex-col gap-3"
            style={{ width: "500px" }}
          >
            <h1 className="text-2xl tracking-wide textce">
              Bienvenido de nuevo
            </h1>
            <hr className="bg-primary h-0.5 border-none" />
            {forgotPass ? (
              <div className="grid grid-cols-4 justify-center items-center p-3 rounded-md gap-3 bg-darkerAccent">
                <div className="flex justify-center">
                  <PiWarningOctagonFill size={60} />
                </div>
                <h2 className="col-span-3">
                  No reconocemos esa contraseña. Vuelve a intentarlo o
                  restablece tu contraseña. Para obtener más ayuda, visita
                  nuestra página de asistencia
                </h2>
              </div>
            ) : (
              <></>
            )}
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
                })}
                id="password"
                type="password"
                className="px-3 py-2 border-2  border-neutral rounded-md focus:outline-none focus:ring focus:border-accent text-fontcolor"
                placeholder="Ingrese su contraseña"
              />
              {errors.password && (
                <span className="">{errors.password.message}</span>
              )}
              {forgotPass ? (
                <span>
                  <button
                    className="text-neutral underline"
                    onClick={openDialog}
                  >
                    Recuperar contraseña
                  </button>
                </span>
              ) : (
                <></>
              )}
            </div>

            <div></div>
            <button
              type="submit"
              className="bg-primary text-neutral p-2 rounded-md text-xl font-bold tracking-wide hover:bg-opacity-95"
            >
              Inicar sesión
            </button>
          </div>
        </form>
        <div className="flex justify-center gap-4">
          <p>¿No tienes cuenta?</p>
          <a href="/signup" className="underline">
            Regístrate
          </a>
        </div>
        <dialog
          ref={dialogRef}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 shadow-lg  bg-white w-[500px]"
        >
          <div className="text-slate-400 px-3 pt-3 flex justify-end ">
            <button className="hover:text-slate-800" onClick={closeDialog}>
              <AiFillCloseCircle size={25} />
            </button>
          </div>
          <div className=" pb-6 px-6 flex flex-col gap-4 rounded-lg justify-center items-center w-full">
            <h1 className="text-fontcolor text-2xl font-bold">
              Recuperar contraseña
            </h1>
            <div className="w-3/4 flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-fontcolor">
                  Correo
                </label>
                <input
                  ref={emailRef}
                  id="email"
                  type="email"
                  className="px-3 py-2 border-2  border-neutral rounded-md focus:outline-none focus:ring focus:border-accent text-fontcolor"
                  placeholder="Ingrese su dirección de mail"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-fontcolor" htmlFor="password">
                  Nueva contraseña
                </label>
                <input
                  ref={newPassword}
                  id="newPassword"
                  type="password"
                  className="px-3 py-2 border-2  border-neutral rounded-md focus:outline-none focus:ring focus:border-accent text-fontcolor"
                  placeholder="Ingrese su contraseña"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-fontcolor" htmlFor="password">
                  Pregunta de seguridad
                </label>
                <input
                  ref={petName}
                  id="petName"
                  type="text"
                  className="px-3 py-2 border-2  border-neutral rounded-md focus:outline-none focus:ring focus:border-accent text-fontcolor"
                  placeholder="¿Cual es el nombre de su primer mascota?"
                />
                {invalidPet && (
                  <span className="text-primary font-bold">
                    Pregunta de recuperación invalida
                  </span>
                )}
              </div>
            </div>
            <div></div>
            <div></div>
            <div>
              <button
                className="bg-accent p-2 rounded-md hover:bg-darkerAccent text-white"
                onClick={changePassword}
              >
                Cambiar contraseña
              </button>
            </div>
          </div>
        </dialog>
      </>
    );
  }
}

export default LoginPage;
