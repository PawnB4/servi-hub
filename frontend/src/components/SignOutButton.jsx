import axios from "axios";

function SignOutBtn() {
//   const router = useRouter();
  const cerrarSesion = async () => {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/signout",null,{
        withCredentials: true
      });
    //   router.refresh();
    //   router.push(`/login`);
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
