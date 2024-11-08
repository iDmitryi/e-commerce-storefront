import { FC } from 'react'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react'
import { ShoppingBagIcon, TrashIcon } from '@heroicons/react/16/solid'
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts'
import { removeProduct, selectProducts, selectTotal } from './cartSlice.ts'

const CartDropdown: FC = () => {
  const dispatch = useAppDispatch()
  const total = useAppSelector(selectTotal)
  const products = useAppSelector(selectProducts)

  return (
    <Popover className="flow-root text-sm lg:relative">
      <PopoverButton className="group flex items-center p-2">
        <ShoppingBagIcon
          aria-hidden="true"
          className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-gray-500"
        />
        <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
          {total}
        </span>
        <span className="sr-only">items in cart, view bag</span>
      </PopoverButton>
      <PopoverPanel
        transition
        className="absolute inset-x-2 top-16 mt-px bg-white pb-6 shadow-lg transition data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in sm:px-2 lg:left-auto lg:right-0 lg:top-full lg:-mr-1.5 lg:mt-3 lg:w-80 lg:rounded-lg lg:ring-1 lg:ring-black lg:ring-opacity-5"
      >
        <h2 className="sr-only">Shopping Cart</h2>

        <form className="mx-auto max-w-2xl px-4 max-h-[500px] overflow-auto no-scrollbar">
          <ul role="list" className="divide-y divide-gray-200">
            {products.length ? (
              products.map(product => (
                <li key={product.id} className="flex items-center py-6">
                  <img
                    alt={product.title}
                    src={product.thumbnail}
                    className="h-16 w-16 flex-none rounded-md border border-gray-200"
                  />
                  <div className="ml-4 flex-auto">
                    <h3 className="font-medium text-gray-900">
                      {product.title}
                    </h3>
                    <p className="text-gray-500">{product.quantity}</p>
                  </div>
                  {product && product.id ? (
                    <div className="ml-4 flow-root shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          dispatch(removeProduct(product.id as number))
                        }}
                        className="-m-2.5 flex items-center justify-center bg-white p-2.5 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Remove</span>
                        <TrashIcon aria-hidden="true" className="h-5 w-5" />
                      </button>
                    </div>
                  ) : null}
                </li>
              ))
            ) : (
              <li className="py-6">No items in cart</li>
            )}
          </ul>
        </form>
      </PopoverPanel>
    </Popover>
  )
}

export default CartDropdown
