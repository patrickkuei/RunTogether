import { StoreProvider } from "../src/redux/store";
import "../src/style/index.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <StoreProvider>
      <Component {...pageProps} />
    </StoreProvider>
  );
}
