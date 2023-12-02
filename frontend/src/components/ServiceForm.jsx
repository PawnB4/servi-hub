import { useForm } from "react-hook-form";
import { createServiceRequest } from "../api/services.api";
import {  useState } from "react";
import Spinner from "./Spinner";

function ServiceForm({ user_id, onServiceCreation }) {
  const [loading, setLoading] = useState(false);

  const {
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isDurationCheckboxChecked = watch("durationCheckbox");
  const isCostCheckboxChecked = watch("costCheckbox");
  const imageFile = watch("serviceImage");

  const onSubmit = handleSubmit(async (data) => {
    const formData = new FormData();
    formData.append("user_id", user_id);
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("frequency", data.frequency);
    formData.append(
      "duration",
      data.durationCheckbox ? "A definir" : data.duration
    );
    formData.append("cost", data.costCheckbox ? "A definir" : data.cost);
    formData.append("image", imageFile[0]);
    try {
      console.log(formData)
      await createServiceRequest(formData);
      onServiceCreation();
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex justify-center  text-fontcolor"
      id="serviceForm"
    >
      <div
        className="bg-inherit rounded-lg pb-6 pl-10 pr-10 flex flex-col md:grid md:grid-cols-2 gap-3 md:gap-6"
      >
        {loading ? (
          <div className="w-[375px] h-[225px] flex flex-col justify-center items-center gap-5">
            <Spinner />
          </div>
        ) : (
          <>
            <h1 className="text-2xl tracking-wide md:col-span-2">
              Crear nuevo servicio
            </h1>
            <hr className="bg-primary h-0.5 border-none md:col-span-2" />
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
                <option value="Diseno y creatividad">
                  Diseno y creatividad
                </option>
                <option value="Otro">Otro</option>
              </select>
              {errors.category && (
                <span className="">{errors.category.message}</span>
              )}
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
                {...register("serviceImage", {
                  required: {
                    value: true,
                    message: "Imagen requerida",
                  },
                })}
                id="service-image"
                type="file"
                className="px-3 py-2 border-2  border-accent rounded-md focus:outline-none focus:ring focus:border-darkerAccent text-fontcolor"
                placeholder="Adjunte su imagen"
              />
              {errors.serviceImage && (
                <span>{errors.serviceImage.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2 justify-center">
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
                  })}
                  type="text"
                  className="px-3 py-2 border-2  border-accent rounded-md focus:outline-none focus:ring focus:border-darkerAccent text-fontcolor"
                  placeholder="(Minutos)"
                  disabled={isDurationCheckboxChecked}
                />
                <div className="flex justify-center items-center gap-3">
                  <label htmlFor="duration-cbox">A definir con cliente</label>
                  <input
                    {...register("durationCheckbox")}
                    type="checkbox"
                    id="duration-cbox"
                  />
                </div>
              </div>
              {errors.duration && (
                <span className="">{errors.duration.message}</span>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-fontcolor" htmlFor="cost">
                Costo
              </label>
              <div className="grid grid-cols-2 gap-10">
                <input
                  {...register("cost", {
                    required: !isCostCheckboxChecked
                      ? "Costo requerido"
                      : false,
                    pattern: {
                      value: /^\d+(\.\d{1,2})?$/,
                      message: "Ingresar un costo válido",
                    },
                  })}
                  type="text"
                  className="px-3 py-2 border-2  border-accent rounded-md focus:outline-none focus:ring focus:border-darkerAccent text-fontcolor"
                  placeholder="Ingresar costo"
                  disabled={isCostCheckboxChecked}
                />
                <div className="flex justify-center items-center gap-3">
                  <label htmlFor="cost-cbox">A definir con cliente</label>
                  <input
                    {...register("costCheckbox")}
                    type="checkbox"
                    id="cost-cbox"
                  />
                </div>
              </div>
              {errors.cost && <span className="">{errors.cost.message}</span>}
            </div>
            <button
              type="submit"
              className="bg-accent text-neutral p-2  text-xl md:col-span-2 tracking-wide hover:bg-darkerAccent"
            >
              Crear servicio
            </button>
          </>
        )}
      </div>
    </form>
  );
}

export default ServiceForm;
