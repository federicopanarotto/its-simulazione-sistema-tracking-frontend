import type { User } from "./user/User";

export interface IRequestStat {
  totalDays: number;
  requestCount: number;
  user: User;
}