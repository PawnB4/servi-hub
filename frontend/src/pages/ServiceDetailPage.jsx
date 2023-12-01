import { useEffect,  useState } from "react";
import { useParams } from "react-router-dom";
import { getServiceRequest } from "../api/services.api.js";
import ContractForm from "../components/ContractForm.jsx";
import NotFound from "../components/NotFound.jsx";
import Spinner from "../components/Spinner.jsx";
import ServiceComments from "../components/ServiceComments.jsx";

function ServiceDetailPage() {
  const [service, setService] = useState();
  const [provider, setProvider] = useState();
  const [notFound, setNotFound] = useState(false);
  const params = useParams();

  useEffect(() => {
    getServiceRequest(params.id)
      .then((response) => {
        const { user_id, first_name, last_name, degree, work_experience } =
          response.data;
        const {
          average_rating,
          cost,
          created_at,
          duration_minutes,
          frequency,
          is_active,
          service_category,
          service_description,
          service_id,
          service_name,
          service_image,
        } = response.data;
        setProvider({
          user_id,
          first_name,
          last_name,
          degree,
          work_experience,
        });
        setService({
          average_rating,
          cost,
          created_at,
          duration_minutes,
          frequency,
          is_active,
          service_category,
          service_description,
          service_id,
          service_name,
          service_image,
        });
      })
      .catch((err) => setNotFound(true));
  }, [params.id]);

  if (service) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 min-h-screen grid-rows-6 bg-white">
        <div className="hidden md:block "></div>
        <div className="bg-red-950 px-6 sm:px-12 pb-24 pt-12 grid gap-8 grid-cols-1 md:grid-cols-2 col-span-10 row-span-6 text-white">
          <div className="justify-center items-center md:justify-start md:items-start flex flex-col gap-8">
            <span className="text-xl text-gray-300 font-light">
              {service.service_category}
            </span>
            <h1 className="text-center md:text-left text-5xl md:text-7xl">
              {service.service_name}
            </h1>
            <p className="text-xl">{service.service_description}</p>
            <div className="flex flex-col gap-4">
              <p className="text-xl text-gray-300 font-light">
                Datos del proveedor
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <p>
                  <strong>Nombre: </strong>
                  {provider.first_name}
                </p>
                <p>
                  <strong>Título: </strong>
                  {provider.degree}
                </p>
                <p>
                  <strong>Apellido: </strong>
                  {provider.last_name}
                </p>
                <p>
                  <strong>Experiencia laboral: </strong>
                  {provider.work_experience}
                </p>
              </div>
            </div>
            <hr className="bg-neutral h-[0.5px] border-none w-full" />
            <div className="flex w-full flex-col gap-4">
              <p className="text-xl text-gray-300 font-light">
                Datos del servicio
              </p>
              <div className="flex gap-6 justify-evenly">
                <p>
                  <strong>Costo: </strong>
                  {service.cost}
                </p>
                <p>
                  <strong>Duración (minutos): </strong>
                  {service.duration_minutes}
                </p>
                <p>
                  <strong>Frequencia: </strong>
                  {service.frequency}
                </p>
              </div>
            </div>
            <ContractForm service={service} />
          </div>
          <div className="h-[300px] md:min-h-full ">
              <figure className="overflow-hidden rounded shadow-2xl h-full transition-transform duration-300 transform hover:scale-[1.01]">
                <img
                  src={service.service_image}
                  sizes="100vw"
                  className="object-cover w-full h-full"
                />
              </figure>
          </div>
          <div className="md:col-span-2">
            <ServiceComments
              rating={service.average_rating}
              service_id={service.service_id}
            />
          </div>
        </div>
        <div className="hidden md:block"></div>
      </div>
    );
  } else {
    if(notFound){
      return (
        <div className="h-screen">
          <NotFound />
        </div>
      );
    }else{
      return <Spinner/>
    }
  }
}

export default ServiceDetailPage;
