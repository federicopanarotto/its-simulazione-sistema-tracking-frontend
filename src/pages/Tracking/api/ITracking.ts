import type { DeliveryStatus } from "../../Deliveries/api/IDelivery";

export type TrackingResponse = {
  pickupDate?: Date;
  deliveryDate?: Date;
  status?: DeliveryStatus;
};
