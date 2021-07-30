import fetchReq from "../utils/requestUtil";
import { PINCODE_URL } from "constants/urls";

export const getAddressFromPinCode = (pincode) => {
  return fetchReq.get(`${PINCODE_URL}/${pincode}`);
};
