import { PiWarningOctagonFill } from "react-icons/pi";
import { useForm } from "react-hook-form";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [forgotPass, setForgotPass] = useState(false);
  const [invalidMail, setInvalidMail] = useState(false);
  const dialogRef = useRef(null);
  const { logIn, restorePassword, sendRestorePasswordEmail } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const email = watch("mail");

  const onSubmit = handleSubmit(async (datos) => {
    try {
      const res = await logIn(datos);
      console.log(res.data)
      if (res.data.code === 1) {
        // Passwords dont match
        setForgotPass(true);
      } else if (res.data.code === 2) {
        // Invalid mail
        setInvalidMail(true);
      } else {
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  });

  const handleChangePass = async () => {
    try {
      await sendRestorePasswordEmail({ mail: email });
      openDialog();
    } catch (error) {
      console.log(error);
    }
  };

  const openDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} className="flex justify-center text-neutral">
        <div
          className="bg-accent  shadow-xl pt-6 pb-6 pl-10 pr-10 flex flex-col gap-3"
          style={{ width: "500px" }}
        >
          <h1 className="text-2xl tracking-wide textce">Bienvenido de nuevo</h1>
          <hr className="bg-primary h-0.5 border-none" />
          {forgotPass ? (
            <div className="grid grid-cols-4 justify-center items-center p-3 rounded-md gap-3 bg-darkerAccent">
              <div className="flex justify-center">
                <PiWarningOctagonFill size={60} />
              </div>
              <h2 className="col-span-3">
                No reconocemos esa contraseña. Vuelve a intentarlo o restablece
                tu contraseña. Para obtener más ayuda, visita nuestra página de
                asistencia
              </h2>
            </div>
          ) : invalidMail ? (
            <div className="grid grid-cols-4 justify-center items-center p-3 rounded-md gap-3 bg-darkerAccent">
              <div className="flex justify-center">
                <PiWarningOctagonFill size={60} />
              </div>
              <h2 className="col-span-3">
                Se ha producido un problema al iniciar sesión. Comprueba el
                correo electrónico y la contraseña o crea una cuenta
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
            {forgotPass && (
              <span>
                <button
                  className="text-neutral underline"
                  onClick={handleChangePass}
                  type="button"
                >
                  Recuperar contraseña
                </button>
              </span>
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
        <div className="flex flex-col gap-4 p-8">
          <p>
            Se ha enviado un correo electrónico a la dirección asociada a tu
            cuenta con las instrucciones necesarias para completar el proceso de
            recuperación de contraseña.
          </p>
          <p>
            Por favor, revisa tu bandeja de entrada y, en caso de no encontrar
            el correo, verifica también la carpeta de correo no deseado (spam).
          </p>
        </div>
      </dialog>
    </>
  );
}

export default LoginPage;
