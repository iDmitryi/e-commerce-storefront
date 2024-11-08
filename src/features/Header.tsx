import { FC } from 'react'
import { MagnifyingGlassIcon, ShoppingBagIcon } from '@heroicons/react/16/solid'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { useGetProductsQuery } from './plp/productsApiSlice.ts'
import { PRODUCTS_LIMIT } from '../utils/constants.ts'
import { StarIcon } from '@heroicons/react/20/solid'

const Header: FC = () => {
  const { data } = useGetProductsQuery({
    limit: PRODUCTS_LIMIT,
    skip: 0
  })

  return (
    <header className="h-full w-full flex justify-between items-center px-4">
      <div className="w-[40%] font-bold text-4xl">App Logo</div>
      <div className="w-[60%] flex items-center justify-between">
        <div className="flex w-[40%] items-center justify-center lg:ml-16 lg:justify-end">
          <div className="w-full max-w-xl lg:max-w-xs">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <div className="relative">
              <input
                id="search"
                name="search"
                type="search"
                placeholder="Search"
                className="block w-full rounded-sm border-0 bg-white py-1.5 pl-4 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              />
              <div className="pointer-events-none absolute inset-y-0 right-2 flex items-center pl-3">
                <MagnifyingGlassIcon
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-400"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex">
          {/* Cart */}
          <Popover className="ml-4 flow-root text-sm lg:ml-8 lg:relative">
            <PopoverButton className="group flex items-center p-2">
              <ShoppingBagIcon
                aria-hidden="true"
                className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-gray-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                0
              </span>
              <span className="sr-only">items in cart, view bag</span>
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5"
            >
              <h2 className="sr-only">Shopping Cart</h2>

              <form className="mx-auto max-w-2xl px-4 h-[500px] overflow-auto no-scrollbar">
                <ul role="list" className="divide-y divide-gray-200">
                  {data?.products.map(product => (
                    <li key={product.id} className="flex items-center py-6">
                      <img
                        alt={product.title}
                        src={product.thumbnail}
                        className="h-16 w-16 flex-none rounded-md border border-gray-200"
                      />
                      <div className="ml-4 flex-auto">
                        <h3 className="font-medium text-gray-900">
                          <a href={'#'}>{product.title}</a>
                        </h3>
                        <p className="text-gray-500">{product.rating}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </form>
            </PopoverPanel>
          </Popover>
          {/* Favourites */}
          <Popover className="ml-4 flow-root text-sm lg:ml-8 lg:relative">
            <PopoverButton className="group flex items-center p-2">
              <StarIcon
                aria-hidden="true"
                className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-gray-500"
              />
              <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                0
              </span>
              <span className="sr-only">
                items in favourites, view favourites
              </span>
            </PopoverButton>
            <PopoverPanel
              transition
              className="absolute inset-x-0 top-16 mt-px bg-white pb-6 shadow-lg transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5"
            >
              <h2 className="sr-only">Favourites</h2>

              <form className="mx-auto max-w-2xl px-4 h-[500px] overflow-auto no-scrollbar">
                <ul role="list" className="divide-y divide-gray-200">
                  {data?.products.map(product => (
                    <li key={product.id} className="flex items-center py-6">
                      <img
                        alt={product.title}
                        src={product.thumbnail}
                        className="h-16 w-16 flex-none rounded-md border border-gray-200"
                      />
                      <div className="ml-4 flex-auto">
                        <h3 className="font-medium text-gray-900">
                          <a href={'#'}>{product.title}</a>
                        </h3>
                        <p className="text-gray-500">{product.rating}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </form>
            </PopoverPanel>
          </Popover>
        </div>
      </div>
    </header>
  )
}

export default Header
