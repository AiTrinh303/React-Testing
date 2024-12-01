import { http, HttpResponse, delay } from "msw";
import { server } from "./mocks/server";

export const simulateDelay = (endpoint: string) => {
    server.use(endpoin, async() => {
        await delay ();
        return HttpResponse.json([]);
    }))
}