import Navbar from "@components/layout/Navbar";
import DiscoverSection from "@components/DiscoverSection";
import SkillSection from "./components/SkillSection";
import HiringSection from "./components/HiringSection";
import EmpowerSection from "./components/EmpowerSection";
import TextSection from "./components/TextSection";
import CareerSection from "./components/CareerSection";
import Footer from "./components/layout/Footer";
import Vapi from "./components/voice/Vapi";

function App() {
    return (
        <>
            <Navbar />
            <DiscoverSection />
            <SkillSection />
            <HiringSection />
            <EmpowerSection />
            <TextSection />
            <CareerSection />
            <Footer />
            <Vapi/>
        </>
    );
}

export default App;
