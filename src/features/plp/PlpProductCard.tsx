import { FC } from 'react'
import { cn } from '../../utils/cn.ts'
import { StarIcon } from '@heroicons/react/16/solid'
import { StarIcon as StartIconFav } from '@heroicons/react/24/solid'
import { formatPrice } from '../../utils/formatPrice.ts'

interface IPdpProductCardProps {
  id: number
  title: string
  description: string
  price: number
  discountPercentage: number
  rating: number
  images: string[]
  thumbnail: string
  reviews: number
}

const PlpProductCard: FC<IPdpProductCardProps> = props => {
  const {
    id = null,
    title = '',
    discountPercentage = null,
    description = '',
    thumbnail = '',
    rating = 0,
    price = 0,
    reviews
  } = props

  return (
    <div
      key={id}
      className="group relative p-4 sm:p-6 flex bg-gray-200 rounded-sm"
    >
      <div className="flex">
        <div className="mr-4 shrink-0 self-center">
          <div className="overflow-hidden rounded-full bg-gray-200 group-hover:opacity-75 h-24 w-24">
            <img
              alt="product"
              src={thumbnail}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>
        <div>
          <h4 className="text-lg font-bold">{title}</h4>
          <p className="mt-1">{description}</p>
          <div className="flex items-center xl:col-span-1">
            <div className="flex items-center">
              {Array.from(Array(5).keys()).map(r => (
                <StarIcon
                  key={r}
                  aria-hidden="true"
                  className={cn(
                    rating > r ? 'text-yellow-400' : 'text-gray-400',
                    'h-5 w-5 shrink-0'
                  )}
                />
              ))}
            </div>
            <span className="sr-only"> {rating} out of 5 stars</span>
          </div>
        </div>
        <div className="flex flex-col justify-around items-center w-[40%]">
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
          {discountPercentage ? (
            <p className="font-medium text-gray-500">
              {discountPercentage}% off
            </p>
          ) : null}
          <p className="mt-1 text-sm text-gray-500">{reviews} reviews</p>
          <div className="flex items-center gap-2">
            <button className="bg-yellow-400 text-black px-4 py-1 rounded-full truncate hover:bg-yellow-500">
              Add to cart
            </button>
            <button>
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
    </div>
  )
}

export default PlpProductCard
