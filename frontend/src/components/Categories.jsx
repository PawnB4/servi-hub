import { GiPencilBrush, GiPartyPopper } from "react-icons/gi";
import { FaHome, FaDog } from "react-icons/fa";
import { MdFitnessCenter } from "react-icons/md";
import { TbMathFunctionY, TbMoodKidFilled, TbCpu } from "react-icons/tb";

const Categories = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      <div className="flex flex-col gap-2 w-full text-neutral p-2">
        <FaHome size={50} className="m-auto" />
        <h3 className="p-1 border-b-2 border-complementary text-center font-light">
          Tareas del hogar
        </h3>
      </div>
      <div className="flex flex-col gap-2 w-full text-neutral p-2">
        <FaDog size={50} className="m-auto" />
        <h3 className="p-1 border-b-2 border-complementary text-center font-light">
          Servicios para mascotas
        </h3>
      </div>
      <div className="flex flex-col gap-2 w-full text-neutral p-2">
        <GiPartyPopper size={50} className="m-auto" />
        <h3 className="p-1 border-b-2 border-complementary text-center font-light">
          Eventos
        </h3>
      </div>
      <div className="flex flex-col gap-2 w-full text-neutral p-2">
        <TbMathFunctionY size={50} className="m-auto" />
        <h3 className="p-1 border-b-2 border-complementary text-center font-light">
          Educación
        </h3>
      </div>
      <div className="flex flex-col gap-2 w-full text-neutral p-2">
        <MdFitnessCenter size={50} className="m-auto" />
        <h3 className="p-1 border-b-2 border-complementary text-center font-light">
          Fitness y bienestar
        </h3>
      </div>
      <div className="flex flex-col gap-2 w-full text-neutral p-2">
        <TbCpu size={50} className="m-auto" />
        <h3 className="p-1 border-b-2 border-complementary text-center font-light">
          Tecnología
        </h3>
      </div>
      <div className="flex flex-col gap-2 w-full text-neutral p-2">
        <TbMoodKidFilled size={50} className="m-auto" />
        <h3 className="p-1 border-b-2 border-complementary text-center font-light">
          Cuidado de niños
        </h3>
      </div>
      <div className="flex flex-col gap-2 w-full text-neutral p-2">
        <GiPencilBrush size={50} className="m-auto" />
        <h3 className="p-1 border-b-2 border-complementary text-center font-light">
          Diseño y creatividad
        </h3>
      </div>
    </div>
  );
};

export default Categories;
