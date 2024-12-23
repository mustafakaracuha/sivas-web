import React, { useState } from "react";

import { HiOutlineCalendar, HiOutlineMusicNote } from "react-icons/hi";
import { LuTheater, LuMusic2, LuTicketSlash, LuMapPin, LuCalendarClock, LuClock3, LuCalendar1, LuCalendarCheck2 } from "react-icons/lu";
import { PiConfetti } from "react-icons/pi";
import { MdErrorOutline } from "react-icons/md";

import { eventsData } from "./data";

function index() {
    const [filteredEvents, setFilteredEvents] = useState(eventsData);
    const [filter, setFilter] = useState("Tümü");
    const [category, setCategory] = useState("Tümü");
    const [currentPage, setCurrentPage] = useState(1);
    const eventsPerPage = 4; // Sayfa başına gösterilecek etkinlik sayısı

    const handleFilterChange = (event) => {
        const filterValue = event.target.value;
        setFilter(filterValue);
        let filtered = [...eventsData];

        if (filterValue === "Bugün") {
            const today = new Date().toISOString().split("T")[0];
            filtered = filtered.filter((event) => event.date.startsWith(today));
        } else if (filterValue === "Yarın") {
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            const tomorrowStr = tomorrow.toISOString().split("T")[0];
            filtered = filtered.filter((event) => event.date.startsWith(tomorrowStr));
        } else if (filterValue === "Gelecekteki Etkinlikler") {
            const futureEvents = new Date().toISOString();
            filtered = filtered.filter((event) => event.date > futureEvents);
        }

        if (category !== "Tümü") {
            filtered = filtered.filter((event) => event.category === category);
        }

        setFilteredEvents(filtered);
        setCurrentPage(1);
    };

    const handleCategoryChange = (event) => {
        const categoryValue = event.target.value;
        setCategory(categoryValue);

        let filtered = [...eventsData];

        if (categoryValue !== "Tümü") {
            filtered = filtered.filter((event) => event.category === categoryValue);
        }

        if (filter !== "Tümü") {
            setFilter("Tümü");
        }

        setFilteredEvents(filtered);
        setCurrentPage(1); // Kategori değiştiğinde sayfayı sıfırla
    };

    // Pagination işlemleri
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
    const categories = ["Tümü", "Müzik", "Tiyatro", "Sinema", "Sergi", "Dans", "Konferans", "Festival", "Söyleşi"];

    return (
        <div className="relative w-full h-full px-36 pt-5 flex flex-col">
            {/* Filtreler */}
            <div className="w-full flex items-center justify-center flex-col mb-10">
                <div>
                    <div className="space-x-4">
                        <button
                            onClick={() => handleFilterChange({ target: { value: "Tümü" } })}
                            className={`px-4 transition-all duration-300 py-2 text-sm bg-gray-200 rounded-full ${filter === "Tümü" ? "!bg-gray-700 text-white" : "bg-white text-gray-500"}`}
                        >
                            <LuCalendar1 size={19} className="inline-block mr-2" /> Tümü
                        </button>
                        <button
                            onClick={() => handleFilterChange({ target: { value: "Bugün" } })}
                            className={`px-4 transition-all duration-300 py-2 text-sm bg-gray-200 rounded-full ${filter === "Bugün" ? "!bg-gray-700 text-white" : "bg-white text-gray-500"}`}
                        >
                            <HiOutlineCalendar size={19} className="inline-block mr-2" /> Bugün
                        </button>
                        <button
                            onClick={() => handleFilterChange({ target: { value: "Yarın" } })}
                            className={`px-4 transition-all duration-300 py-2  text-sm bg-gray-200 rounded-full ${filter === "Yarın" ? "!bg-gray-700 text-white" : "bg-white text-gray-500"}`}
                        >
                            <LuCalendarClock size={19} className="inline-block mr-2" /> Yarın
                        </button>
                        <button
                            onClick={() => handleFilterChange({ target: { value: "Gelecekteki Etkinlikler" } })}
                            className={`px-4  transition-all duration-300 py-2 text-sm bg-gray-200 rounded-full ${
                                filter === "Gelecekteki Etkinlikler" ? "!bg-gray-700 text-white" : "bg-white text-gray-500"
                            }`}
                        >
                            <LuCalendarCheck2 size={19} className="inline-block mr-2" /> Gelecekteki Etkinlikler
                        </button>
                    </div>
                </div>

                <div>
                    <div className="space-x-4 mt-6">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => handleCategoryChange({ target: { value: cat } })}
                                className={`px-4 py-2 transition-all duration-300 text-sm bg-gray-200 rounded-full ${category === cat ? "!bg-gray-700 text-white" : "bg-white text-gray-500"}`}
                            >
                                {cat === "Tümü" && <HiOutlineMusicNote size={19} className="inline-block mr-2" />}
                                {cat === "Müzik" && <LuMusic2 size={19} className="inline-block mr-2" />}
                                {cat === "Sinema" && <LuTicketSlash size={19} className="inline-block mr-2" />}
                                {cat === "Tiyatro" && <LuTheater size={19} className="inline-block mr-2" />}
                                {cat === "Sergi" && <LuTicketSlash size={19} className="inline-block mr-2" />}
                                {cat === "Dans" && <LuTicketSlash size={19} className="inline-block mr-2" />}
                                {cat === "Konferans" && <LuTicketSlash size={19} className="inline-block mr-2" />}
                                {cat === "Festival" && <PiConfetti size={19} className="inline-block mr-2" />}
                                {cat === "Söyleşi" && <LuTicketSlash size={19} className="inline-block mr-2" />}
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
                        <div key={event.id} className="bg-white h-[33rem] rounded-lg shadow-lg relative">
                            {/* Kategori */}
                            <img src={event.image} alt={event.title} className="w-full h-[15rem] object-cover rounded-tr-lg rounded-tl-lg mb-4" />
                            <div className="px-4">
                                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">{event.category}</div>
                                <h3 className="text-lg font-semibold mb-2 text-ellipsis whitespace-nowrap overflow-hidden">{event.title}</h3>
                                <p className="text-sm text-gray-600 mt-5 flex items-center gap-1 mb-2">
                                    <HiOutlineCalendar size={16} /> Tarih: {event.date}
                                </p>
                                <p className="text-sm text-gray-600 flex items-center gap-1 mb-2">
                                    <LuClock3 size={16} />
                                    Saat: {event.clock}
                                </p>
                                <div className="flex gap-1">
                                    <LuMapPin size={16} />
                                    <p className="w-44 text-sm mb-2 text-ellipsis whitespace-nowrap overflow-hidden">Yer: {event.location}</p>
                                </div>
                                <hr className="pt-4 mt-6" />
                                <div className="flex items-center space-x-4">
                                    <p className="text-lg text-yellow-600 font-bold">{event.price} TL</p>
                                    {event.studentPrice !== null && event.studentPrice !== undefined && <p className="text-sm text-green-600">Öğrenci: {event.studentPrice} TL</p>}
                                </div>
                                {/* Kapasite Barı */}
                                <p className="text-xs mt-3 text-gray-600 mb-2">Doluluk</p>
                                <div className="w-full bg-gray-200 h-2 rounded-lg overflow-hidden">
                                    <div
                                        className={`h-2 rounded-lg transition-all ${
                                            event.usedCapacity / event.capacity <= 0.3 ? "bg-red-500" : event.usedCapacity / event.capacity <= 0.5 ? "bg-yellow-500" : "bg-green-500"
                                        }`}
                                        style={{
                                            width: `${(event.usedCapacity / event.capacity) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-400 text-center col-span-full flex items-center justify-center">
                        <MdErrorOutline size={24} className="mr-2" />
                        Kategoriye ait etkinlik bulunamadı.
                    </p>
                )}
            </div>

            {/* Pagination */}
            {currentEvents.length > 0 && (
                <div className="flex justify-center mt-24 items-center space-x-2">
                    {/* Sol Ok */}
                    <button
                        onClick={() => handlePageChange(currentPage > 1 ? currentPage - 1 : 1)}
                        className="px-3 py-2 mx-1 rounded-full bg-white text-gray-500 hover:bg-gray-200 disabled:opacity-50"
                        disabled={currentPage === 1}
                    >
                        ←
                    </button>

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
                                    className={`px-4 py-2 transition-all duration-300 mx-1 rounded-full ${
                                        currentPage === number ? "bg-gray-700 text-white" : "bg-white text-gray-500 hover:bg-gray-200"
                                    }`}
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
            )}
        </div>
    );
}

export default index;
