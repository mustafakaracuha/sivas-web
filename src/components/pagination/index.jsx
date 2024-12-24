import React, { useEffect, useState } from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setIsVisible(true), 450); // Animasyon başlama süresi
        return () => clearTimeout(timer); // Temizlik işlemi
    }, []);

    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className={`fixed inset-x-0 bottom-10 flex items-center justify-center transition-opacity duration-500 ${isVisible ? "opacity-100" : "opacity-0"}`}>
            <button
                onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
                className="px-3 py-2 mx-1 rounded-full bg-white text-gray-500 hover:bg-gray-200 disabled:opacity-50"
                disabled={currentPage === 1}
            >
                ←
            </button>

            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`px-4 py-2 transition-all duration-300 mx-1 rounded-full ${currentPage === number ? "bg-gray-700 text-white" : "bg-white text-gray-500 hover:bg-gray-200"}`}
                >
                    {number}
                </button>
            ))}

            <button
                onClick={() => onPageChange(currentPage < totalPages ? currentPage + 1 : totalPages)}
                className="px-3 py-2 mx-1 rounded-full bg-white text-gray-500 hover:bg-gray-200 disabled:opacity-50"
                disabled={currentPage === totalPages}
            >
                →
            </button>
        </div>
    );
};

export default Pagination;
