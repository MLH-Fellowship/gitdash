import { ChakraProvider } from "@chakra-ui/react";
import { Provider } from "next-auth/client";
import type { AppProps } from "next/app";
import Theme from "../theme";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider theme={Theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}
export default MyApp;
