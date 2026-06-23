import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

import {
  getUserById,
  updateUser,
  deleteUser,
  addUser,
  CreateUserPayload,
} from "../api/usersApi";

//getuserbyid
export const useUser = (id: number) => {
  return useQuery({
    queryKey: ["users", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};

//adduser

export const useAdduser = () => {
  const querclient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserPayload) => addUser(data),
    onSuccess: () => {
      querclient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

//updateuser

export const useUpdateUser = () => {
  const queryclinet = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: number;
      data: Partial<CreateUserPayload>;
    }) => updateUser(id, data),
    onSuccess: (_data, variables) => {
      queryclinet.invalidateQueries({ queryKey: ["users", variables.id] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["users", id] });
    },
  });
};
