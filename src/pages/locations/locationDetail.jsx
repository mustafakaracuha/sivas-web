import React from "react";
import { LuMapPin } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

const LocationDetailDrawer = ({ location, isOpen, onClose }) => {
    if (!location) return null;

    const handleGoToLocation = () => {
        const { latitude, longitude } = location;
        const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
        window.open(mapsUrl, "_blank");
    };

    return (
        <div className={`fixed inset-0 z-50 transition-transform transform ${isOpen ? "translate-x-0" : "translate-x-full"} ease-in-out duration-300`} onClick={onClose}>
            <div className="absolute right-0 bg-white w-[30rem] h-full shadow-xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-2 bg-gray-200 opacity-90 p-2 flex items-center justify-center rounded-full right-2 text-gray-600 hover:text-gray-800 text-2xl">
                    <IoClose />
                </button>
                <img src={location.image} alt={location.title} className="w-full h-[300px] object-top object-cover" />
                <div className="flex flex-col gap-6 p-6">
                    <div>
                        <h2 className="text-xl font-semibold">{location.title}</h2>
                        <p className="text-md text-gray-600 mt-2">{location.description}</p>
                    </div>
                    <hr />
                    <div className="flex items-start justify-between">
                        <div className="flex gap-2 mb-2 items-center">
                            <LuMapPin size={20} />
                            <p className="text-md text-gray-600">{location.location}</p>
                        </div>
                        <button onClick={() => handleGoToLocation(location)} className="bg-gray-700 w-24 py-2 text-sm rounded-md text-white">
                            Bul
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LocationDetailDrawer;
