import { createApiFactory } from "../../../shared/api/createApiFactory";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import client from "../../../shared/api/Client";
import type { IDelivery, DeliveryStatus } from "./IDelivery";
import { useSnackbar } from "../../../context/SnackbarContext";
import type { ApiError } from "../../../shared/api/ApiError";

export const deliveryApi = {
  ...createApiFactory<IDelivery>({
    baseEndpoint: "/api/deliveries",
    queryKey: "DELIVERY",
  }),
  usePutStatus: (id: string) => {
    const queryClient = useQueryClient();
    const { showSnackbar } = useSnackbar();
    return useMutation({
      mutationKey: ["DELIVERY", "PUT_STATUS", id],
      mutationFn: async (status: DeliveryStatus) => {
        const response = await client.put(`/api/deliveries/${id}/status`, { status });
        return response.data;
      },
      onSuccess: () => {
        void queryClient.invalidateQueries({ queryKey: ["DELIVERY", "LIST"] });
        void queryClient.invalidateQueries({ queryKey: ["DELIVERY", "DETAIL", id] });
      },
      onError: (error: ApiError) => {
        const errorMessage = error?.response?.data?.message;
        showSnackbar(errorMessage, "error");
      }
    });
  },
};