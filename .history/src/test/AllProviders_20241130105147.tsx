const Allproviders = ({ children }) => {
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