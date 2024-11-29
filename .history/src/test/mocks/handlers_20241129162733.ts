import {http, HttpResponse} from 'msw';


export const handlers = [
    http.get('/categories', () => {
        return HttpResponse.json([
            {id: 1, name: 'Category 1'},
            {id: 2, name: 'Category 2'},
            {id: 3, name: 'Category 3'},
        ])
    }),

    
];