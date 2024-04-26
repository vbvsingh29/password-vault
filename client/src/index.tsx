import { createRoot } from "react-dom/client";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistor, store } from "./store/store";

const root = createRoot(document.getElementById("app") as HTMLElement);
const queryClient = new QueryClient();

root.render(
  <PersistGate loading={null} persistor={persistor}>
    <Provider store={store}>
      <ChakraProvider>
        <QueryClientProvider client={queryClient}>
          <App />
        </QueryClientProvider>
      </ChakraProvider>
    </Provider>
  </PersistGate>
);
