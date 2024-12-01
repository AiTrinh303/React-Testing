import { http, HttpResponse, delay } from "msw";
import { server } from "./mocks/server";
import { useAuth0, User } from "@auth0/auth0-react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import routes from "../routes";
import { render } from "@testing-library/react";

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
        getAccessTokenSilently: vi.fn().mockResolvedValue('a'),
        getAccessTokenWithPopup: vi.fn(),
        getIdTokenClaims: vi.fn(),
        loginWithRedirect: vi.fn(),
        loginWithPopup: vi.fn(),
        logout: vi.fn(),
        handleRedirectCallback: vi.fn()
    })
}

export const navigateTo = (path: string) => {
    const router = createMemoryRouter(routes, {
        initialEntries: ['/']
    })
    render(<RouterProvider router= {router} />)
}    