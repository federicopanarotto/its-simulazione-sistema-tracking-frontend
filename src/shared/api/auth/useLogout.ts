import { useMutation } from "@tanstack/react-query";
import client from "../Client";
import QUERYKEYS from "../QueryKeys";

export const useLogout = () => {
  const postLogout = async (): Promise<void> => {
    await client.post("/api/logout", {});
  }

  return useMutation({
    mutationFn: postLogout,
    mutationKey: [QUERYKEYS.AUTH.LOGOUT]
  });
}