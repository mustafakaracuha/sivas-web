import React from "react";

import { HiOutlineCalendar } from "react-icons/hi";
import { LuClock3, LuMapPin } from "react-icons/lu";
import { IoClose } from "react-icons/io5";

const EventDetailDrawer = ({ event, isOpen, onClose }) => {
    if (!event) return null;

    return (
        <div className={`fixed inset-0 z-50 transition-transform transform ${isOpen ? "translate-x-0" : "translate-x-full"} ease-in-out duration-300`} onClick={onClose}>
            <div className="absolute bottom-0 right-0 bg-white w-[30rem] h-full shadow-xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-2 bg-gray-200 opacity-90 p-2 flex items-center justify-center rounded-full right-2 text-gray-600 hover:text-gray-800 text-2xl">
                   <IoClose/>
                </button>
                <img src={event.image} alt={event.title} className="w-full h-[300px] object-top object-cover" />
                <div className="flex flex-col gap-6 p-6">
                    <div>
                        <h2 className="text-xl font-semibold">{event.title}</h2>
                        <p className="text-md text-gray-600 mt-2">{event.description}</p>
                    </div>
                    <hr />
                    <div className="flex gap-2 items-center">
                        <HiOutlineCalendar size={20} />
                        <p className="text-sm text-gray-600">Tarih: {event.date}</p>
                    </div>
                    <div className="flex gap-2 items-center">
                        <LuClock3 size={20} />
                        <p className="text-sm text-gray-600">Saat: {event.clock}</p>
                    </div>
                    <div className="flex gap-2 mb-2 items-center">
                        <LuMapPin size={20} />
                        <p className="text-sm text-gray-600">Yer: {event.location}</p>
                    </div>
                    <hr />
                    <div className="mt-2">
                        <div className="flex justify-between">
                            <span className="text-lg text-yellow-600 font-bold">{event.price} TL</span>
                            {event.studentPrice && <span className="text-sm text-green-600">Öğrenci: {event.studentPrice} TL</span>}
                        </div>
                        <p className="text-sm text-gray-600 mt-2 mb-2">Doluluk:</p>
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
            </div>
        </div>
    );
};

export default EventDetailDrawer;
