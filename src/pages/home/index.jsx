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
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    const handleIndicatorClick = (index) => {
        setCurrentImage(index);
    };

    return (
        <div className="relative w-full h-screen overflow-hidden">
            <div className="h-full mx-auto bg-gray-100 overflow-hidden object-cover relative">
                <img src={images[currentImage]} alt="Divriği" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white text-center z-10">
                    <div className="backdrop-blur-sm px-14 py-20 rounded-xl">
                        <h1 className="text-5xl font-bold mb-4">Divriği Ulu Camii</h1>
                        <p className="text-md font-medium">
                            Divriği Ulu Cami, 1228'de inşa edilmiş, eşsiz taş işçiliği ve süslemeleriyle <br /> UNESCO Dünya Mirası Listesi'nde yer alan bir Selçuklu şaheseridir.
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center space-x-4 z-50">
                {images.map((_, index) => (
                    <div
                        key={index}
                        className={`h-1 rounded-xl cursor-pointer ${currentImage === index ? "w-14 transition-all transform bg-white opacity-90" : "w-8 transition-all transform bg-white opacity-40"}`}
                        onClick={() => handleIndicatorClick(index)}
                    ></div>
                ))}
            </div>
            </div>
        </div>
    );
}

export default Index;
