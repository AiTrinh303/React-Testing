import {factory, primaryKey} from'@mswjs/data';
import { faker } from '@faker-js/faker';

factory({
    product: {
        id: primaryKey(faker.number.int),
        name: faker.commerce.productName,
        price: () => faker.number.int(),
    }
})