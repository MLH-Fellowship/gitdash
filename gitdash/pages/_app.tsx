import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import Theme from "../theme";
import Navbar from "../components/navbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider theme={Theme}>
        <Navbar />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}
export default MyApp;
