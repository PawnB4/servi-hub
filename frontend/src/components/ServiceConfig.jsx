import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import {
  deleteServiceRequest,
  updateServiceRequest,
} from "../api/services.api";

function ServiceConfig({ service }) {
  const [isToggled, setToggled] = useState(service.is_active);
  const [askConfirmDelete, setAskConfirmDelete] = useState(false);
  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleToggle = () => {
    setToggled(!isToggled);
  };

  const isDurationCheckboxChecked = watch("durationCheckbox");
  const isCostCheckboxChecked = watch("costCheckbox");
  const imageFile = watch("serviceImage");

  const deleteService = async () => {
    try {
      await deleteServiceRequest(service.service_id);
      if (isMounted.current) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("service_id", service.service_id);
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("frequency", data.frequency);
    formData.append(
      "duration",
      data.durationCheckbox ? "A definir" : data.duration
    );
    formData.append("cost", data.costCheckbox ? "A definir" : data.cost);
    formData.append("isActive", isToggled ? 1 : 0);
    formData.append("image", imageFile[0]);
    try {
      await updateServiceRequest(formData);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex justify-center text-fontcolor flex-col gap-8 px-2 md:px-14"
      id="ServiceConfig"
    >
      <h3 className="text-2xl  text-gray-700 font-light text-center md:text-left ">
        Editar datos del servicio
      </h3>
      <div className="flex  gap-16 ">
        <label htmlFor="name" className="text-fontcolor">
          {isToggled ? "Servicio publicado" : "Servicio no publicado"}
        </label>
        <div
          className={`slide-toggle ${
            isToggled ? "toggled bg-green-200" : "bg-red-200"
          }`}
          onClick={handleToggle}
        >
          <div className="slider bg-accent"></div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="name" className="text-fontcolor">
          Nombre
        </label>
        <input
          {...register("name", {
            required: {
              value: true,
              message: "Nombre requerido",
            },
            minLength: {
              value: 5,
              message: "Ingresar mas de 5 caracteres",
            },
            value: service.service_name,
          })}
          id="name"
          type="text"
          className="px-3 py-2 border-2  border-accent rounded-md focus:outline-none focus:ring focus:border-darkerAccent text-fontcolor"
          placeholder="Ingrese el nombre del servicio"
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-fontcolor" htmlFor="category-select">
          Seleccione la categoría
        </label>
        <select
          name="category"
          id="category-select"
          className="px-3 py-2 border-2  border-accent rounded-md focus:outline-none focus:ring focus:border-darkerAccent text-fontcolor"
          {...register("category", {
            required: {
              value: true,
              message: "Campo requerido",
            },
            value: service.service_category,
          })}
        >
          <option value="Tareas del hogar">Tareas del hogar</option>
          <option value="Cuidado de ninos">Cuidado de niños</option>
          <option value="Servicios para mascotas">
            Servicios para mascotas
          </option>
          <option value="Educacion">Educación</option>
          <option value="Eventos">Eventos</option>
          <option value="Tecnologia">Tecnologia</option>
          <option value="Fitness y bienestar">Fitness y bienestar</option>
          <option value="Diseno y creatividad">Diseno y creatividad</option>
          <option value="Otro">Otro</option>
        </select>

        {errors.category && <span className="">{errors.category.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-fontcolor" htmlFor="description">
          Descripción
        </label>
        <textarea
          {...register("description", {
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
            value: service.service_description,
          })}
          id="description"
          className="px-3 py-2 border-2  border-accent rounded-md focus:outline-none focus:ring focus:border-darkerAccent text-fontcolor"
          placeholder="Ingrese la descripción del servicio"
        ></textarea>
        {errors.description && <span>{errors.description.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="service-image" className="text-fontcolor">
          Imagen
        </label>
        <input
          {...register("serviceImage")}
          id="service-image"
          type="file"
          className="px-3 py-2 border-2  border-accent rounded-md focus:outline-none focus:ring focus:border-darkerAccent text-fontcolor"
          placeholder="Adjunte su imagen"
        />
        {errors.serviceImage && <span>{errors.serviceImage.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-fontcolor" htmlFor="frequency">
          Frecuencia
        </label>
        <select
          name="frequency"
          id="frequency-select"
          {...register("frequency", {
            required: {
              value: true,
              message: "Frecuencia requerida",
            },
            value: service.frequency,
          })}
          className="px-3 py-2 border-2  border-accent rounded-md focus:outline-none focus:ring focus:border-darkerAccent text-fontcolor"
        >
          <option value="1/semana">Una vez por semana</option>
          <option value="2/semana">Dos veces por semana</option>
          <option value="3/semana">Tres veces por semana</option>
          <option value="1/mes">Una vez por mes</option>
          <option value="2/mes">Dos veces por mes</option>
          <option value="A definir">A definir con cliente</option>
        </select>
        {errors.frequency && (
          <span className="">{errors.frequency.message}</span>
        )}
      </div>
      <div className="">
        {imageFile && imageFile[0] && (
          <figure className="relative overflow-hidden rounded py-2">
            <img
              src={URL.createObjectURL(imageFile[0])}
              alt="Online class"
              sizes="100vw"
              className="object-cover w-full h-full"
            />
          </figure>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-fontcolor" htmlFor="duration">
          Duración
        </label>
        <div className="grid grid-cols-2 gap-10">
          <input
            {...register("duration", {
              required: !isDurationCheckboxChecked
                ? "Duración requerida"
                : false,
              pattern: {
                value: /^[0-9]*$/,
                message: "Ingresar un tiempo válido",
              },
              value:
                service.duration_minutes === "A definir"
                  ? null
                  : service.duration_minutes,
            })}
            type="text"
            className="px-3 py-2 border-2  border-accent rounded-md focus:outline-none focus:ring focus:border-darkerAccent text-fontcolor"
            placeholder="(Minutos)"
            disabled={isDurationCheckboxChecked}
          />
          <div className="flex justify-start items-center gap-3">
            <input
              {...register("durationCheckbox", {
                value: service.duration_minutes === "A definir",
              })}
              type="checkbox"
              id="duration-cbox"
            />
            <label htmlFor="duration-cbox">A definir con cliente</label>
          </div>
        </div>
        {errors.duration && <span className="">{errors.duration.message}</span>}
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-fontcolor" htmlFor="cost">
          Costo
        </label>
        <div className="grid grid-cols-2 gap-10">
          <input
            {...register("cost", {
              required: !isCostCheckboxChecked ? "Costo requerido" : false,
              pattern: {
                value: /^\d+(\.\d{1,2})?$/,
                message: "Ingresar un costo válido",
              },
              value: service.cost === "A definir" ? null : service.cost,
            })}
            type="text"
            className="px-3 py-2 border-2  border-accent rounded-md focus:outline-none focus:ring focus:border-darkerAccent text-fontcolor"
            placeholder="Ingresar costo"
            disabled={isCostCheckboxChecked}
          />
          <div className="flex justify-start items-center gap-3">
            <input
              {...register("costCheckbox", {
                value: service.cost === "A definir",
              })}
              type="checkbox"
              id="cost-cbox"
            />
            <label htmlFor="cost-cbox">A definir con cliente</label>
          </div>
        </div>
        {errors.cost && <span className="">{errors.cost.message}</span>}
      </div>

      <div></div>
      <div className="">
        <button className="text-white bg-complementary p-2 rounded-md w-full">
          Aplicar cambios
        </button>
      </div>
      <hr className="bg-black h-0.5 border-none" />
      <h3 className="text-2xl  text-gray-700 font-light text-center md:text-left ">
        Configuración avanzada
      </h3>
      <div className="mt-auto flex flex-col gap-2">
        {!askConfirmDelete ? (
          <span className="text-fontcolor font-normal flex gap-2">
            ¿Busca retirar su servicio de forma permanente?
            <button
              type="button"
              className="text-primary underline font-bold"
              onClick={() => setAskConfirmDelete(true)}
            >
              Eliminar servicio
            </button>
          </span>
        ) : (
          <span className="text-fontcolor font-normal flex gap-2 items-center">
            ¿Está seguro? Esta acción no podrá deshacerse
            <button
              type="button"
              className="text-black bg-secondary p-2   w-[100px]"
              onClick={() => setAskConfirmDelete(false)}
            >
              Cancelar
            </button>
            <button
              type="button"
              className="text-white bg-darkerPrimary p-2 w-[100px]"
              onClick={deleteService}
            >
              Confirmar
            </button>
          </span>
        )}
      </div>
    </form>
  );
}

export default ServiceConfig;
