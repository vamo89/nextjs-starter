import { createGlobalStyle, ThemeProvider } from "styled-components";
import type { AppProps } from "next/app";
import { ThemeType } from "../common/types/theme";

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const theme: ThemeType = {
  colors: {
    primary: "#333",
  },
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}
