import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";


const AllProviders = ({ children }: PropsWithChildren) => {
    const client = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    });
    return(
        <QueryClientProvider client={client}>
            <p>{children}</p>
        </QueryClientProvider>
    )
 }
export default AllProviders;
