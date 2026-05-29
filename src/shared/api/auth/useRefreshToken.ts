import { useMutation } from '@tanstack/react-query';
import client from '../Client';
import QUERYKEYS from '../QueryKeys';

const useRefreshToken = () => {
  const refreshToken = async () => {
    const response = await client.post('/api/refreshToken', {}, { withCredentials: true });
    return response.data;
  };

  return useMutation<unknown, any, void>({
    mutationFn: refreshToken,
    mutationKey: [QUERYKEYS.AUTH.REFRESH],
  });
};

export default useRefreshToken;
