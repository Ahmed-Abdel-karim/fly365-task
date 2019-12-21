import React, { useEffect, useCallback } from "react";
import useAsync from "../useAsync/useAsync";
import { fetchHotelDetails } from "../../api";
import OnLoading from "../onloading/Onloading";

import "./hotel-details.scss";
import Gallery from "../gallery/Gallery";
import Reviews from "../Review/Reviews";

const HotelDetails = ({ hotelId, setNights, nights }) => {
  const { asyncFn: fetchDetails, data, ...otherProps } = useAsync(
    fetchHotelDetails,
    {}
  );
  useEffect(() => {
    fetchDetails(hotelId);
  }, [hotelId]);

  const { name, pictures, reviews } = data;

  const handlechangeNights = useCallback(e => {
    const {
      target: { value }
    } = e;
    if (value) e.target.value = Math.round(value);
    if (value > 365) e.target.value = 365;
    return setNights(e.target.value);
  }, []);

  return (
    <div className="hotel-details">
      <div className="row">
        <div className="col-sm-12">
          <div className="shadow details-container">
            <OnLoading {...otherProps}>
              <div className="py-3 px-4">
                <header>
                  <h2 className="title">{name}</h2>
                  <span>For</span>{" "}
                  <input
                    className="input"
                    name="nights"
                    onChange={handlechangeNights}
                    value={nights}
                    type="number"
                    min={1}
                    max={365}
                    step="1"
                  />{" "}
                  <span>Nights</span>
                </header>
              </div>
              <div className="p-2 p-md-5">
                <Gallery pictures={pictures} />
              </div>
              <div className="p-2 p-md-5">
                <Reviews reviews={reviews} />
              </div>
            </OnLoading>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
