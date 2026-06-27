import { useQuery } from "@tanstack/react-query";
import { getProducts, getProductById } from "../api/api";

export const Useproducts = () => {
  return useQuery({
    queryKey: ["product"],
    queryFn: getProducts,
  });
};

export const Useproductid = (id: number | string) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id,
  });
};
