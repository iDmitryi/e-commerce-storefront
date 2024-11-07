// product listing page
import { FC } from 'react'
import { useGetProductsQuery } from './productsApiSlice.ts'
import PlpProductCard from './PlpProductCard.tsx'

const Plp: FC = () => {
  const { data, isError, isLoading } = useGetProductsQuery(20)

  if (isError) {
    return (
      <div>
        <h1>There was an error!!!</h1>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    )
  }

  return (
    <div className="flex text-black flex-col gap-4 p-2 pl-4">
      {data && Array.isArray(data.products) && data.products.length ? (
        data.products.map(product => (
          <PlpProductCard {...product} reviews={product.reviews?.length ?? 0} />
        ))
      ) : (
        <div>No data</div>
      )}
    </div>
  )
}

export default Plp
