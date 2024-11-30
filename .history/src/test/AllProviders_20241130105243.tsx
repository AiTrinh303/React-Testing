import { PropsWithChildren } from "react";
import { render } from "react-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductList from "../components/ProductList";

const Allproviders = ({ children }: PropsWithChildren) => {
    const client = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    });
    render(
        <QueryClientProvider client={client}>
            <ProductList />
        </QueryClientProvider>
    )
 }