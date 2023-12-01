import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import CommentCardUser from "./CommentCardUser";
import Contracts from "./Contracts";
import ServiceConfig from "./ServiceConfig";
import {
  getServiceCommentsRequest,
  updateCommentRequest,
} from "../api/comments.api";

function ServiceEditDialog({ service, onClose }) {
  const dialogRef = useRef(null);
  const [comments, setComments] = useState(undefined);
  const [activeTab, setActiveTab] = useState(1);
  let commentsConfig = [];

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  useEffect(() => {
    getServiceCommentsRequest(service.service_id)
      .then((response) => setComments(response.data))
      .catch((err) => console.log(err));
  }, [service.service_id]);

  useEffect(() => {
    let isMounted = true;
    const currentDialogRef = dialogRef.current;
    if (currentDialogRef) {
      currentDialogRef.showModal();
    }
    return () => {
      isMounted = false;

      if (isMounted && currentDialogRef) {
        currentDialogRef.close();
      }
    };
  }, []);

  const handleKey = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  const handleCommentChange = (item) => {
    const hasComment = commentsConfig.some(
      (comment) => comment.comment_id === item.comment_id
    );
    commentsConfig = hasComment
      ? commentsConfig.filter(
          (comment) => comment.comment_id !== item.comment_id
        )
      : [
          ...commentsConfig,
          {
            comment_id: item.comment_id,
            comment_enabled: item.comment_enabled === 1 ? 0 : 1,
          },
        ];
  };

  const changeCommentConfiguration = () => {
    let commentsToEnable = [];
    let commentsToDisable = [];
    commentsConfig.forEach((comment) => {
      comment.comment_enabled === 1
        ? commentsToEnable.push(comment.comment_id)
        : commentsToDisable.push(comment.comment_id);
    });
    let flag = false;
    if (commentsToEnable.length > 0) {
      saveCommentsEnabled(commentsToEnable);
      flag = true;
    }
    if (commentsToDisable.length > 0) {
      saveCommentsDisabled(commentsToDisable);
      flag = true;
    }
    if (flag) {
      getServiceCommentsRequest(service.service_id)
      .then((response) => setComments(response.data))
      .catch((err) => console.log(err));
      alert("Cambios aplicados con éxito");
    }
  };

  const saveCommentsEnabled = async (comments_id) => {
    const commentData = {
      new_state: 1,
      id_list: comments_id,
    };
    try {
      await updateCommentRequest(commentData);
    } catch (error) {
      console.log(error);
    }
  };

  const saveCommentsDisabled = async (comments_id) => {
    const commentData = {
      new_state: 0,
      id_list: comments_id,
    };
    try {
      await updateCommentRequest(commentData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <dialog
        ref={dialogRef}
        onKeyDown={handleKey}
        className="fixed top-1/2 left-1/2 -translate-x-1/2 
        rounded-sm -translate-y-1/2 bg-white z-10 shadow-xl w-full md:w-9/12 text-fontcolor
        p-4 h-[800px] flex flex-col gap-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <h1 className="text-3xl text-center md:text-left md:col-start-2 md:row-start-1 md:col-span-4 ">
            {service.service_name}
          </h1>
          {service.is_active === 1 ? (
            <span className="text-2xl md:col-start-9 md:col-span-4 md:row-start-1 flex gap-3 justify-around md:justify-center">
              <h3 className=" text-green-400 font-light ">
                Servicio disponible
              </h3>
              <a
                href={`/services/${service.service_id}`}
                target="blank"
                className="text-fontcolor underline"
              >
                Ver
              </a>
            </span>
          ) : (
            <h3 className="text-2xl md:col-start-10 md:col-span-3 md:row-start-1 text-red-400 font-light">
              Servicio no disponible
            </h3>
          )}
          <div className="md:row-start-2 md:col-start-2 md:col-span-10">
            <hr className="bg-black h-0.5 border-none" />
          </div>
          <div className="md:row-start-3 md:col-start-4 md:col-span-6 flex justify-around">
            <button
              className="block md:hidden"
              onClick={() => {
                if (activeTab < 4 && activeTab > 1) {
                  setActiveTab((prevTab) => {
                    const newTab = prevTab - 1;
                    handleTabClick(newTab);
                    return newTab;
                  });
                }
              }}
            >
              <FaArrowLeftLong />
            </button>
            <div className="block md:flex md:justify-around md:gap-12 ">
              <div>
                <button
                  onClick={() => handleTabClick(1)}
                  className={` md:block ${
                    activeTab === 1
                      ? "block border-b-2 pb-1 border-black"
                      : "hidden"
                  }`}
                >
                  Contrataciones
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleTabClick(2)}
                  className={` md:block ${
                    activeTab === 2
                      ? "block border-b-2 pb-1 border-black"
                      : "hidden"
                  }`}
                >
                  Comentarios
                </button>
              </div>
              <div>
                <button
                  onClick={() => handleTabClick(3)}
                  className={`md:block ${
                    activeTab === 3
                      ? "block border-b-2 pb-1 border-black"
                      : "hidden"
                  }`}
                >
                  Configuración adicional
                </button>
              </div>
            </div>
            <button
              className="block md:hidden"
              onClick={() => {
                if (activeTab > 0 && activeTab < 3) {
                  setActiveTab((prevTab) => {
                    const newTab = 1 + prevTab;
                    handleTabClick(newTab);
                    return newTab;
                  });
                }
              }}
            >
              <FaArrowRightLong />
            </button>
          </div>
        </div>

        {/* Contrataciones tab */}
        {activeTab === 1 && <Contracts service={service} />}

        {/* Comentarios tab */}
        {activeTab === 2 && (
          <div className="flex flex-col gap-4 overflow-y-scroll  ">
            <h3 className="text-2xl text-center md:text-left text-gray-700 font-light px-12">
              Habilitar/deshabilitar comentarios
            </h3>
            <div className="p-4  ">
              {!comments ? (
                <div className="flex justify-center items-center h-full">
                  <div className="borders z-50 text-white"></div>
                </div>
              ) : comments.length > 0 ? (
                comments.map((comment) => {
                  return (
                    <CommentCardUser
                      comment={comment}
                      key={comment.comment_id}
                      onCommentToggle={handleCommentChange}
                    />
                  );
                })
              ) : (
                <div className="text-center">
                  <h2 className="text-fontcolor text-xl">No hay comentarios</h2>
                </div>
              )}
            </div>
            <div className="">
              {comments.length > 0 && (
                <button
                  className="text-white bg-complementary p-2 rounded-md w-full"
                  onClick={changeCommentConfiguration}
                >
                  Aplicar cambios
                </button>
              )}
            </div>
          </div>
        )}

        {/* Config tab */}
        {activeTab === 3 && (
          <div className="flex flex-col gap-4 overflow-y-scroll">
            <ServiceConfig service={service} />
          </div>
        )}

        <div className="mt-auto md:self-end">
          <button
            className="text-white bg-accent p-2 rounded-md w-full md:w-[200px]"
            onClick={() => onClose()}
          >
            Salir
          </button>
        </div>
      </dialog>
    </div>
  );
}

export default ServiceEditDialog;
