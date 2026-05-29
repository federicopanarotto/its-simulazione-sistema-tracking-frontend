import { useMutation } from "@tanstack/react-query";
import client from "../../../shared/api/Client";
import type { TrackingResponse } from "./ITracking";
import { useSnackbar } from "../../../context/SnackbarContext";
import type { ApiError } from "../../../shared/api/ApiError";

export type TrackingRequest = {
  deliveryKey: string;
  pickupDate: string;
};

export const trackingApi = {
  useTrackingSearch: () => {
    const { showSnackbar } = useSnackbar();
    return useMutation({
      mutationKey: ["TRACKING", "SEARCH"],
      mutationFn: async (payload: TrackingRequest) => {
        const response = await client.post<TrackingResponse>(
          "/api/tracking",
          payload
        );
        return response.data;
      },
      onError: (error: ApiError) => {
        const errorMessage =
          error?.response?.data?.message || "Errore nella ricerca del tracking";
        showSnackbar(errorMessage, "error");
      },
    });
  },
};
