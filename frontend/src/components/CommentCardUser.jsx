import  { useState } from "react";

const CommentCardUser = ({ comment, onCommentToggle }) => {
  const [isCommentEnabled, setIsCommentEnabled] = useState(
    comment.comment_enabled === 1
  );

  const handleToggle = () => {
    onCommentToggle(comment);
    setIsCommentEnabled(!isCommentEnabled);
  };

  return (
    <div
      className={` p-4 shadow-md rounded-md mb-4 overflow-y-auto flex flex-col gap-2 ${
        isCommentEnabled ? "commentEnabled" : "commentDisabled"
      }`}
      style={{ maxHeight: "150px" }}
    >
      <p className="text-gray-800 break-words">{comment.comment_text}</p>
      <p className="text-gray-500">Date: {comment.comment_date}</p>
      <div className="flex md:justify-end gap-3 ">
        <span>Comentario {isCommentEnabled ? "aceptado" : "bloqueado"}</span>
        <span>
          <button
            className={`${
              !isCommentEnabled ? "text-complementary" : "text-primary"
            } w-full font-bold`}
            onClick={handleToggle}
          >
            {isCommentEnabled ? "Bloquear" : "Aceptar"}
          </button>
        </span>
      </div>
    </div>
  );
};

export default CommentCardUser;
