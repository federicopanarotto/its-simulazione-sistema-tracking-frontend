import type { ICategory } from "./ICategory";
import type { User } from "./user/User";

export interface ILeaveRequest {
  id: string;
  date: Date;
  dateStart: Date;
  dateEnd: Date;
  category: ICategory;
  reason: string;
  state: 'pending' | 'approved' | 'rejected';
  user: User;
  dateValidation?: Date | null;
  userValidation?: User | null;
}