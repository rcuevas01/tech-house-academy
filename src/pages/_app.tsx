import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { MantineProvider } from '@mantine/core';

import { api } from "~/utils/api";

import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <MantineProvider>
    <main className={`font-sans ${inter.variable}`}>
      <Component {...pageProps} />
    </main>
    </MantineProvider>
  );
};

export default api.withTRPC(MyApp);
