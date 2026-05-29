import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import AppRouting from './routing/AppRouting';
import AuthProvider from './context/AuthContext';
import SnackbarProvider from './context/SnackbarContext';
import { AxiosInterceptorProvider } from './interceptors/AxiosInterceptorProvider';
import PageLoaderProvider from './context/PageLoaderContext';
import theme from './theme/theme';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LicenseInfo } from '@mui/x-license';

LicenseInfo.setLicenseKey('e0d9bb8070ce0054c9d9ecb6e82cb58fTz0wLEU9MzI0NzIxNDQwMDAwMDAsUz1wcmVtaXVtLExNPXBlcnBldHVhbCxLVj0y');

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AxiosInterceptorProvider />
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='it'>
          <SnackbarProvider>
            <AuthProvider>
              <PageLoaderProvider>
                <AppRouting />
              </PageLoaderProvider>
            </AuthProvider>
          </SnackbarProvider>
        </LocalizationProvider> 
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
