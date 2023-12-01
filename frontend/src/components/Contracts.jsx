import { useEffect, useState } from "react";
import {
  getAllContractsRequest,
  deleteFinishedContractRequest,
  deleteAllFinishedContractsRequest,
  updateContractRequest,
} from "../api/contracts.api";
import { FaTrashAlt } from "react-icons/fa";

function Contracts({ service }) {
  const [contracts, setContracts] = useState(undefined);
  const [updatedContracts, setUpdatedContracts] = useState([]);

  useEffect(() => {
    getAllContractsRequest(service.service_id)
      .then((response) => {
        setContracts(response.data);
        setUpdatedContracts(response.data);
      })
      .catch((err) => console.log(err));
  }, [service.service_id]);

  const handleStatusChange = async (contractId, newStatus) => {
    const data = { contract_id: contractId, contract_status: newStatus };
    await updateContractRequest(data);
    const updatedList = updatedContracts.map((contract) =>
      contract.contract_id === contractId
        ? { ...contract, contract_status: newStatus }
        : contract
    );
    setUpdatedContracts(updatedList);
  };

  const deleteContract = async (id) => {
    await deleteFinishedContractRequest(id);
    getAllContractsRequest(service.service_id)
      .then((response) => {
        setContracts(response.data);
        setUpdatedContracts(response.data);
      })
      .catch((err) => console.log(err));
  };

  const deleteAllContracts = async () => {
    await deleteAllFinishedContractsRequest(service.service_id);
    getAllContractsRequest(service.service_id)
      .then((response) => {
        setContracts(response.data);
        setUpdatedContracts(response.data);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-4 overflow-y-scroll md:px-6"
      style={{ gridAutoFlow: "dense" }}
    >
      <h1 className="hidden md:block text-center text-2xl">Solicitado</h1>
      <h1 className="hidden md:block text-center text-2xl">Aceptado</h1>
      <div className="hidden md:flex flex-col justify-center items-center">
        <h1 className="text-2xl">Finalizado</h1>
        {updatedContracts.some(
          (contract) => contract.contract_status === "Finalizado"
        ) && (  
          <button
            onClick={deleteAllContracts}
            className="self-end text-primary hover:text-darkerPrimary"
          >
            Eliminar todos
          </button>
        )}
      </div>
      {updatedContracts.length === 0 && (
        <h1 className="md:col-span-3 text-center py-14">
          No tienes solicitudes pendientes
        </h1>
      )}
      {updatedContracts.map((contract) => (
        <div
          key={contract.contract_id}
          className={`p-2 flex flex-col gap-2 justify-center shadow ${
            contract.contract_status === "Solicitado"
              ? "bg-neutral md:col-start-1"
              : contract.contract_status === "Aceptado"
              ? "bg-secondary md:col-start-2"
              : "bg-green-300 md:col-start-3"
          }`}
        >
          <h1>Correo: {contract.contract_mail}</h1>
          <h1>Telefono: {contract.contract_phone}</h1>
          <h1>Mensaje: {contract.contract_message}</h1>
          <h1>Fecha de solicitud: {contract.contract_date.substring(0, 10)}</h1>
          {contract.contract_status === "Solicitado" && (
            <div className="flex justify-evenly gap-5">
              <button
                className="bg-complementary p-2 mt-auto text-white font-bold w-full"
                onClick={() =>
                  handleStatusChange(contract.contract_id, "Aceptado")
                }
              >
                Aceptar
              </button>
              <button
                className="bg-primary p-2 mt-auto text-white font-bold w-full"
                onClick={() =>
                  handleStatusChange(contract.contract_id, "Finalizado")
                }
              >
                Rechazar
              </button>
            </div>
          )}
          {contract.contract_status === "Aceptado" && (
            <button
              className="bg-neutral p-2 mt-auto"
              onClick={() =>
                handleStatusChange(contract.contract_id, "Finalizado")
              }
            >
              Finalizar contrato
            </button>
          )}
          {contract.contract_status === "Finalizado" && (
            <div className="flex justify-end">
              <button onClick={() => deleteContract(contract.contract_id)}>
                <FaTrashAlt size={20} />
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Contracts;
