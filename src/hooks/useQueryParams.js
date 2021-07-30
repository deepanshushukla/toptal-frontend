import { useLocation } from "react-router-dom";
import qs from "query-string";

const useQueryParams = () => {
  const search = useLocation().search;
  return qs.parse(search) || {};
};
export default useQueryParams;
