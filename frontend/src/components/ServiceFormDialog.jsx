import { useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import ServiceForm from "./ServiceForm";

function ServiceFormDialog({ user }) {
  const [createdService, setCreatedService] = useState(false);

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

  const serviceCreated = () => {
    setCreatedService(true);
  };

  return (
    <>
      <div className="w-full h-full flex items-end py-2">
        <div>
          <button
            type="button"
            className="p-3  bg-primary  text-xl hover:bg-primary-dark text-white  font-bold  transition-transform transform hover:scale-[1.01]
           shadow rounded-sm"
            onClick={openDialog}
          >
            Crear un nuevo servicio
          </button>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white z-10 shadow-lg"
      >
        {createdService ? (
          <div className="w-[375px] h-[225px] flex flex-col justify-center items-center gap-5">
            <h1 className="text-3xl">Servicio creado con éxito</h1>
            <div></div>
            <div className="px-5 w-full">
              <button
                type="button"
                className="bg-complementary w-full text-neutral p-2 rounded-md text-xl font-bold tracking-wide hover:bg-opacity-95"
                onClick={() => {
                  window.location.reload();
                }}
              >
                Aceptar
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="text-right">
              <button
                className="hover:text-slate-800 p-2"
                onClick={closeDialog}
              >
                <AiFillCloseCircle size={25} />
              </button>
            </div>
            <ServiceForm
              user_id={user.user_id}
              onServiceCreation={serviceCreated}
            />
          </>
        )}
      </dialog>
    </>
  );
}

export default ServiceFormDialog;
