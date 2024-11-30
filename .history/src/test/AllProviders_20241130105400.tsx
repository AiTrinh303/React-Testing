import { PropsWithChildren } from "react";
import { QueryClient, QueryClientProvider } from "react-query";


const Allproviders = ({ children }: PropsWithChildren) => {
    const client = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false
            }
        }
    });
    return(
        <QueryClientProvider client={client}>
            {children}
        </QueryClientProvider>
    )
 }
export default Allproviders;
