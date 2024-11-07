import Header from './features/Header.tsx'
import Pdp from './features/pdp/Pdp.tsx'
import Plp from './features/plp/Plp.tsx'
import Footer from './features/Footer.tsx'

function App() {
  return (
    <div className="w-full h-full">
      <div className="h-[20%]">
        <Header />
      </div>
      <main className="bg-slate-200 w-full h-[80%]">
        <div className="flex h-full">
          <div className="w-1/3 h-full">
            <Plp />
          </div>
          <div className="w-2/3">
            <Pdp />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
