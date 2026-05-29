import { createApiFactory } from "../../../shared/api/createApiFactory";
import type { ICustomer } from "./ICustomer";

export const customerApi = createApiFactory<ICustomer>({
  baseEndpoint: "/api/customers",
  queryKey: "CUSTOMER",
});