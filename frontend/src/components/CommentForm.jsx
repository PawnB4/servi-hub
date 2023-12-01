import { useRef, useState } from "react";
import {createCommentRequest} from '../api/comments.api'

export default function CommentForm({ service_id }) {
  const [commentSend, setCommentSend] = useState(false);
  const commentRef = useRef();
  
  const submitComment = async () => {
    try {
      const comment = {
        service_id,
        comment_text: commentRef.current.value,
      };
      await createCommentRequest(comment);
      setCommentSend(true);
    } catch (error) {
      console.log(error);
    }
  };

  if (commentSend) {
    return (
      <div className="p-4 flex gap-16 items-center justify-around">
        <div>
          <h3>Comentario enviado</h3>
          <p>Pendiente aprobación del proveedor del servicio</p>
        </div>
        <button
          className="bg-darkerAccent p-2 "
          onClick={() => setCommentSend(false)}
        >
          Enviar otro comentario
        </button>
      </div>
    );
  } else {
    return (
      <div className="p-4">
        <textarea
          className="w-full border-b-2 border-neutral  bg-inherit  focus:outline-none focus: focus:border-blue-300 text-white"
          placeholder="Añadir un comentario..."
          ref={commentRef}
          rows={1}
        ></textarea>
        <div className="flex justify-center sm:justify-end mt-2">
          <button
            className="px-4 py-2 text-white w-full sm:w-auto bg-darkerAccent focus:outline-none"
            onClick={submitComment}
          >
            Comentar
          </button>
        </div>
      </div>
    );
  }
}
