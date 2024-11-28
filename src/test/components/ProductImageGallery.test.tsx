import { render, screen } from '@testing-library/react'
import ProductImageGallery from '../../components/ProductImageGallery'

describe('ProductImageGallery', () => {
    it('renders no images if given an empty array', () => {
        render(<ProductImageGallery imageUrls={[]} />)
        screen.debug()
        expect(screen.queryByRole('img')).toBeNull()
    })

    it('renders images if given an array of URLs', () => {
        const imagesUrls =[
            'https://example.com/image1.jpg',
            'https://example.com/image2.jpg',
            'https://example.com/image3.jpg'
        ]
        render(<ProductImageGallery imageUrls={imagesUrls} />)
        screen.debug()
        // screen.logTestingPlaygroundURL()
        const images = screen.getAllByRole('img')
        
        expect(images).toHaveLength(imagesUrls.length)

        imagesUrls.forEach((url, index) => {
            expect(images[index]).toHaveAttribute('src', url)            
        })
    })
})