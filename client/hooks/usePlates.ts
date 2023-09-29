import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPlate,
  deletePlate,
  getAllPlates,
  updatePlate,
} from "../api/plates";
import { PlateResponse } from "@/types/types";
import { toast } from "react-toastify";
import { AxiosError } from "axios";

const key = "places";

export const usePlates = () => {
  return useQuery<PlateResponse>([key], getAllPlates);
};

export const useDeletePlate = () => {
  const queryClient = useQueryClient();

  return useMutation(deletePlate, {
    onSuccess: (id) => {
      queryClient.invalidateQueries([key]);
      toast.info("Datos eliminada.");
    },
  });
};

export const useCreatePlate = () => {
  const queryClient = useQueryClient();

  return useMutation(createPlate, {
    onSuccess: (newPlate) => {
      queryClient.invalidateQueries([key]);
      toast.success("Datos agregada.");
    },
    onError(error: AxiosError) {
      const errorMsg = error.response?.data as { message: string };
      toast.error(errorMsg.message);
    },
  });
};

export const useUpdatePlate = () => {
  const queryClient = useQueryClient();

  return useMutation(updatePlate, {
    onSuccess: (newPlate) => {
      queryClient.invalidateQueries([key]);
      toast.success("Datos actualizada.");
    },
    onError(error: AxiosError) {
      const errorMsg = error.response?.data as { message: string };
      toast.error(errorMsg.message);
    },
  });
};