import { useForm } from "react-hook-form";
import RangeSelector from "./RangeSelector";

function SearchFilters({ onSetFilters }) {
  const { register, handleSubmit } = useForm();
  let duration, cost, rating;

  const onSubmit = handleSubmit(async (data) => {
    const formData = {
      category: data.category,
      frequency: data.frequency,
      duration,
      cost,
      rating,
    };
    onSetFilters(formData);
  });

  const handleCostData = (data) => {
    cost = data;
  };
  const handleDurationData = (data) => {
    duration = data;
  };
  const handleRatingData = (data) => {
    rating = data;
  };

  return (
    <>
      <form onSubmit={onSubmit} className="text-fontcolor" id="filterForm">
        <div className="bg-inherit grid grid-cols-1 gap-2 ">
          <h1 className=" text-fontcolor text-2xl ">Filtrar servicios</h1>
          <div className="flex flex-col gap-3 ">
            <label className="text-fontcolor" htmlFor="category-select">
              Categoría
            </label>
            <select
              name="category"
              id="category-select"
              className="px-3 py-2 border-2 w-full  border-black rounded-md focus:outline-none focus:ring focus:border-accent text-fontcolor bg-white"
              {...register("category")}
            >
              <option value="">Todos</option>
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
            <hr className="bg-gray-500 h-[1px] border-none" />
          </div>
          <div className="flex flex-col gap-3">
            <label className="text-fontcolor" htmlFor="frequency">
              Frecuencia
            </label>
            <select
              name="frequency"
              id="frequency-select"
              {...register("frequency")}
              className="px-3 py-2 border-2  border-black rounded-md focus:outline-none focus:ring focus:border-accent text-fontcolor bg-white"
            >
              <option value="">Todos</option>
              <option value="1/semana">Una vez por semana</option>
              <option value="2/semana">Dos veces por semana</option>
              <option value="3/semana">Tres veces por semana</option>
              <option value="1/mes">Una vez por mes</option>
              <option value="2/mes">Dos veces por mes</option>
              <option value="A definir">A definir con cliente</option>
            </select>
            <hr className="bg-gray-500 h-[1px] border-none" />
          </div>
          <div className="flex flex-col gap-3 ">
            <label className="text-fontcolor" htmlFor="duration">
              Duración (minutos)
            </label>
            <RangeSelector
              onValueChange={handleDurationData}
              minVal={0}
              maxVal={240}
              stepVal={15}
            />
            <hr className="bg-gray-500 h-[1px] border-none" />
          </div>
          <div className="flex flex-col gap-3 ">
            <label className="text-fontcolor">Costo</label>
            <RangeSelector
              onValueChange={handleCostData}
              minVal={0}
              maxVal={1000}
              stepVal={10}
            />
            <hr className="bg-gray-500 h-[1px] border-none" />
          </div>
          <div className="flex flex-col gap-3 ">
            <label className="text-fontcolor" htmlFor="rating">
              Calificación
            </label>
            <RangeSelector
              onValueChange={handleRatingData}
              minVal={1}
              maxVal={5}
            />
          </div>
          <div className="flex items-center">
            <button
              type="submit"
              className="bg-secondary text-fontcolor px-2 py-1 w-full  tracking-wide hover:bg-opacity-95"
            >
              Aplicar filtros
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default SearchFilters;
