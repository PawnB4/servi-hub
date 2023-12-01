
const UserServices = ({ userServices, onServiceClick }) => {
  const handleClick = (service_id) => {
    onServiceClick(service_id);
  };
  return userServices.map((service) => (
    <div
      className="w-full transition-transform duration-300 transform hover:scale-[1.02] shadow-lg bg-gradient-to-b from-neutral to-secondary"
      key={service.service_id}
    >
      <button
        type="button"
        className="block w-full h-full "
        onClick={() => handleClick(service.service_id)}
      >
        <div className="h-full flex flex-col gap-6">
          <figure className="relative overflow-hidden shadow">
            <img
              src={service.service_image}
              sizes="100vw"
              className="object-cover w-full max-h-96 "
            />
          </figure>
          <div className="p-2">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {service.service_name}
            </h2>
            <p className="text-gray-600 mb-4">{service.service_description}</p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-auto px-2 py-6">
            <div>
              <p className="text-gray-600">Estado:</p>
              <p className="text-gray-800 font-semibold">
                {service.is_active === 1 ? "Disponible" : "No disponible"}
              </p>
            </div>
            <div>
              <p className="text-gray-600">Calificación:</p>
              <p className="text-gray-800 font-semibold">
                {parseFloat(service.average_rating).toFixed(1)}
              </p>
            </div>
            <div className="col-span-2">
              <p className="text-gray-600">Fecha de publicación:</p>
              <p className="text-gray-800 font-semibold">
                {service.created_at.substring(0, 10)}
              </p>
            </div>
          </div>
        </div>
      </button>
    </div>
  ));
};

export default UserServices;
