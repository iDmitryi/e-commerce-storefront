import { FC } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/16/solid'
import CartDropdown from './cart/CartDropdown.tsx'
import FavouriteDropdown from './favourites/FavouriteDropdown.tsx'

const Header: FC = () => {
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
                className="block w-full rounded-sm border bg-white py-1.5 pl-4 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
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
          <CartDropdown />
          {/* Favourites */}
          <FavouriteDropdown />
        </div>
      </div>
    </header>
  )
}

export default Header
