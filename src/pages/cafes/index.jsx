import React, { useState } from "react";

import { BsGrid } from "react-icons/bs";
import { IoRestaurantOutline } from "react-icons/io5";
import { LuCoffee, LuCroissant, LuDessert, LuBeer, LuLibrary, LuClock3 } from "react-icons/lu";
import { TbSoup } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

import CafeDetailDrawer from "./cafeDetail";
import Pagination from "../../components/pagination";
import { locationsData } from "./data";

function index() {
    const [filteredEvents, setFilteredEvents] = useState(locationsData);
    const [filter, setFilter] = useState("Tümü");
    const [category, setCategory] = useState("Tümü");
    const [currentPage, setCurrentPage] = useState(1);

    const [selectedCafe, setSelectedCafe] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const eventsPerPage = 4;

    const categoryMapping = {
        Kafeler: "Kafe",
        Restorantlar: "Restorant",
        Tatlıcılar: "Tatlı",
        Çorbacılar: "Çorba",
        Kahvaltıcılar: "Kahvaltı",
        Barlar: "Bar",
        "Kitap Kafeler": "Kitap Kafe",
    };


    const handleCafeClick = (event) => {
        setSelectedCafe(event); 
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

    const categories = ["Tümü", "Kafeler", "Restorantlar", "Tatlıcılar", "Çorbacılar", "Kahvaltıcılar", "Barlar", "Kitap Kafeler"];

    return (
        <div className="relative w-full h-full px-32 pt-5 flex flex-col">
            <div className="w-full flex items-center justify-center flex-col mb-10">
                <div>
                    <div className="space-x-4 mt-6">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange({ target: { value: cat } })}
                                className={`px-4 py-2 text-sm transition-all duration-300 rounded-xl ${category === cat ? "!bg-blue-500 text-white" : "bg-gray-100 text-gray-500"}`}
                            >
                                {cat === "Tümü" && <BsGrid size={19} className="inline-block mr-2" />}
                                {cat === "Kafeler" && <LuCoffee size={19} className="inline-block mr-2" />}
                                {cat === "Restorantlar" && <IoRestaurantOutline size={19} className="inline-block mr-2" />}
                                {cat === "Tatlıcılar" && <LuDessert size={19} className="inline-block mr-2" />}
                                {cat === "Çorbacılar" && <TbSoup size={19} className="inline-block mr-2" />}
                                {cat === "Kahvaltıcılar" && <LuCroissant size={19} className="inline-block mr-2" />}
                                {cat === "Barlar" && <LuBeer size={19} className="inline-block mr-2" />}
                                {cat === "Kitap Kafeler" && <LuLibrary size={19} className="inline-block mr-2" />}
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 flex-grow">
                {currentEvents.length > 0 ? (
                    currentEvents.map((event) => (
                        <div key={event.id} onClick={() => handleCafeClick(event)} className="bg-white h-[30rem] rounded-lg shadow-lg relative flex flex-col">
                            <img src={event.image} alt={event.title} className="w-full h-[15rem] object-cover rounded-tr-lg rounded-tl-lg mb-4" />
                            <div className="px-4 flex-grow">
                            <div className="absolute top-2 right-2 bg-red-500 font-semibold text-white text-[11px] px-2 py-1 rounded-full">{event.category}</div>
                                <h3 className="text-lg font-semibold mb-7 text-ellipsis whitespace-nowrap overflow-hidden">{event.title}</h3>
                                <h3 className="flex items-center gap-1 text-sm font-normal mb-2 text-ellipsis whitespace-nowrap overflow-hidden">
                                    <LuClock3 />
                                    {event.clock}
                                </h3>
                                <h3 className="text-sm font-normal mt-1">{event.description}</h3>
                            </div>
                            <div className="px-4 pb-4">
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: event.rating }, (_, index) => (
                                        <FaStar key={index} className={index < Math.round(event.rating) ? "text-yellow-400" : "text-gray-500"} />
                                    ))}
                                    <p className="text-sm text-gray-500 ml-1">{event.rating} / 5</p>
                                </div>
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

            <CafeDetailDrawer event={selectedCafe} isOpen={isDrawerOpen} onClose={closeDrawer} />

            {currentEvents.length > 0 && (
                <>
                    <Pagination currentPage={currentPage} totalPages={Math.ceil(filteredEvents.length / eventsPerPage)} onPageChange={handlePageChange} />
                </>
            )}
        </div>
    );
}

export default index;
