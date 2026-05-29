import { createContext, useContext, useState, type ReactNode } from "react";

type PageLoaderContextType = {
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
};

export const PageLoaderContext = createContext<PageLoaderContextType | undefined>(undefined);

export const usePageLoader = () => {
  const context = useContext(PageLoaderContext);
  if (!context) {
    throw new Error("usePageLoader must be used within a PageLoaderProvider");
  }
  return context;
};

function PageLoaderProvider({ children }: { children: ReactNode }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  return (
    <PageLoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {children}
    </PageLoaderContext.Provider>
  );
}

export default PageLoaderProvider;
