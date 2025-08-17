import BottomText from "./components/Navbar";
import FirstPage from "./components/FirstPage";
import Three from "./components/Three";

function App() {
  return (
    <div className="relative w-full h-screen">
        <Three />

      {/* Contenu scrollable par-dessus */}
      <div className="relative z-10 h-screen overflow-y-scroll">
        <FirstPage />
        <section className="h-screen flex items-center justify-center">
          <h2 className="text-3xl text-white">second section</h2>
        </section>
        <section className="h-screen flex items-center justify-center">
          <h2 className="text-3xl text-white">Thrid section</h2>
        </section>
      </div>
    </div>
  );
}

export default App;