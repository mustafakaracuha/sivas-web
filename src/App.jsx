import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Home from "./pages/home";
import Event from "./pages/event";
import Locations from "./pages/locations";
import Cafes from "./pages/cafes";

import Navbar from "./components/navbar";

function AnimatedRoutes() {
    const location = useLocation();

    return (
        <TransitionGroup className="transition-group">
            <CSSTransition key={location.key} classNames="slide" timeout={500} appear={true}>
                <Routes location={location}>
                    <Route path="/" element={<Home />} />
                    <Route path="/etkinlikler" element={<Event />} />
                    <Route path="/mekanlar" element={<Locations />} />
                    <Route path="/kafeler" element={<Cafes />} />
                </Routes>
            </CSSTransition>
        </TransitionGroup>
    );
}

function App() {
    return (
        <Router>
            <div className="">
                <Navbar />
                <div className="flex-1 w-full h-screen overflow-hidden">
                    <AnimatedRoutes />
                </div>
            </div>
        </Router>
    );
}

export default App;
