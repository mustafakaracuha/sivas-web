import React, { useState, useEffect } from "react";
import Divrigi from "../../assets/divri.jpg";
import Divrigi2 from "../../assets/divri2.jpg";
import Divrigi3 from "../../assets/divri3.jpg";
import Divrigi4 from "../../assets/divri4.jpg";
import Divrigi5 from "../../assets/divri5.jpg";

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
        <div className="relative w-full h-screen px-36 pt-20 overflow-hidden">
            {/* Sol ve sağdaki çapraz kayan "Sivas" yazıları */}
            <div className="absolute left-0 top-4 transform translate-x-8 rotate-45 text-9xl font-bold text-gray-400 opacity-20 animate-slideRight z-0">Sivas</div>
            <div className="absolute right-0 bottom-4 transform translate-x-8 rotate-45 text-9xl font-bold text-gray-400 opacity-20 animate-slideRight z-0">Sivas</div>

            {/* Divriği görseli ve içerik */}
            <div className="h-[45rem] rounded-xl mx-auto bg-gray-100 overflow-hidden object-cover relative">
                <img src={images[currentImage]} alt="Divriği" className="w-full h-full object-cover" />
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-40 text-white text-center z-10">
                    <div className="backdrop-blur-sm px-10 py-24 rounded-xl">
                        <h1 className="text-5xl font-bold mb-4">Divriği Ulu Camii</h1>
                        <p className="text-md font-medium">
                            Divriği Ulu Cami, 1228'de inşa edilmiş, eşsiz taş işçiliği ve süslemeleriyle <br /> UNESCO Dünya Mirası Listesi'nde yer alan bir Selçuklu şaheseridir.
                        </p>
                    </div>
                </div>
                <div className="absolute top-0 right-0 transform rotate-90 translate-x-8 translate-y-24 text-3xl font-bold text-white z-20">Tarihi yerler</div>
            </div>
        </div>
    );
}

export default Index;
