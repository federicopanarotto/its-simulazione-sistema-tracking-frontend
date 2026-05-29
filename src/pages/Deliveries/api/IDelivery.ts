import type { ICustomer } from "../../Customers/api/ICustomer";

export type DeliveryStatus = 'in_deposito' | 'in_consegna' | 'consegnata' | 'in_giacenza' | 'da_ritirare';

export interface IDelivery {
  id: string;
  customer: ICustomer;
  pickupDate: Date;
  deliveryDate: Date;
  deliveryKey: string;
  status: DeliveryStatus;
}