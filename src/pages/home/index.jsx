import React, { useState, useEffect } from "react";

import Divrigi from "../../assets/images/divri.jpg";
import Divrigi2 from "../../assets/images/divri2.jpg";
import Divrigi3 from "../../assets/images/divri3.jpg";
import Divrigi4 from "../../assets/images/divri4.jpg";
import Divrigi5 from "../../assets/images/divri5.jpg";

function Index() {
    const images = [Divrigi, Divrigi2, Divrigi3, Divrigi4, Divrigi5];
    const [currentImage, setCurrentImage] = useState(0);
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % images.length);
        }, 2500);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="h-full mx-auto bg-gray-100 overflow-hidden object-cover relative">
                <img src={images[currentImage]} alt="Divriği" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white text-center z-10">
                    <div className="backdrop-blur-sm px-14 py-32 rounded-xl">
                        <h1 className="text-5xl font-bold mb-4">Divriği Ulu Camii</h1>
                        <p className="text-md font-medium">
                            Divriği Ulu Cami, 1228'de inşa edilmiş, eşsiz taş işçiliği ve süslemeleriyle <br /> UNESCO Dünya Mirası Listesi'nde yer alan bir Selçuklu şaheseridir.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Index;
