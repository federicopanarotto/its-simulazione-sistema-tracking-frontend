import { useEffect } from 'react';
import useRefreshToken from '../shared/api/auth/useRefreshToken';
import { setupAxiosInterceptors } from '../shared/api/Client';

export const AxiosInterceptorProvider = () => {
  const { mutateAsync: refreshToken } = useRefreshToken();

  const refreshTokenWrapper = async () => {
    await refreshToken();
    return;
  };

  useEffect(() => {
    setupAxiosInterceptors(refreshTokenWrapper);
  }, [refreshToken]);

  return null;
};