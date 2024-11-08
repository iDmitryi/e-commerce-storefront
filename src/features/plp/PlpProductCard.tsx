import { FC, Suspense } from 'react'
import { cn } from '../../utils/cn.ts'
import { StarIcon } from '@heroicons/react/16/solid'
import { StarIcon as StartIconFav } from '@heroicons/react/24/outline'
import { formatPrice } from '../../utils/formatPrice.ts'
import { IMAGE_PLACEHOLDER, PRODUCT_STARS } from '../../utils/constants.ts'
import { IProduct, Review } from '../../utils/types.ts'
import { useAppDispatch } from '../../app/hooks.ts'
import { addToCart } from '../cart/cartSlice.ts'
import { addToFavourites } from '../favourites/favouriteSlice.ts'

interface IPdpProductCardProps {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  images: string[]
  reviews: Review[]
  thumbnail: string

  onSelectProduct: (product: Partial<IProduct>) => void
}

const PlpProductCard: FC<IPdpProductCardProps> = props => {
  const {
    id = null,
    title = '',
    discountPercentage = null,
    description = '',
    thumbnail = '',
    price = 0,
    reviews = []
  } = props

  const rating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length

  const dispatch = useAppDispatch()

  return (
    <div
      key={id}
      className="group border border-gray-200 hover:border-gray-600 relative sm:p-6 flex xl:flex-row lg:flex-col bg-gray-200 rounded-sm "
    >
      {/* Product Image */}
      <div className="mr-4 mb-6 shrink-0 self-center overflow-hidden rounded-full bg-gray-50 group-hover:opacity-75 h-24 w-24">
        <Suspense key={thumbnail} fallback={<div>Loading...</div>}>
          <img
            onError={e => {
              e.currentTarget.src = IMAGE_PLACEHOLDER
            }}
            alt="product"
            src={thumbnail}
            className="h-full w-full object-cover object-center"
          />
        </Suspense>
      </div>
      {/* Product Details */}
      <div className="w-full flex flex-col items-start">
        <button
          type="button"
          onClick={() => {
            const { onSelectProduct, ...rest } = props
            onSelectProduct(rest)
          }}
          className="text-start"
        >
          <h4 className="text-lg font-bold">{title}</h4>
        </button>

        <p className="mt-1">{description}</p>
        <div className="flex items-center xl:col-span-1">
          <div className="flex items-center">
            {Array.from(Array(PRODUCT_STARS).keys()).map(r => (
              <StarIcon
                key={r}
                aria-hidden="true"
                className={cn(
                  rating > r ? 'text-yellow-400' : 'text-gray-400',
                  'h-6 w-6 shrink-0'
                )}
              />
            ))}
          </div>
          <span className="sr-only">
            {rating} out of {PRODUCT_STARS} stars
          </span>
        </div>
      </div>
      {/* Product Price */}
      <div className="flex flex-col justify-between items-end w-[40%]">
        <div className="flex gap-2">
          <p
            className={cn(
              'text-base font-medium text-gray-900',
              discountPercentage && 'line-through'
            )}
          >
            {formatPrice(price)}
          </p>
          {discountPercentage ? (
            <p className="font-bold text-gray-900">
              {formatPrice(price - (price * discountPercentage) / 100)}
            </p>
          ) : null}
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              dispatch(addToCart({ ...props, quantity: 1 }))
            }}
            className="bg-yellow-400 text-black px-4 py-1 rounded-full truncate hover:bg-yellow-500"
          >
            Add to cart
          </button>
          <button
            type="button"
            onClick={() => {
              dispatch(addToFavourites(props))
            }}
            aria-label="Add to favorites"
          >
            <StartIconFav
              aria-hidden="true"
              className={cn(
                'text-gray-400',
                'w-8 h-8 shrink-0 hover:text-yellow-400'
              )}
            />
          </button>
        </div>
      </div>
    </div>
  )
}

export default PlpProductCard
