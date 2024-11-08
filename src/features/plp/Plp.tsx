// product listing page
import { FC, useEffect, useState } from 'react'
import { useGetProductsQuery } from './productsApiSlice.ts'
import PlpProductCard from './PlpProductCard.tsx'
import { IProduct } from '../../utils/types.ts'
import { PRODUCTS_LIMIT } from '../../utils/constants.ts'

const Plp: FC = () => {
  const [skip, setSkip] = useState(0)
  const { data, isError, isLoading } = useGetProductsQuery({
    limit: PRODUCTS_LIMIT,
    skip
  })
  const [products, setProducts] = useState<IProduct[]>([])

  const handleScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.scrollHeight &&
      !isLoading
    ) {
      setSkip(prevSkip => prevSkip + PRODUCTS_LIMIT)
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isLoading])

  useEffect(() => {
    if (data?.products) {
      setProducts(prevProducts => [...prevProducts, ...data.products])
    }
  }, [data])

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    )
  }

  return (
    <div className="flex text-black flex-col gap-4 px-4 py-1">
      {isLoading && !products.length ? (
        <h1>Loading...</h1>
      ) : products.length ? (
        products.map(product => (
          <PlpProductCard
            key={product.id}
            {...product}
            reviews={product.reviews?.length ?? 0}
          />
        ))
      ) : (
        <div>No data</div>
      )}
    </div>
  )
}

export default Plp
