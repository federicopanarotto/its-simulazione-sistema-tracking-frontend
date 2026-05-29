import { useMutation } from "@tanstack/react-query";
import type { IRegister } from "../../../pages/Registration/interfaces/IRegister";
import type { User } from "../../interfaces/user/User";
import client from "../Client";
import QUERYKEYS from "../QueryKeys";

const useRegistration = () => {
  const registration = async (data: IRegister): Promise<User> => {
    const response = await client.post<User>('/api/register', data);
    return response.data;
  }

  return useMutation<User, any, IRegister>({
    mutationFn: registration,
    mutationKey: [QUERYKEYS.AUTH.REGISTER],
    onError: (error) => {
      console.error('Registration failed', error.response?.data?.message || error.message);
    },
  });
}

export default useRegistration;