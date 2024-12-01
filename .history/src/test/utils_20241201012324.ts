import { http, HttpResponse } from "msw";
import { server } from "./mocks/server";

const simulateDelay = (endpoint: string, delay: number) => {
    server.use(http.get('/categories', async() => {
        await delay ();
        return HttpResponse.json([]);
    }))
)