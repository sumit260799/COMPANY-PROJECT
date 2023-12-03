import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./store.js";
import { Provider } from "react-redux";
import { AuthProvider } from "./features/authContext.jsx";
import { UserProvider } from "../mnf_context/userContext.jsx";
import { ProductsProvider } from "../mnf_context/productsContext.jsx";
import { CartProvider } from "../mnf_context/cartContext.jsx";
import { BrandInfoProvider } from "../brand_context/brandInfoContext.jsx";
import { ReactQueryDevtools } from "react-query/devtools";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrandInfoProvider>
        <UserProvider>
          <ProductsProvider>
            <CartProvider>
              <AuthProvider>
                <App />
              </AuthProvider>
            </CartProvider>
          </ProductsProvider>
        </UserProvider>
      </BrandInfoProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </Provider>
);
