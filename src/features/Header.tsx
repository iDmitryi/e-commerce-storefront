import { FC } from 'react'

const Header: FC = () => {
  return (
    <header className="bg-green-300 h-full">
      {/* Cart */}
      {/*
      <Popover className="ml-4 flow-root text-sm lg:relative lg:ml-8">
        <PopoverButton className="group -m-2 flex items-center p-2">
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

          <form className="mx-auto max-w-2xl px-4">
            <ul role="list" className="divide-y divide-gray-200">
              {products.map(product => (
                <li key={product.id} className="flex items-center py-6">
                  <img
                    alt={product.imageAlt}
                    src={product.imageSrc}
                    className="h-16 w-16 flex-none rounded-md border border-gray-200"
                  />
                  <div className="ml-4 flex-auto">
                    <h3 className="font-medium text-gray-900">
                      <a href={product.href}>{product.name}</a>
                    </h3>
                    <p className="text-gray-500">{product.color}</p>
                  </div>
                </li>
              ))}
            </ul>

            <button
              type="submit"
              className="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
            >
              Checkout
            </button>

            <p className="mt-6 text-center">
              <a
                href="#"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                View Shopping Bag
              </a>
            </p>
          </form>
        </PopoverPanel>
      </Popover>
*/}
    </header>
  )
}

export default Header
