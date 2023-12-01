
export default function ServiceCard({ service }) {
  return (
    <a href={`/services/${service.service_id}`}>
      <div className="grid grid-cols-1 lg:grid-cols-10 items-center gap-2 sm:gap-8 shadow min-w-full max-w-md m-auto">
        <div className=" lg:col-span-2">
          <figure className=" relative overflow-hidden shadow">
            <img
              src={service.service_image}
              sizes="100vw"
              className="object-cover w-full h-full max-h-80 "
            />
          </figure>
        </div>
        <div className="lg:col-span-8 flex flex-col w-full px-6 md:p-2 ">
          <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
            <div className="flex flex-col justify-between">
              <h2 className="text-3xl font-bold text-darkerPrimary ">
                {service.service_name}
              </h2>
              <span className="text-gray-500">{service.service_category}</span>
            </div>
            <span className="text-gray-500">
              Calificación: {parseFloat(service.average_rating).toFixed(1)}
            </span>
          </div>
          <div>
            <p className="text-gray-700 mb-4">{service.service_description}</p>
            <div className="grid mb-4 grid-cols-2 gap-2">
              <div className="mr-4">
                <span className="font-semibold">Frecuencia:</span>
                <span className="text-gray-700">
                  {service.frequency !== "A definir"
                    ? " " + service.frequency
                    : " A definir"}
                </span>
              </div>
              <div className="mr-4">
                <span className="font-semibold">Duración:</span>
                <span className="text-gray-700">
                  {service.duration_minutes !== "A definir"
                    ? " " + service.duration_minutes + " minutos"
                    : " A definir"}
                </span>
              </div>
              <div className="mr-4">
                <span className="font-semibold">Costo:</span>
                <span className="text-gray-700">
                  {service.cost !== "A definir"
                    ? " $" + service.cost
                    : " A definir"}
                </span>
              </div>
              <div>
                <span className="font-semibold">Proveedor: </span>
                <span className="text-gray-700">
                  {service.first_name} {service.last_name}
                </span>
              </div>
            </div>
            <div className="w-full aspect-w-1 aspect-h-1 bg-gray-300 rounded-md"></div>
          </div>
          <div className="w-full mt-auto"></div>
        </div>
      </div>
    </a>
  );
}
