import React, { useState } from "react";

import { BsGrid } from "react-icons/bs";
import { LuCastle } from "react-icons/lu";
import { BiWater } from "react-icons/bi";
import { TbBuildingCottage, TbBuildingCastle, TbBuildingBank } from "react-icons/tb";
import { PiTreePalm, PiParkLight } from "react-icons/pi";
import { MdErrorOutline } from "react-icons/md";
import { MdOutlineMosque } from "react-icons/md";

import LocationDetailDrawer from "./locationDetail";
import Pagination from "../../components/pagination";
import { locationsData } from "./data";

function index() {
    const [filteredEvents, setFilteredEvents] = useState(locationsData);
    const [filter, setFilter] = useState("Tümü");
    const [category, setCategory] = useState("Tümü");
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedLocation, setSelectedLocation] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const eventsPerPage = 4;

    const categoryMapping = {
        Camiiler: "Camii",
        Kaleler: "Kale",
        Hanlar: "Han",
        Konaklar: "Konak",
        Müzeler: "Müze",
        "Termal Kaplıcalar": "Termal Kaplıca",
        Parklar: "Park",
        "Doğal Güzellikler": "Doğal Güzellik",
    };

     const handleLocationClick = (event) => {
        setSelectedLocation(event); 
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };

    
    const handleCategoryChange = (event) => {
        const categoryValue = event.target.value;
        setCategory(categoryValue);

        let filtered = [...locationsData];

        if (categoryValue !== "Tümü") {
            const mappedCategory = categoryMapping[categoryValue];
            filtered = filtered.filter((event) => event.category === mappedCategory);
        }

        if (filter !== "Tümü") {
            filtered = filtered.filter((event) => event.category === filter);
        }

        setFilteredEvents(filtered);
        setCurrentPage(1);
    };

    const indexOfLastEvent = currentPage * eventsPerPage;
    const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
    const currentEvents = filteredEvents.slice(indexOfFirstEvent, indexOfLastEvent);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(filteredEvents.length / eventsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageChange = (number) => {
        setCurrentPage(number);
    };

    const categories = ["Tümü", "Camiiler", "Kaleler", "Hanlar", "Konaklar", "Müzeler", "Termal Kaplıcalar", "Parklar", "Doğal Güzellikler"];

    return (
        <div className="relative w-full h-full px-32 pt-5 flex flex-col">
            <div className="w-full flex items-center justify-center flex-col mb-10">
                <div>
                    <div className="space-x-4 mt-6">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange({ target: { value: cat } })}
                                className={`px-4 transition-all duration-300 py-2 text-sm rounded-xl ${category === cat ? "!bg-green-700 text-white" : "bg-gray-100 text-gray-500"}`}
                            >
                                {cat === "Tümü" && <BsGrid size={19} className="inline-block mr-2" />}
                                {cat === "Camiiler" && <MdOutlineMosque size={19} className="inline-block mr-2" />}
                                {cat === "Kaleler" && <LuCastle size={19} className="inline-block mr-2" />}
                                {cat === "Hanlar" && <TbBuildingCottage size={19} className="inline-block mr-2" />}
                                {cat === "Konaklar" && <TbBuildingCastle size={19} className="inline-block mr-2" />}
                                {cat === "Müzeler" && <TbBuildingBank size={19} className="inline-block mr-2" />}
                                {cat === "Termal Kaplıcalar" && <BiWater size={19} className="inline-block mr-2" />}
                                {cat === "Parklar" && <PiParkLight size={19} className="inline-block mr-2" />}
                                {cat === "Doğal Güzellikler" && <PiTreePalm size={19} className="inline-block mr-2" />}
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 flex-grow">
                {currentEvents.length > 0 ? (
                    currentEvents.map((event) => (
                        <div key={event.id} onClick={() => handleLocationClick(event)}  className="bg-white h-[28rem] rounded-lg shadow-lg relative">
                            <img src={event.image} alt={event.title} className="w-full h-[15rem] object-cover rounded-tr-lg rounded-tl-lg mb-4" />
                            <div className="px-4">
                                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{event.category}</div>
                                <h3 className="text-lg font-semibold mb-2 text-ellipsis whitespace-nowrap overflow-hidden">{event.title}</h3>
                                <h3 className="text-sm font-normal mb-2">{event.description}</h3>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-center col-span-full flex items-center justify-center">
                        <MdErrorOutline size={24} className="mr-2" />
                        Kategoriye ait içerik bulunamadı.
                    </p>
                )}
            </div>

            <LocationDetailDrawer location={selectedLocation} isOpen={isDrawerOpen} onClose={closeDrawer} />

            {currentEvents.length > 0 && (
                <>
                    <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredEvents.length / eventsPerPage)} onPageChange={handlePageChange} />
                </>
            )}
        </div>
    );
}

export default index;
