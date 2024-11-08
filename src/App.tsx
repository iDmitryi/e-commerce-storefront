import Header from './features/Header.tsx'
import Pdp from './features/pdp/Pdp.tsx'
import Plp from './features/plp/Plp.tsx'
import Footer from './features/Footer.tsx'

function App() {
  return (
    <div className="w-full h-full">
      <div className="h-[10%]">
        <Header />
      </div>
      <main className="lg:flex bg-white w-full lg:h-[90%] h-full">
        <div className="lg:w-[40%] h-full w-full overflow-y-scroll no-scrollbar">
          <Plp />
        </div>
        <div className="lg:w-[60%] h-full hidden lg:block pl-16">
          <Pdp />
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default App
