import React, { useEffect } from "react";
import useAsync from "../useAsync/useAsync";
import { fetchHotelsList } from "../../api";
import OnLoading from "../onloading/Onloading";
import HotelsList from "../hotelsList/HotelsList";

import "./main.scss";

function Main() {
  const {
    data: hotelsList,
    asyncFn: fetchList,
    ...otherLoadingProps
  } = useAsync(fetchHotelsList, []);
  useEffect(() => {
    fetchList();
  }, []);
  return (
    <main className="main">
      <OnLoading {...otherLoadingProps}>
        <div className="container">
          <div className="pt-5">
            <HotelsList list={hotelsList} />
          </div>
        </div>
      </OnLoading>
    </main>
  );
}

export default Main;
