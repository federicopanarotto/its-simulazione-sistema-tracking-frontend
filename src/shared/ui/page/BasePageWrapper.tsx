import { Box } from "@mui/material";
import { useEffect, type ReactNode } from "react";
import { usePageLoader } from "../../../context/PageLoaderContext";

interface BasePageWrapperProps {
  children: ReactNode;
  isLoading?: boolean;
  topBar?: ReactNode;
}

function BasePageWrapper({ children, isLoading, topBar }: BasePageWrapperProps) {
  const {setIsLoading} = usePageLoader();

  useEffect(() => {
    if (typeof(isLoading) === "boolean") {
      setIsLoading(isLoading);
    }
    return () => {
      setIsLoading(false)
    }
  }, [isLoading])

  return (
    <Box>
      {!isLoading && (
        <>
          {topBar}
          <Box sx={{p: 2}}>
            {children}
          </Box>
        </>
      )}
    </Box>
  )
}

export default BasePageWrapper;
