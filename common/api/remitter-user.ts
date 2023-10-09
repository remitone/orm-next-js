import axios from "../utils/remitterws-api-client";
import { RemitterResponse } from "../../types/remitter";

const getRemitterProfile = async () => {
  const response = await axios.post("/remitterUser/getProfile");

  return response.data.response as RemitterResponse;
};

export { getRemitterProfile };
