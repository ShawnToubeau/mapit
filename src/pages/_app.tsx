import * as Toast from "@radix-ui/react-toast";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";

import { api } from "@src/utils/api";

import "@src/styles/global.scss";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <Toast.Provider swipeDirection="right">
        <Component {...pageProps} />
      </Toast.Provider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
