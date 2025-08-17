import Navbar from "./components/Navbar";
import Three from "./components/three";
import Section from "./components/Section"

function App() {
  return (
    <div className="relative w-full h-screen scrollbar-hide">
      <Three />
	  <Navbar/>
      <div className="relative z-10 h-screen overflow-y-scroll">
        <Section><div></div></Section>
        <Section><h2 className="text-3xl text-white">second section</h2></Section>
		<Section><h2 className="text-3xl text-white">third section</h2></Section>
      </div>
    </div>
  );
}

export default App;