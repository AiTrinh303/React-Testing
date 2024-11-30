const Allproviders = ({ children }) => {
    return (
        <AuthProvider>
        <UserProvider>
            <ThemeProvider>
            {children}
            </ThemeProvider>
        </UserProvider>
        </AuthProvider>
    );
    }