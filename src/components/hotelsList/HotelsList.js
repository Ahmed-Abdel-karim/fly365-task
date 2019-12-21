import React, { useState } from "react";
import "./hotels-list.scss";
import HotelsListItem from "../hotelsListItem/HotelsListItem";
import HotelDetails from "../hotelDetails/HotelDetails";

const HotelsList = props => {
  const [nights, setNights] = useState(1);
  const [hotelId, selectHotel] = useState();
  return (
    <>
      <ul className="row hotels-list">
        {props.list.map(hotel => (
          <HotelsListItem
            data={hotel}
            key={hotel.id}
            nights={nights}
            isSelected={hotelId === hotel.id}
            selectHotel={selectHotel}
          />
        ))}
      </ul>
      <div className="py-2">
        {hotelId && (
          <HotelDetails
            hotelId={hotelId}
            setNights={setNights}
            nights={nights}
          />
        )}
      </div>
    </>
  );
};
export default HotelsList;
