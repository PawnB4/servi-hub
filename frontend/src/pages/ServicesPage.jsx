import { useEffect, useState, useRef } from "react";
import { getAllServicesRequest } from "../api/services.api.js";
import { BiFilter, BiSearchAlt2 } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";
import ServiceCard from "../components/ServiceCard.jsx";
import SearchFilters from "../components/SearchFilters.jsx";

function ServicesPage() {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState(services);
  const searchTermRef = useRef();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    getAllServicesRequest()
      .then((response) => {
        setServices(response.data);
        setFilteredServices(response.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const dialogRef = useRef(null);

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

  useEffect(() => {
    const newFilteredServices = services.filter((item) =>
      item.service_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredServices(newFilteredServices);
  }, [services, searchTerm]);

  const handleSearch = () => {
    setSearchTerm(searchTermRef.current.value);
  };

  const searchReset = () => {
    searchTermRef.current.value = "";
    searchTermRef.current.focus();
    setSearchTerm("");
    setFilteredServices(services);
  };

  const handleFilteredSearch = (data) => {
    closeDialog();
    const newFilteredServices = services.filter((item) => {
      let condition = true;
      if (data.category !== "") {
        condition = condition && item.service_category === data.category;
      }
      if (data.frequency !== "") {
        condition = condition && item.frequency === data.frequency;
      }
      if (!(data.cost.min === 0 && data.cost.max === 0)) {
        let numCost = parseInt(item.cost);
        if (!isNaN(numCost)) {
          condition =
            condition && data.cost.min <= numCost && numCost <= data.cost.max;
        } else {
          condition = condition && false;
        }
      }
      if (!(data.duration.min === 0 && data.duration.max === 0)) {
        let numDuration = parseInt(item.duration_minutes);
        if (!isNaN(numDuration)) {
          condition =
            condition &&
            data.duration.min <= numDuration &&
            numDuration <= data.duration.max;
        } else {
          condition = condition && false;
        }
      }
      if (!(data.rating.min === 0 && data.rating.max === 0)) {
        let numRating = parseFloat(item.average_rating);
        condition =
          condition &&
          data.rating.min <= numRating &&
          numRating <= data.rating.max;
      }
      return condition;
    });
    setFilteredServices(newFilteredServices);
  };

  return (
    <div className="flex flex-col gap-8 sm:px-8">
      <div></div>
      <div className="flex justify-center items-center gap-8">
        <div></div>
        <button onClick={openDialog} className="block lg:hidden">
          <BiFilter size={30} />
        </button>
        <div className="flex flex-row px-8 items-center w-9/12 m-auto shadow-lg gap-4 bg-white">
          <button onClick={handleSearch}>
            <BiSearchAlt2 size={25} />
          </button>
          <input
            type="text"
            placeholder="Nombre del servicio..."
            ref={searchTermRef}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            style={{ all: "unset", padding: "6px", width: "100%" }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1  lg:grid-cols-4 gap-4">
        {/* Filtros */}
        <div className="w-full p-5 hidden lg:block">
          <div className="sticky top-10">
            <SearchFilters onSetFilters={handleFilteredSearch} />
            <button
              onClick={searchReset}
              className="bg-primary text-fontcolor px-2 py-1 w-full  tracking-wide hover:bg-opacity-95 mt-4"
            >
              Resetear filtros
            </button>
          </div>
        </div>
        {/* Servicios */}

        <div className="grid mt-8 p-4 grid-cols-1 gap-8 justify-center items-center col-span-3">
          {filteredServices.length === 0 ? (
            <div className="col-span-full">
              <h1 className="text-center text-2xl">No hay resultados</h1>
            </div>
          ) : (
            filteredServices.map((service) => {
              if (service.is_active) {
                return (
                  <ServiceCard key={service.service_id} service={service} />
                );
              }
              return null;
            })
          )}
        </div>
      </div>
      <dialog
        className="fixed z-10 min-h-screen shadow-lg bg-white py-8"
        ref={dialogRef}
      >
        <div className="flex justify-end p-4">
          <button onClick={closeDialog}>
            <AiOutlineClose size={25} />
          </button>
        </div>
        <div className="px-12">
          <SearchFilters onSetFilters={handleFilteredSearch} />
          <button
            onClick={() => {
              searchReset();
              closeDialog();
            }}
            className="bg-primary text-fontcolor px-2 py-1 w-full  tracking-wide hover:bg-opacity-95 mt-4"
          >
            Resetear filtros
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default ServicesPage;
