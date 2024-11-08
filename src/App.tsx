import Header from './features/Header.tsx'
import Pdp from './features/pdp/Pdp.tsx'
import Plp from './features/plp/Plp.tsx'
import Footer from './features/Footer.tsx'
import { useState } from 'react'
import { IProduct } from './utils/types.ts'

function App() {
  const [selectedProduct, setSelectedProduct] =
    useState<Partial<IProduct> | null>(null)

  return (
    <div className="w-full h-full">
      <div className="h-[10%]">
        <Header />
      </div>
      <main className="lg:flex bg-white w-full lg:h-[90%] h-full">
        <div className="lg:w-[40%] h-full w-full overflow-y-scroll no-scrollbar">
          <Plp onSelectProduct={setSelectedProduct} />
        </div>
        <div className="lg:w-[60%] h-full hidden lg:block pl-16">
          <Pdp productId={selectedProduct?.id} />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
