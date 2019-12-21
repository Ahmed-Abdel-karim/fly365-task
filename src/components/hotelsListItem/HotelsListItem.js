import React, { useCallback, useMemo } from "react";
import "./hotels-list-item.scss";
import { getScoreRating } from "../../utils/score";

const HotelsListItem = ({ data, nights, isSelected, selectHotel }) => {
  const { name, photo, id, pricePerNight, totalReviews, totalScore } = data;
  const handleSelectHotel = useCallback(() => {
    selectHotel(id);
  }, [id, selectHotel]);
  const totalCost = useMemo(() => Number(pricePerNight) * Number(nights), [
    pricePerNight,
    nights
  ]);
  return (
    <li
      className="hotels-list-item col-sm-12 col-md-6 col-lg-4"
      title={name}
    >
      <button
        className={`item-container rounded ${
          isSelected ? "shadow" : "shadow-sm"
        }`}
        onClick={handleSelectHotel}
      >
        <h2 className="item-title">{name}</h2>
        <div className="row">
          <div className="col-5 img-container ">
            <img src={photo} width="100%" alt={`${name} phote`} />
          </div>
          <div className="col-7 info-container ">
            <p>{`$ ${totalCost} for ${nights} night`}</p>
            <p>{`${totalScore} ${getScoreRating(totalScore)}`}</p>
            <p>{`${totalReviews} review`}</p>
          </div>
        </div>
      </button>
    </li>
  );
};

export default HotelsListItem;
