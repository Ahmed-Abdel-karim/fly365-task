import axios from "axios";

const BASE_URL = "http://my-json-server.typicode.com/fly365com/code-challenge";

const fetchHotelsUrl = `${BASE_URL}/hotels`;
const fetchHotelDetailsUrl = `${BASE_URL}/hotelDetails/{id}`;

const fetchHotelsList = () => axios.get(fetchHotelsUrl);
const fetchHotelDetails = hotelId =>
  axios.get(fetchHotelDetailsUrl.replace("{id}", hotelId));

export { fetchHotelsList, fetchHotelDetails };
