import { useMutation, useQueryClient } from '@tanstack/react-query';
import client from '../Client';
import type { ILogin } from '../../../pages/Login/interfaces/ILogin';
import type { User } from '../../interfaces/user/User';
import QUERYKEYS from '../QueryKeys';

const useLogin = () => {
  const queryClient = useQueryClient();

  const login = async (credentials: ILogin): Promise<User> => {
    queryClient.clear();
    const response = await client.post<User>('/api/login', credentials);
    return response.data;
  }

  return useMutation<User, any, ILogin>({
    mutationFn: login,
    mutationKey: [QUERYKEYS.AUTH.LOGIN],
    onError: (error) => {
      console.error('Login failed', error.response?.data?.message || error.message);
    },
  });
};

export default useLogin;