import "./home.css";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // Wrap App with Provider to pass in the Redux Store
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
