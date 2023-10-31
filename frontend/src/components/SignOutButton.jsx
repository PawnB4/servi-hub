import axios from "axios";
import { useAuth } from "../context/AuthContext";

function SignOutBtn() {
  const { signOut } = useAuth();
  const cerrarSesion = async () => {
    try {
      signOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      onClick={cerrarSesion}
      className="w-full
    md:hover:border-b-2 md:hover:border-b-black hover:text-black p-1 text-left md:text-center"
    >
      Cerrar sesión
    </button>
  );
}

export default SignOutBtn;
