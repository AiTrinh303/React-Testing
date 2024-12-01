import { http, HttpResponse, delay } from "msw";
import { server } from "./mocks/server";

const simulateDelay = (endpoint: string) => {
    server.use(http.get('/categories', async() => {
        await delay ();
        return HttpResponse.json([]);
    }))
)