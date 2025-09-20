import Title from "./pages/Title";
import Three from "./pages/Three";

import './utils/translation';
import Navbar from "./pages/Navbar";

export default function App() {
    return (<div className="relative w-full h-screen">
        <Three />
        <Title />
        <Navbar />
    </div>);
}