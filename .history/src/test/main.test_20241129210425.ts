import { it, expect, describe } from 'vitest';
import {faker} from '@faker-js/faker';
import { db } from './mocks/db';

describe('group', () => {
    it('should', () => {
        const product db.product.create();
        console.log({
            name: faker.commerce.productName(),
            price: faker.commerce.price({min: 1, max: 100}),
        })
    })
});
