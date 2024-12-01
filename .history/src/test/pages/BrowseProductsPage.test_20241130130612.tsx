import { render, screen } from '@testing-library/react'
import BrowseProducts from '../../pages/BrowseProductsPage'
import userEvent from '@testing-library/user-event'


//1. Loading State
//2. Error State
//3. Data Rendered

const products = [
    { id: 1, name: 'Product 1', price: 100 },
    { id: 2, name: 'Product 2', price: 200 },
    { id: 3, name: 'Product 3', price: 300 },
];

const categories = [
    { id: 1, name: 'Category 1' },
    { id: 2, name: 'Category 2' },
    { id: 3, name: 'Category 3' },
];

const handlers = [
    
];

describe('BrowseProductsPage', () => {

   it('should show loading skeleton when fetching categories', () => {
    
   })

   it('should hire the loading skeleton after categories are fetched', () => {
    
   })


})
