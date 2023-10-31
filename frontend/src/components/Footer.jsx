import {
  SlSocialFacebook,
  SlSocialGithub,
  SlSocialGoogle,
  SlSocialInstagram,
  SlSocialLinkedin,
} from "react-icons/sl";
import LogoServiHub from "./LogoServiHub";

function Footer() {
  return (
    <div className=" bg-darkerAccent border-t-2 shadow-lg">
      <div className="gap-4 md:w-3/4 grid grid-cols-1 md:grid-cols-3 text-white m-auto p-8 md:p-16 border-b-2 border-b-neutral">
        <div className="flex flex-col gap-3 justify-center align-middle ">
          <h1 className="text-xl text-center font-bold">Soporte</h1>
          <p className="text-center font-light cursor-pointer">Ayuda</p>
          <p className="text-center font-light cursor-pointer">Estado</p>
          <p className="text-center font-light cursor-pointer">Contacto</p>
        </div>
        <div className="flex flex-col gap-3 justify-center align-middle ">
          <h1 className="text-xl text-center font-bold">Empresa</h1>
          <p className="text-center font-light cursor-pointer">Acerca de</p>
          <p className="text-center font-light cursor-pointer">Blog</p>
          <p className="text-center font-light cursor-pointer">Prensa</p>
        </div>
        <div className="flex flex-col gap-3 justify-center align-middle ">
          <h1 className="text-xl text-center font-bold">
            Términos y condiciones
          </h1>
          <p className="text-center font-light cursor-pointer">Políticas</p>
          <p className="text-center font-light cursor-pointer">Codigo de conducta</p>
          <p className="text-center font-light cursor-pointer">Datos y privacidad</p>
        </div>
      </div>
      <div className="w-11/12 m-auto p-4 flex justify-center gap-4 md:gap-10 flex-wrap-reverse">
        <LogoServiHub />
        <div className="flex gap-3">
            <SlSocialFacebook size={30}/>
            <SlSocialGithub size={30}/>
            <SlSocialGoogle size={30}/>
            <SlSocialInstagram size={30}/>
            <SlSocialLinkedin size={30}/>
        </div>
      </div>
    </div>
  );
}

export default Footer;
