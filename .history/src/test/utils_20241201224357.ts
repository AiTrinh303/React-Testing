import { http, HttpResponse, delay } from "msw";
import { server } from "./mocks/server";
import { AppState, GetTokenWithPopupOptions, IdToken, LogoutOptions, PopupConfigOptions, PopupLoginOptions, RedirectLoginOptions, useAuth0, User } from "@auth0/auth0-react";
import { RedirectLoginResult } from "@auth0/auth0-spa-js";

export const simulateDelay = (endpoint: string) => {
    server.use(http.get(endpoint, async() => {
        await delay ();
        return HttpResponse.json([]);
    }))
}

export const simulateError = (endpoint: string) => {
    server.use(http.get(endpoint, () => HttpResponse.error()));
}

type AuthState = {
    isAuthenticated : boolean;
    isLoading: boolean;
    user: User | undefined;
}

export const mockAuthState = (authState: AuthState) => {
    vi.mocked(useAuth0).mockReturnValue({
        ...authState,
        getAccessTokenSilently: vi.fn(),
        getAccessTokenWithPopup: vi.fn(),
        getIdTokenClaims: vi.fn(),
        loginWithRedirect: function (options?: RedirectLoginOptions<AppState>): Promise<void> {
            throw new Error("Function not implemented.");
        },
        loginWithPopup: function (options?: PopupLoginOptions, config?: PopupConfigOptions): Promise<void> {
            throw new Error("Function not implemented.");
        },
        logout: function (options?: LogoutOptions): Promise<void> {
            throw new Error("Function not implemented.");
        },
        handleRedirectCallback: function (url?: string): Promise<RedirectLoginResult> {
            throw new Error("Function not implemented.");
        }
    })