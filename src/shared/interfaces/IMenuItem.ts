import type { ReactNode } from "react";

export interface IMenuItem {
  role: "all" | "employee" | "manager";
  name: string;
  path: string;
  icon: ReactNode;
}