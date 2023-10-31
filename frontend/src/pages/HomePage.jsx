import piano from "../assets/piano.jpg";
import Categories from "../components/Categories";
import HomeImages from "../components/HomeImages";
import ServicesButton from "../components/ServicesButton";
import SignUpButton from "../components/SignUpButton";

function HomePage() {
  return (
    <div>
      <div className="w-9/12 m-auto flex flex-col gap-14 md:gap-28">
        <div className="flex flex-col mt-4  lg:grid lg:grid-cols-2 lg:mt-16 gap-12">
          <div className="flex flex-col justify-center gap-8 lg:gap-16 border-b-4 pb-4 border-b-accent">
            <h1
              className="text-5xl lg:text-7xl text-center lg:text-left font-bold"
              style={{ textWrap: "balance" }}
            >
              Conectando necesidades con soluciones
            </h1>
            <h2 className="text-2xl lg:text-4xl text-center lg:text-left text-fontcolor">
              Tu destino para encontrar servicios personalizados
            </h2>
            <div>
              <ServicesButton />
            </div>
          </div>
          <div>
            <HomeImages />
          </div>
        </div>
        <div className="flex flex-col gap-10">
          <h1 className="text-5xl font-bold text-center">
            Más de 200 servicios para elegir
          </h1>
          <div>
            <p className="text-xl md:text-2xl text-center">
              <strong>Servi-Hub</strong> es una plataforma diseñada para
              explorar, aprender y conectar.
            </p>
            <p className="text-xl md:text-2xl text-center">
              Aquí encontrarás un mundo de posibilidades a tu alcance, donde
              podrás descubrir servicios excepcionales y oportunidades
              emocionantes
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <figure className="relative overflow-hidden rounded-lg h-[400px] w-full">
              <img
                src={piano}
                alt="Studying in bed"
                sizes="100vw"
                className="object-cover w-full h-full"
              />
            </figure>
            <div className="flex flex-col justify-center lg:items-end gap-7">
              <div>
                <p className="text-xl text-center lg:text-right">
                  ¿Quieres descubrir nuevas habilidades? ¿Necesitas ayuda en un
                  área específica? ¡Estás en el lugar correcto!
                </p>
                <p className="text-xl text-center lg:text-right">
                  Nuestra plataforma está pensada para brindarte experiencias
                  únicas y valiosas.
                </p>
              </div>
              <p className="text-xl text-center lg:text-right">
                Desde servicios de tutoría hasta emocionantes clases grupales,
                estamos aquí para ofrecerte soluciones que se adapten a tus
                necesidades y aspiraciones
              </p>
            </div>
          </div>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
        <path
          fill="#e63946"
          fillOpacity="1"
          d="M0,32L480,96L960,128L1440,32L1440,320L960,320L480,320L0,320Z"
        ></path>
      </svg>
      <div
        style={{
          background: "linear-gradient(to bottom, #e63946, #961d29)",
        }}
      >
        <div className="w-10/12 md:w-9/12 m-auto flex flex-col gap-20">
          <h1 className="text-center text-4xl font-bold text-white p-2 rounded-sm">
            Lo necesitás, nosotros lo tenemos
          </h1>
          <Categories />
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <path
          fill="#961d29"
          fillOpacity="1"
          d="M0,96L360,160L720,160L1080,192L1440,160L1440,0L1080,0L720,0L360,0L0,0Z"
        ></path>
      </svg>
      <div className="w-9/12 mx-auto mb-32 md:mb-64 flex flex-col gap-20">
        <hr className="bg-accent h-1 border-none" />
        <h1
          className="text-5xl md:text-7xl font-bold text-center"
          style={{ textWrap: "balance" }}
        >
          ¿Que estás esperando?
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          <div className="flex flex-col gap-4 justify-center align-middle">
            <div>
              <h2 className="text-xl text-center">
                Comienza a explorar los servicios que tenemos para ofrecer
              </h2>
            </div>
            <ServicesButton />
          </div>
          <div className="flex flex-col gap-4 justify-end align-end">
            <div>
              <h2 className="text-xl text-center">
                Únete si deseas proveer un servicio
              </h2>
            </div>
            <SignUpButton />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
