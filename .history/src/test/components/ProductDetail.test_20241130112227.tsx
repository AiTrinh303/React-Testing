import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import ProductDetail from '../../components/ProductDetail'
import { server } from '../mocks/server'
// import { products } from '../mocks/data'
import { http, HttpResponse, delay } from 'msw'
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

        // render(<ProductDetail productId={1} />)
        // const productName = await screen.findByText(new RegExp(products[0].name))
        // expect(productName).toBeInTheDocument()

        // const productPrice = await screen.findByText(new RegExp(products[0].price.toString()))
        // expect(productPrice).toBeInTheDocument()

        render(<ProductDetail productId={productId}, {w} />)

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

    it('should render loading indicator when data is fetching', async() => {
        server.use(
            http.get('/products/1', async() =>{
                await delay();
                return HttpResponse.json(db.product.findFirst({where: {id: {equals: 1}}}))
            })
        )

        render(<ProductDetail productId={1} />)
        const loading = await screen.findByText(/loading/i)
        expect(loading).toBeInTheDocument()        
    })

    it('should remove loading indicator after data is fetched ', async() => {        
        render(<ProductDetail productId={1} />)
        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    })

    it('should remove loading indicator after data is fail fetching', async() => {
        server.use(http.get('/products/1', () => HttpResponse.error()))
        render(<ProductDetail productId={1} />)
        await waitForElementToBeRemoved(() => screen.queryByText(/loading/i))
    })
})