// src/shared/utils/queryClient.ts
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1, // количество повторных попыток при ошибке
      refetchOnWindowFocus: false,
    },
  },
});
