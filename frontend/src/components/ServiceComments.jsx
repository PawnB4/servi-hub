import { getServiceCommentsRequest } from "../api/comments.api";
import { useEffect, useState } from "react";
import CommentForm from "./CommentForm";
import StarSelector from "./StarSelector";

export default function ServiceComments({ rating, service_id }) {
  const [activeComments, setActiveComments] = useState();
  useEffect(() => {
    getServiceCommentsRequest(service_id)
      .then((response) => {
        const comments = response.data.filter((item) => {
          return item.comment_enabled === 1;
        });
        setActiveComments(comments);
      })
      .catch((err) => console.log(err));
  }, [service_id]);

  if (activeComments) {
    return (
      <div className="flex flex-col gap-8 ">
        <div className="flex gap-12 justify-center items-center flex-wrap">
          <h2 className="text-3xl text-gray-400">
            Calificación: {parseFloat(rating).toFixed(1)}
          </h2>
          <div className="flex flex-col gap-2 justify-center">
            <StarSelector service_id={service_id} />
          </div>
        </div>
        <h2 className="text-3xl text-center sm:text-left text-gray-400">
          {activeComments.length} Comentarios
        </h2>
        <CommentForm service_id={service_id} />
        {activeComments.length > 0 &&
          activeComments.map((comment) => {
            return (
              <div
                key={comment.comment_id}
                className="p-4 shadow-md rounded-md  overflow-y-auto flex flex-col gap-2 bg-neutral"
              >
                <p className="text-gray-800 break-words">
                  {comment.comment_text}
                </p>
                <p className="text-gray-500">Date: {comment.comment_date}</p>
              </div>
            );
          })}
      </div>
    );
  }
}
