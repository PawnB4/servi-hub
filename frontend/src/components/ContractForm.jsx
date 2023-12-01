import { useForm } from "react-hook-form";
import { useState } from "react";
import { createContractRequest } from "../api/contracts.api";

function ContractForm({ service }) {
  const [formSent, setFormSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    const formData = {
      service_id: service.service_id,
      contract_mail: data.contract_mail,
      contract_message: data.contract_message,
      contract_phone: data.contract_phone,
    };
    console.log(formData);
    try {
      await createContractRequest(formData);
      setFormSent(true);
    } catch (error) {
      console.log(error);
    }
  });

  if (formSent) {
    return (
      <div className="flex justify-center items-center h-full">
        <h1 className="text-2xl font-bold text-complementary">
          Su solicitud fue enviada con éxito. Manténgase al tanto de su casilla
          de correo para recibir una respuesta del proveedor.
        </h1>
      </div>
    );
  } else {
    return (
      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-6 justify-center text-neutral w-full"
      >
        <h3 className="text-2xl">Contratar este servicio</h3>
        {/* form inputs */}
        <div className="flex flex-col gap-2">
          <label htmlFor="contract_mail" className="text-neutral">
            Correo
          </label>
          <input
            {...register("contract_mail", {
              required: {
                value: true,
                message: "Dirección de correo requerida",
              },
              pattern: {
                value: /^[a-z0-9._%+-]+@[a-z0-9·-]+\.[a-z]{2,4}$/,
                message: "Correo no válido",
              },
            })}
            id="contract_mail"
            type="email"
            className="px-3 py-2 border-2  border-neutral rounded-md focus:outline-none focus:ring focus:border-accent text-fontcolor"
            placeholder="Ingrese su dirección de mail"
          />
          {errors.contract_mail && <span>{errors.contract_mail.message}</span>}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-neutral" htmlFor="contract_phone">
            Numero de teléfono
          </label>
          <input
            {...register("contract_phone", {
              required: {
                value: true,
                message: "Número de telefono requerido",
              },
            })}
            id="contract_phone"
            type="tel"
            className="px-3 py-2 border-2  border-neutral rounded-md focus:outline-none focus:ring focus:border-accent text-fontcolor"
            placeholder="Ingrese su numero de telefono"
          />
          {errors.contract_phone && (
            <span className="">{errors.contract_phone.message}</span>
          )}
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-neutral" htmlFor="contract_message">
            Motivo de contratación
          </label>
          <textarea
            {...register("contract_message", {
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
            id="contract_message"
            className="px-3 py-2 border-2  border-neutral rounded-md focus:outline-none focus:ring focus:border-accent text-fontcolor"
            placeholder="¿Por qué le interesa contratar este servicio?"
          ></textarea>
          {errors.contract_message && (
            <span>{errors.contract_message.message}</span>
          )}
        </div>

        <button
          type="submit"
          className="bg-primary text-neutral p-2 rounded-md text-xl font-bold tracking-wide hover:bg-opacity-95 md:col-start-2"
        >
          Enviar solicitud
        </button>
      </form>
    );
  }
}
export default ContractForm;
