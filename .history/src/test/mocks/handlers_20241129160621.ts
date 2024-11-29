import {http} from 'msw';


const handlers = [
    http.get('/api/user', (req, res, ctx) => {
        return res(
        ctx.json({
            username: 'admin',
        }),
        );
    }),
    ];