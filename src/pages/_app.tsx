import * as Toast from "@radix-ui/react-toast";
import { type AppProps } from "next/app";

import { api } from "@src/utils/api";

import { ClerkProvider } from "@clerk/nextjs";
import "@src/styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ClerkProvider {...pageProps}>
      <Toast.Provider swipeDirection="right">
        <Component {...pageProps} />
      </Toast.Provider>
    </ClerkProvider>
  );
}

export default api.withTRPC(MyApp);
