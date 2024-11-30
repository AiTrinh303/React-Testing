import { render, screen } from '@testing-library/react'
import ProductDetail from '../../components/ProductDetail'
import { server } from '../mocks/server'
// import { products } from '../mocks/data'
import { http, HttpResponse } from 'msw'
import { db } from '../mocks/db'

describe('ProductDetail', () => {
    let productId: number;

    beforeAll(() => {
        const product = db.product.create();
        productId = product.id;
    })

    afterAll(() => {
        db.product.delete({where: {id: {equals: productId}}});
    })

    it('should render the products details', async() => {
        const product = db.product.findFirst({where: {id: {equals: productId}}});

        render(<ProductDetail productId={productId} />)

        render(<ProductDetail productId={productId} />)

        const productName = await screen.findByText(new RegExp(product!.name))
        expect(productName).toBeInTheDocument()

        const productPrice = await screen.findByText(new RegExp(product!.price.toString()))
        expect(productPrice).toBeInTheDocument()

        // screen.debug()
    })

    it('should render error when product is not found', async() => {
        server.use(
            http.get('/products/1', () => HttpResponse.json(null))
        )
        render(<ProductDetail productId={1} />)

        const error = await screen.findByText(/not found./i)
        expect(error).toBeInTheDocument()

        screen.debug()
    })

    it('should render error for invalid productID', () => {
        render(<ProductDetail productId={0} />)
        const error = screen.getByText(/invalid productid/i)
        expect(error).toBeInTheDocument()
    })


    it('should render an error if data fetching fails', async() => {
        server.use(
            http.get('/products/1', () => HttpResponse.error())
        )
        render(<ProductDetail productId={1} />)
        const errorFetchMessage =await screen.findByText(/error/i)
        expect(errorFetchMessage).toBeInTheDocument()       
    })
})