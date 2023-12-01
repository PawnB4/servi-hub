import {createRatingRequest} from '../api/ratings.api'
import { useState } from "react";

const StarSelector = ({ service_id }) => {
  const [rating, setRating] = useState(0);
  const [ratingSend, setRatingSend] = useState(false);

  const handleStarClick = (value) => {
    setRating(value === rating ? 0 : value);
  };

  const handleRate = async () => {
    try {
      const data = {
        rating,
        service_id,
      };
      await createRatingRequest(data)
      setRatingSend(true);
    } catch (error) {
      console.log(error);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const filledStar = i <= rating;

      stars.push(
        <span
          key={i}
          className={`cursor-pointer text-2xl ${
            filledStar ? "text-yellow-500" : "text-gray-300"
          }`}
          onClick={() => handleStarClick(i)}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  if (ratingSend) {
    return <h1>Calificación enviada</h1>;
  } else {
    return (
      <>
        <div className="flex items-center space-x-1">{renderStars()}</div>
        <button onClick={handleRate}>Calificar</button>
      </>
    );
  }
};

export default StarSelector;
