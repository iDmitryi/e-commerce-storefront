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
      <main className="lg:flex bg-slate-200 w-full lg:h-[80%] h-full gap-16">
        <div className="lg:w-1/3 h-full w-full">
          <Plp />
        </div>
        <div className="lg:w-2/3 h-full hidden lg:block">
          <Pdp />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
