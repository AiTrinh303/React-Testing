import { PropsWithChildren } from "react";

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