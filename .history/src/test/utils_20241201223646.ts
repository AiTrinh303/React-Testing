import { http, HttpResponse, delay } from "msw";
import { server } from "./mocks/server";
import { User } from "@auth0/auth0-react";

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

export const mockAuthState = (authState: AuthState)