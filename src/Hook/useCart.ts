import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getRemoteCart, updateRemoteCart } from "../api/cartApi";

export const useRemoteCart = (userId: number) => {
  return useQuery({
    queryKey: ["cart", userId],
    queryFn: () => getRemoteCart(userId),
    enabled: !!userId,
  });
};

export const useUpdateRemoteCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cartId,
      products,
    }: {
      cartId: number;
      products: { productId: number; quantity: number }[];
    }) => updateRemoteCart(cartId, products),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};
