import { Dispatch, FC, SetStateAction } from 'react'
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface IPdpProductQuickViewProps {
  open: string | null
  setOpen: Dispatch<SetStateAction<string | null>>
}

const PdpProductQuickView: FC<IPdpProductQuickViewProps> = ({
  open,
  setOpen
}) => {
  if (!open) return null

  return (
    <Dialog
      open={!!open}
      onClose={() => {
        setOpen(null)
      }}
      className="relative z-10"
    >
      <DialogBackdrop
        transition
        className="fixed inset-0 hidden bg-opacity-100 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:block"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-stretch justify-center text-center md:items-center md:px-2 lg:px-4">
          <DialogPanel
            transition
            className="flex w-full transform text-left text-base transition data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in md:my-8 md:max-w-2xl md:px-4 data-[closed]:md:translate-y-0 data-[closed]:md:scale-95 lg:max-w-4xl"
          >
            <div className="relative flex w-full items-center overflow-hidden bg-white px-4 pb-8 pt-14 shadow-2xl sm:px-6 sm:pt-8 md:p-6 lg:p-8">
              <button
                type="button"
                onClick={() => setOpen(null)}
                className="absolute right-4 top-4 text-gray-400 hover:text-gray-500 sm:right-6 sm:top-8 md:right-6 md:top-6 lg:right-8 lg:top-8"
              >
                <span className="sr-only">Close</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
              <img
                alt="zoom product"
                src={open}
                className="object-cover object-center"
              />
            </div>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  )
}

export default PdpProductQuickView
