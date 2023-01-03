import { type AppType } from "next/dist/shared/lib/utils";
import PromptContextProvider from "../context/PromptContextProvider";

import "../styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <PromptContextProvider>
      <Component {...pageProps} />
    </PromptContextProvider>
  );
};

export default MyApp;
