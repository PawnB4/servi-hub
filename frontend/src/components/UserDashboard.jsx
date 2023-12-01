import { useState } from "react";
import { useForm } from "react-hook-form";
import { updateUserRequest } from "../api/user.api";
import ServiceFormDialog from "./ServiceFormDialog";
import UserServices from "./UserServices";
import ServiceEditDialog from "./ServiceEditDialog";

function UserDashboard({ user, userServices }) {
  const [isServiceDialogOpen, setIsServiceDialogOpen] = useState(false);
  const [serviceClicked, setServiceClicked] = useState({});
  const [informationComplete, setInformationComplete] = useState(
    user.degree === null ? false : true
  );
  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isDegreeCheckboxChecked = watch("degreeCheckbox");
  const imageFile = watch("userImage");

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("user_id", user.user_id);
    formData.append("work_experience", data.work_experience);
    formData.append("degree", data.degreeCheckbox ? "N/A" : data.degree);
    formData.append("image", imageFile[0]);
    try {
      await updateUserRequest(formData);
      setInformationComplete(true);
    } catch (error) {
      console.log(error);
    }
  });

  const handleOnServiceClick = (service_id) => {
    const foundItem = userServices.find((service) => {
      return service.service_id === service_id;
    });
    setServiceClicked(foundItem);
    setIsServiceDialogOpen(true);
  };

  const closeServiceDialog = () => {
    setIsServiceDialogOpen(false);
  };

  if (informationComplete) {
    return (
      <div className="py-8">
        <div className="grid grid-cols-1  gap-8 pt-8">
          <div className="text-fontcolor grid grid-cols-12 gap-8 max-w-[1200px] ">
            <figure className="relative overflow-hidden rounded py-2 col-start-2 col-span-2 row-span-2">
              <img
                src={user.user_profile_image}
                sizes="100vw"
                className="object-cover w-full max-w-[200px] mx-auto"
              />
            </figure>
            <div className="col-start-4 col-span-9 self-center flex flex-col gap-4">
              <h3 className="text-3xl">
                {user.first_name} {user.last_name}
              </h3>
              <h3 className="text-xl text-gray-800 font-light">
                {user.degree}
              </h3>
              <h3 className="text-xl text-gray-800 font-light">
                {user.work_experience}
              </h3>
            </div>
            <div className="col-start-4 col-span-9 row-start-2">
              <ServiceFormDialog user={user} userServices={userServices} />
            </div>
          </div>
          <hr className="bg-accent h-[1px] border-none mx-44" />
          <div className="grid grid-cols-1  lg:grid-cols-3 w-full px-4 md:px-14 gap-6">
            <h2 className="text-5xl text-gray-500 font-light lg:col-span-3 text-center pb-6">
              {userServices.length === 0
                ? "Aún no ha creado un servicio"
                : "Servicios creados"}
            </h2>
            <UserServices
              userServices={userServices}
              onServiceClick={handleOnServiceClick}
            />
          </div>
        </div>
        {isServiceDialogOpen && (
          <ServiceEditDialog
            onClose={closeServiceDialog}
            service={serviceClicked}
          />
        )}
      </div>
    );
  } else {
    return (
      <div className="h-screen grid grid-cols-12 grid-rows-6">
        <form
          onSubmit={onSubmit}
          className="bg-white col-start-3 col-span-8 row-start-2 row-span-4 flex flex-col gap-8"
        >
          <div className="flex flex-col gap-3 justify-center">
            <h1 className="text-fontcolor text-3xl">
              Por favor, complete su información para seguir
            </h1>
            <hr className="bg-fontcolor h-1 border-none" />
          </div>
          <div
            className="grid grid-cols-2 gap-8 shadow-bot p-8"
            style={{
              boxShadow: "3px 3px 5px rgba(0, 0, 0, 0.2)",
            }}
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="user-image" className="text-fontcolor">
                Foto de perfil
              </label>
              <input
                {...register("userImage", {
                  required: {
                    value: true,
                    message: "Imagen requerida",
                  },
                })}
                id="user-image"
                type="file"
                className="px-3 py-2 border-2  border-accent rounded-md focus:outline-none focus:ring focus:border-darkerAccent text-fontcolor"
              />
              {errors.userImage && <span>{errors.userImage.message}</span>}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-fontcolor" htmlFor="degree">
                Titulo universitario
              </label>
              <input
                {...register("degree", {
                  required: !isDegreeCheckboxChecked
                    ? "Titulo requerido"
                    : false,
                })}
                type="text"
                className="px-3 py-2 border-2 border-neutral rounded-md focus:outline-none focus:ring focus:border-accent text-fontcolor"
                placeholder="Ingrese su titulo"
                disabled={isDegreeCheckboxChecked}
              />
              <div className="flex  gap-3">
                <input
                  {...register("degreeCheckbox")}
                  type="checkbox"
                  id="duration-cbox"
                />
                <label htmlFor="duration-cbox">
                  No cuento con titulo universitario
                </label>
              </div>
              {errors.degree && (
                <span className="">{errors.degree.message}</span>
              )}
            </div>
            <div className="justify-self-center">
              {imageFile && imageFile[0] && (
                <figure className="relative overflow-hidden rounded py-2">
                  <img
                    src={URL.createObjectURL(imageFile[0])}
                    alt="Online class"
                    sizes="100vw"
                    className="object-cover w-[200px]"
                  />
                </figure>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-fontcolor" htmlFor="work_experience">
                Experiencia laboral
              </label>
              <textarea
                {...register("work_experience", {
                  required: {
                    value: true,
                    message: "Descripción requerida",
                  },
                  minLength: {
                    value: 20,
                    message: "Descripción debe tener al menos 20 caracteres",
                  },
                  maxLength: {
                    value: 200,
                    message: "Descripción debe tener maximo 200 caracteres",
                  },
                })}
                id="work_experience"
                className="px-3 py-2 border-2 h-full border-neutral rounded-md focus:outline-none focus:ring focus:border-accent text-fontcolor"
                placeholder="Ingrese su experiencia laboral"
              ></textarea>
              {errors.work_experience && (
                <span>{errors.work_experience.message}</span>
              )}
            </div>
            <button
              type="submit"
              className="bg-accent text-neutral p-2 rounded-md text-xl font-bold col-span-2 tracking-wide hover:bg-opacity-95 w-3/5 justify-self-center"
            >
              Continuar
            </button>
          </div>
        </form>
      </div>
    );
  }
}

export default UserDashboard;
