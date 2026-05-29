import { useQuery } from "@tanstack/react-query";
import client from "../../../shared/api/Client";

export type DeliveryStatus =
  | "in_deposito"
  | "da_ritirare"
  | "in_consegna"
  | "consegnata"
  | "in_giacenza";

export interface DeliveryStatisticsResponse {
  from: string;
  to: string;
  status: DeliveryStatus;
  numberOfDeliveries: number;
  averageDeliveryTimeHours: number;
}

export type DeliveryStatisticsParams = Partial<{
  from: string;
  to: string;
  status: DeliveryStatus;
}>;

export const useDeliveryStatistics = (params: DeliveryStatisticsParams) => {
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== "")
  );

  return useQuery({
    queryKey: ["STATISTICS", "DELIVERIES", filteredParams],
    queryFn: async () => {
      const response = await client.get<DeliveryStatisticsResponse[]>(
        "/api/statistics/deliveries",
        { params: filteredParams }
      );
      return response.data;
    },
    staleTime: 1000 * 60 * 5,
  });
};
