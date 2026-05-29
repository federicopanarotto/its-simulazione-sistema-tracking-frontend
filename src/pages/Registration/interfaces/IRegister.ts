export interface IRegister {
  firstName: string,
  lastName: string,
  username: string;
  password: string;
  role: "employee" | "manager";
}