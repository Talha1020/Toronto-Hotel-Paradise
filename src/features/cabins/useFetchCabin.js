import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

function useFetchCabin() {
  const {
    isLoading,
    error,
    data: Cabin,
  } = useQuery({
    queryKey: ["cabinData"],
    queryFn: getCabins,
  });
  return { isLoading, error, Cabin };
}

export default useFetchCabin;
