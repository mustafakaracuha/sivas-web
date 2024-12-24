import React from "react";

import md5 from "md5";

import { LuClock3, LuMapPin, LuPhone } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { FaStar } from "react-icons/fa";

const CafeDetailDrawer = ({ event, isOpen, onClose }) => {
    if (!event) return null;

    const handleGoToLocation = (event) => {
        const mapsUrl = `https://www.google.com/maps?q=${encodeURIComponent(event.location)}`;
        window.open(mapsUrl, "_blank");
    };

    return (
        <div className={`fixed inset-0 z-50 transition-transform transform ${isOpen ? "translate-x-0" : "translate-x-full"} ease-in-out duration-300`} onClick={onClose}>
            <div className="absolute bottom-0 right-0 bg-white w-[30rem] h-full shadow-xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
                <button onClick={onClose} className="absolute top-2 bg-gray-200 opacity-90 p-2 flex items-center justify-center rounded-full right-2 text-gray-600 hover:text-gray-800 text-2xl">
                    <IoClose />
                </button>
                <img src={event.image} alt={event.title} className="w-full h-[300px] object-top object-cover" />
                <div className="flex flex-col gap-6 p-6">
                    <div>
                        <h2 className="text-xl font-semibold">{event.title}</h2>
                        <p className="text-md text-gray-600 mt-2">{event.description}</p>
                    </div>
                    <hr />
                    <p className=" font-semibold">Çalışma Saatleri</p>
                    <div className="flex gap-2 items-center">
                        <LuClock3 size={20} />
                        <p className="text-md text-gray-600">{event.clock}</p>
                    </div>
                    <p className=" font-semibold">Konum Bilgisi</p>
                    <div className="flex items-start justify-between">
                        <div className="flex gap-2 mb-2 items-center">
                            <LuMapPin size={20} />
                            <p className="text-md text-gray-600">{event.location}</p>
                        </div>
                        <button onClick={() => handleGoToLocation(event)} className="bg-gray-700 w-24 py-2 text-sm rounded-md text-white">
                            Bul
                        </button>
                    </div>
                    <p className="font-semibold">İletişim Bilgisi</p>
                    <div className="flex gap-2 mb-2 items-center">
                        <LuPhone size={20} />
                        <p className="text-md text-gray-600">{event.phone}</p>
                    </div>
                    <hr />

                    <div className="mt-2">
                        <h4 className="text-lg font-semibold">Yorumlar</h4>
                        <div className="space-y-4 mt-2">
                            {event.comments && event.comments.length > 0 ? (
                                event.comments.map((comment, index) => (
                                    <div key={index} className="flex items-start gap-4 border-b pb-5 pt-4">
                                        <img src={`https://www.gravatar.com/avatar/${md5(comment.user.toLowerCase())}?d=identicon`} alt={comment.user} className="w-10 h-10 rounded-full" />
                                        <div className="flex-1">
                                            <p className="font-semibold">{comment.user}</p>
                                            <p className="text-sm text-gray-600">{comment.text}</p>
                                            <div className="flex items-center gap-1 mt-3">
                                                {Array.from({ length: comment.rating }, (_, index) => (
                                                    <FaStar key={index} className="text-yellow-400" />
                                                ))}
                                                <p className="text-sm text-gray-500 ml-1">{comment.rating} / 5</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-gray-400">Henüz yorum yapılmamış.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CafeDetailDrawer;
