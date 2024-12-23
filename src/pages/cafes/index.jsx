import React, { useState } from "react";

import { BsGrid } from "react-icons/bs";
import { IoRestaurantOutline } from "react-icons/io5";
import { LuCoffee, LuCroissant, LuDessert, LuBeer, LuLibrary, LuClock3 } from "react-icons/lu";
import { TbSoup } from "react-icons/tb";
import { FaStar } from "react-icons/fa";
import { MdErrorOutline } from "react-icons/md";

import { locationsData } from "./data";

function index() {
    const [filteredEvents, setFilteredEvents] = useState(locationsData);
    const [filter, setFilter] = useState("Tümü");
    const [category, setCategory] = useState("Tümü");
    const [currentPage, setCurrentPage] = useState(1);
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

    // Kategoriler
    const categories = ["Tümü", "Kafeler", "Restorantlar", "Tatlıcılar", "Çorbacılar", "Kahvaltıcılar", "Barlar", "Kitap Kafeler"];

    return (
        <div className="relative w-full h-full px-36 pt-5 flex flex-col">
            {/* Filtreler */}
            <div className="w-full flex items-center justify-center flex-col mb-10">
                <div>
                    <div className="space-x-4 mt-6">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange({ target: { value: cat } })}
                                className={`px-4 py-2 text-sm bg-gray-200 transition-all duration-300 rounded-full ${category === cat ? "!bg-gray-700 text-white" : "bg-white text-gray-500"}`}
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

            {/* Etkinlikler Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 flex-grow">
                {currentEvents.length > 0 ? (
                    currentEvents.map((event) => (
                        <div key={event.id} className="bg-white h-[28rem] rounded-lg shadow-lg relative flex flex-col">
                            {/* Görsel */}
                            <img src={event.image} alt={event.title} className="w-full h-[15rem] object-cover rounded-tr-lg rounded-tl-lg mb-4" />
                            {/* İçerik */}
                            <div className="px-4 flex-grow">
                                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{event.category}</div>
                                <h3 className="text-lg font-semibold mb-7 text-ellipsis whitespace-nowrap overflow-hidden">{event.title}</h3>
                                <h3 className="flex items-center gap-1 text-sm font-normal mb-2 text-ellipsis whitespace-nowrap overflow-hidden">
                                    <LuClock3 />
                                    {event.clock}
                                </h3>
                                <h3 className="text-sm font-normal mt-1">{event.description}</h3>
                            </div>
                            {/* Rating */}
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

            {/* Pagination */}
            {currentEvents.length > 0 && (
                <div className="flex mt-52 justify-center items-center space-x-2">
                    {/* Sol Ok */}
                    <button
                        onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                        className="px-3 py-2 mx-1 rounded-full bg-white text-gray-500 hover:bg-gray-200 disabled:opacity-50"
                        disabled={currentPage === 1}
                    >
                        ←
                    </button>

                    {/* Sayfa Numaraları */}
                    {pageNumbers.map((number) => (
                        <button
                            key={number}
                            onClick={() => handlePageChange(number)}
                            className={`px-4 py-2 transition-all duration-300 mx-1 rounded-full ${currentPage === number ? "bg-gray-700 text-white" : "bg-white text-gray-500 hover:bg-gray-200"}`}
                        >
                            {number}
                        </button>
                    ))}

                    {/* Sağ Ok */}
                    <button
                        onClick={() => handlePageChange(currentPage < pageNumbers.length ? currentPage + 1 : pageNumbers.length)}
                        className="px-3 py-2 mx-1 rounded-full bg-white text-gray-500 hover:bg-gray-200 disabled:opacity-50"
                        disabled={currentPage === pageNumbers.length}
                    >
                        →
                    </button>
                </div>
            )}
        </div>
    );
}

export default index;
