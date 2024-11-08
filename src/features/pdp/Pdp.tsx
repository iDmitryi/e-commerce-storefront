// product detail page
import { FC, Suspense, useState } from 'react'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels
} from '@headlessui/react'
import { StarIcon } from '@heroicons/react/20/solid'
import {
  MinusIcon,
  PlusIcon,
  StarIcon as StartIconFav,
  ArrowsPointingOutIcon
} from '@heroicons/react/24/outline'
import { cn } from '../../utils/cn.ts'
import { useGetProductByIdQuery } from '../plp/productsApiSlice.ts'
import { formatPrice } from '../../utils/formatPrice.ts'
import {
  IMAGE_PLACEHOLDER,
  PRODUCT_STARS,
  PRODUCTS_OFFSET
} from '../../utils/constants.ts'
import PdpProductQuickView from './PdpProductQuickView.tsx'

interface IPdpProps {
  productId: number | undefined
}

const Pdp: FC<IPdpProps> = ({ productId }) => {
  const {
    data: product,
    error,
    isLoading
  } = useGetProductByIdQuery(productId ?? PRODUCTS_OFFSET)

  const [open, setOpen] = useState<null | string>(null)

  if (isLoading || !product) return <div>Loading...</div>
  if (error) return <div>Error loading product</div>

  const {
    price,
    discountPercentage,
    title,
    rating,
    description,
    dimensions,
    weight,
    reviews
  } = product

  const additionalDetails = [
    {
      name: ' Product Description',
      items: [description]
    },
    {
      name: 'Dimensions',
      items: Object.entries(dimensions).map(
        ([key, value]) => `${key}: ${value}`
      )
    },
    {
      name: 'Weight',
      items: [`${weight / 10}kg`]
    }
  ]

  const reviewsInfo = {
    totalCount: reviews.length,
    average: reviews.reduce((a, b) => a + b.rating, 0) / reviews.length,
    counts: reviews.reduce(
      (a, b) => {
        const ratingObj = a.find(r => r.rating === b.rating)

        if (ratingObj) {
          ratingObj.count += 1
        }

        return a
      },
      [
        { rating: 5, count: 0 },
        { rating: 4, count: 0 },
        { rating: 3, count: 0 },
        { rating: 2, count: 0 },
        { rating: 1, count: 0 }
      ]
    )
  }

  return (
    <div className="bg-gray-200 h-[96%] mt-1 mr-4 overflow-auto">
      <div className="mx-auto max-w-2xl pt-16 lg:max-w-7xl lg:px-6 rounded-sm">
        <div className="lg:grid lg:grid-cols-2 lg:items-start">
          {/* Product & Price */}
          <div className="flex flex-col gap-6">
            <div className="flex w-full justify-around">
              <h2 className="sr-only">Product information</h2>
              <h1 className="w-auto text-3xl font-bold tracking-tight text-gray-900">
                {title}
              </h1>
              <div className="w-auto flex flex-col items-end">
                <div className="flex gap-2 items-baseline">
                  <p
                    className={cn(
                      'text-gray-900',
                      discountPercentage && 'line-through'
                    )}
                  >
                    {formatPrice(price)}
                  </p>
                  {discountPercentage ? (
                    <h2 className="text-xl font-bold text-gray-900">
                      {formatPrice(price - (price * discountPercentage) / 100)}
                    </h2>
                  ) : null}
                </div>
              </div>
            </div>

            {/* Image gallery */}
            <TabGroup className="flex flex-col-reverse">
              {/* Image selector */}
              <div className="mx-auto mt-6 hidden w-full max-w-2xl sm:block lg:max-w-none">
                <TabList className="grid grid-cols-4 gap-6">
                  {product.images.map((image, i) => (
                    <Tab
                      key={i}
                      className="group relative flex h-24 cursor-pointer items-center justify-center rounded-md bg-white text-sm font-medium uppercase text-gray-900 hover:bg-gray-50 focus:outline-none focus:ring focus:ring-opacity-50 focus:ring-offset-4"
                    >
                      <span className="sr-only">{title}</span>

                      <span className="absolute inset-0 overflow-hidden rounded-md">
                        <Suspense key={image} fallback={<div>Loading...</div>}>
                          <img
                            onError={e => {
                              e.currentTarget.src = IMAGE_PLACEHOLDER
                            }}
                            alt={`${i}-${title}`}
                            src={image}
                            className="h-full w-full object-cover object-center"
                          />
                        </Suspense>
                      </span>

                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 rounded-md ring-2 ring-transparent ring-offset-2 group-data-[selected]:ring-indigo-500"
                      />
                      <PdpProductQuickView open={open} setOpen={setOpen} />
                    </Tab>
                  ))}
                </TabList>
              </div>

              <TabPanels className="aspect-h-1 aspect-w-1 w-full bg-white rounded-2xl">
                {product.images.map((image, i) => (
                  <TabPanel key={i}>
                    <Suspense key={image} fallback={<div>Loading...</div>}>
                      <img
                        onError={e => {
                          e.currentTarget.src = IMAGE_PLACEHOLDER
                        }}
                        alt={`${i}-product`}
                        src={image}
                        className="h-full w-full object-cover object-center sm:rounded-lg"
                      />
                      <button
                        type="button"
                        className="absolute top-4 right-4"
                        aria-label="Expand image"
                        onClick={() => setOpen(image)}
                      >
                        <ArrowsPointingOutIcon
                          aria-hidden="true"
                          className="h-6 w-6 text-gray-400 hover:text-gray-500"
                        />
                      </button>
                    </Suspense>
                  </TabPanel>
                ))}
              </TabPanels>
            </TabGroup>

            <section
              aria-labelledby="details-heading"
              className="h-[150px] overflow-y-auto no-scrollbar"
            >
              <h2 id="details-heading" className="sr-only">
                Additional details
              </h2>

              <div className="divide-y divide-gray-200 border-t">
                {additionalDetails.map(detail => (
                  <Disclosure key={detail.name} as="div">
                    <h3>
                      <DisclosureButton className="group relative flex w-full items-center justify-between py-2 text-left">
                        <span className="text-sm font-medium text-gray-900 group-data-[open]:text-indigo-600">
                          {detail.name}
                        </span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon
                            aria-hidden="true"
                            className="block h-6 w-6 text-gray-400 group-hover:text-gray-500 group-data-[open]:hidden"
                          />
                          <MinusIcon
                            aria-hidden="true"
                            className="hidden h-6 w-6 text-indigo-400 group-hover:text-indigo-500 group-data-[open]:block"
                          />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="prose prose-sm pb-2">
                      <ul role="list">
                        {detail.items.map(item => (
                          <li key={item}>{item}</li>
                        ))}
                      </ul>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </div>
            </section>
          </div>
          {/* Product Reviews */}
          <div className="sm:mt-16 sm:px-0 lg:mt-0 flex flex-col justify-between items-end h-full">
            <div className="flex flex-col items-end gap-16">
              <div>
                <h3 className="sr-only">Reviews</h3>
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

              <div className="lg:col-span-4">
                <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                  Customer Reviews
                </h2>

                <div className="mt-3 flex items-center">
                  <div>
                    <div className="flex items-center">
                      {Array.from(Array(PRODUCT_STARS).keys()).map(rating => (
                        <StarIcon
                          key={rating}
                          aria-hidden="true"
                          className={cn(
                            reviewsInfo.average > rating
                              ? 'text-yellow-400'
                              : 'text-gray-300',
                            'h-5 w-5 shrink-0'
                          )}
                        />
                      ))}
                    </div>
                    <p className="sr-only">
                      {reviewsInfo.average} out of {PRODUCT_STARS} stars
                    </p>
                  </div>
                  <p className="ml-2 text-sm text-gray-900">
                    Based on {reviewsInfo.totalCount} reviews
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="sr-only">Review data</h3>

                  <dl className="space-y-3">
                    {reviewsInfo.counts.map(count => (
                      <div
                        key={count.rating}
                        className="flex items-center text-sm"
                      >
                        <dt className="flex flex-1 items-center">
                          <p className="w-3 font-medium text-gray-900">
                            {count.rating}
                            <span className="sr-only"> star reviews</span>
                          </p>
                          <div
                            aria-hidden="true"
                            className="ml-1 flex flex-1 items-center"
                          >
                            <StarIcon
                              aria-hidden="true"
                              className={cn(
                                count.count > 0
                                  ? 'text-yellow-400'
                                  : 'text-gray-300',
                                'h-5 w-5 shrink-0'
                              )}
                            />

                            <div className=" ml-3 flex-1">
                              <div className="h-3 rounded-full border border-gray-200 bg-gray-100">
                                {count.count > 0 ? (
                                  <div
                                    style={{
                                      width: `calc(${count.count} / ${reviewsInfo.totalCount} * 100%)`
                                    }}
                                    className="h-full inset-y-0 rounded-full border border-yellow-400 bg-yellow-400"
                                  />
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </dt>
                        <dd className="ml-3 w-10 text-right text-sm tabular-nums text-gray-900">
                          {Math.round(
                            (count.count / reviewsInfo.totalCount) * 100
                          )}
                          %
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </div>
            </div>
            <form className="mt-6">
              <div className="flex items-center gap-2">
                <button className="bg-yellow-400 text-black px-4 py-1 rounded-full truncate hover:bg-yellow-500">
                  Add to cart
                </button>
                <button aria-label="Add to favorites">
                  <StartIconFav
                    aria-hidden="true"
                    className={cn(
                      'text-gray-400',
                      'w-8 h-8 shrink-0 hover:text-yellow-400'
                    )}
                  />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Pdp
