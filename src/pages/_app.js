import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { theme } from "../theme";
import { AuthProvider } from "src/context/auth-context";
import { ToastContainer } from "react-toastify";
import { LoadingProvider } from "src/context/LoadingContext";
import { DashboardProvider } from "src/context/DashboardContext";
const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <CacheProvider value={emotionCache}>
      <ToastContainer theme="colored" />
      <Head>
        <title>Хөтөч жолооч</title>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <LoadingProvider>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <CssBaseline />
              <DashboardProvider>{getLayout(<Component {...pageProps} />)}</DashboardProvider>
            </AuthProvider>
          </ThemeProvider>
        </LoadingProvider>
      </LocalizationProvider>
    </CacheProvider>
  );
};

export default App;
