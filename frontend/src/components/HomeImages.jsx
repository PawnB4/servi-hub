import bed from "../assets/bed-sq.jpg";
import math1 from "../assets/math1-sq.jpg";
import online from "../assets/online.jpg";

export default function HomeImages() {
  return (
    <div className="grid grid-cols-2 gap-5">
      <figure className="relative overflow-hidden rounded-lg shadow-2xl transition-transform duration-300 transform hover:scale-105 row-span-2">
        <img
          src={online}
          alt="Online class"
          sizes="100vw"
          className="object-cover w-full h-full"
        />
      </figure>
      <figure
        className="relative overflow-hidden rounded-lg shadow-2xl transition-transform duration-300 transform hover:scale-105 h-[250px]"
      >
        <img
          src={bed}
          alt="Studying in bed"
          sizes="100vw"
          className="object-cover w-full h-full"
        />
      </figure>
      <figure
        className="relative overflow-hidden rounded-lg shadow-2xl transition-transform duration-300 transform hover:scale-105 h-[250px]"
      >
        <img
          src={math1}
          alt="Math class"
          className="object-cover w-full h-full"
          sizes="100vw"
        />
      </figure>
    </div>
  );
}
