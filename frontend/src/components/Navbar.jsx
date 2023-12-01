import { useState, useEffect } from "react";
import { BiSolidUserCircle } from "react-icons/bi";
import LogoServiHub from "./LogoServiHub";
import HamburgerButton from "./HamburgerButton";
import SignOutBtn from "./SignOutButton";
import {useAuth} from "../context/AuthContext";

function Navbar() {
  const {isAuth} = useAuth();
  const [logged, setLogged] = useState(!!isAuth);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setLogged(!!isAuth);
  }, [isAuth]);

  const displayItems = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="grid grid-cols-1 lg:grid-cols-2 py-4 px-10 border-b-2  mx-auto min-w-full  gap-3 bg-secondary">
      <div className="flex justify-between">
        <div className="flex items-center">
          <a href="/">
            <LogoServiHub />
          </a>
        </div>
        <div className="lg:hidden flex">
          <HamburgerButton
            displayItems={displayItems}
            className="text-white p-2 "
          ></HamburgerButton>
        </div>
      </div>
      <ul
        className={`flex flex-col md:flex-row md:justify-around ${
          isOpen ? "block" : "hidden"
        } lg:flex lg:flex-row gap-2 lg:gap-8 lg:justify-end lg:items-center `}
      >
        <div className="md:text-center">
          <a
            href="/services"
            className="hover:border-b-2 hover:border-b-black hover:text-black p-1"
          >
            Todos los servicios
          </a>
        </div>
        <div className="md:text-center">
          <a
            href="/#"
            className="hover:border-b-2 hover:border-b-black hover:text-black p-1"
          >
            Preguntas Frecuentes
          </a>
        </div>
        {logged ? (
          <>
            <div>
              <SignOutBtn />
            </div>
            <div className="md:text-center">
              <a className="hover:text-black" href="/profile">
                <BiSolidUserCircle size={30} />
              </a>
            </div>
          </>
        ) : (
          <>
            <div className="md:text-center">
              <a
                className="hover:border-b-2 hover:border-b-black hover:text-black p-1"
                href="/signup"
              >
                Regístrate
              </a>
            </div>
            <div className="md:text-center">
              <a
                className="hover:border-b-2 hover:border-b-black hover:text-black p-1"
                href="/login"
              >
                Inicia sesión
              </a>
            </div>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
