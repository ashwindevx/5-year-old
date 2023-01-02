import { type AppType } from "next/dist/shared/lib/utils";
import ContextProvider from "../context/ContextProvider";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ContextProvider>
      <Component {...pageProps} />
    </ContextProvider>
  );
};

export default MyApp;
