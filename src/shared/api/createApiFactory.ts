import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import client from "./Client";

interface ApiConfig {
  baseEndpoint: string;
  queryKey: string;
}

export interface ApiOptions {
  queryParams?: Record<string, string | number>;
  staleTime?: number;
  invalidateQueries?: string[];
}

export const createApiFactory = <T, TPayload = Omit<T, 'id'>>(config: ApiConfig) => {
  const { baseEndpoint, queryKey } = config;

  return {
    queryKey,
    // GET LIST
    useGetList: (options?: ApiOptions) => {
      const extraKeys = options?.invalidateQueries ? [{ extra: options?.invalidateQueries }] : [];
      const queryKeys = options?.queryParams ? [options.queryParams] : [];

      return useQuery({
        queryKey: [queryKey, 'LIST', ...extraKeys, ...queryKeys],
        queryFn: async () => {
          const response = await client.get<T[]>(baseEndpoint, { params: options?.queryParams });
          return response.data;
        },
        staleTime: options?.staleTime || Infinity,
        gcTime: Infinity,
      });
    },

    // GET DETAIL
    useGetDetail: (id?: number | null) => {
      return useQuery({
        queryKey: [queryKey, 'DETAIL', id],
        queryFn: async () => {
          const response = await client.get<T>(`${baseEndpoint}/${id}`);
          return response.data;
        },
        enabled: !!id,
        staleTime: 0,
      });
    },

    // POST (CREATE)
    usePost: (options?: ApiOptions) => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationKey: [queryKey, 'CREATE'],
        mutationFn: async (payload: TPayload) => {
          const response = await client.post(baseEndpoint, payload);
          return response.data.data;
        },
        onSuccess: () => {
          void queryClient.invalidateQueries({ queryKey: [queryKey, 'LIST'] });

          options?.invalidateQueries?.forEach(key => {
            void queryClient.invalidateQueries({ queryKey: [key] });
          });
        }
      });
    },

    // PUT (UPDATE)
    usePut: (options?: ApiOptions) => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationKey: [queryKey, 'UPDATE'],
        mutationFn: async ({ id, payload }: { id: number; payload: Partial<TPayload> }) => {
          const response = await client.put(`${baseEndpoint}/${id}`, payload);
          return response.data;
        },
        onSuccess: (_, variables) => {
          void queryClient.invalidateQueries({ queryKey: [queryKey, 'LIST'] });
          void queryClient.invalidateQueries({ queryKey: [queryKey, 'DETAIL', variables.id] });

          options?.invalidateQueries?.forEach(key => {
            void queryClient.invalidateQueries({ queryKey: [key] });
          });
        }
      });
    },

    // DELETE
    useDelete: (options?: ApiOptions) => {
      const queryClient = useQueryClient();
      return useMutation({
        mutationKey: [queryKey, 'DELETE'],
        mutationFn: async (id: number) => {
          const response = await client.delete(`${baseEndpoint}/${id}`);
          return response.data;
        },
        onSuccess: () => {
          void queryClient.invalidateQueries({ queryKey: [queryKey, 'LIST'] });

          options?.invalidateQueries?.forEach(key => {
            void queryClient.invalidateQueries({ queryKey: [key] });
          });
        }
      });
    }
  };
};