import React from "react";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="w-full flex items-center justify-center fixed bottom-10 -left-0">
            {/* Sol Ok */}
            <button
                onClick={() => onPageChange(currentPage > 1 ? currentPage - 1 : 1)}
                className="px-3 py-2 mx-1 rounded-full bg-white text-gray-500 hover:bg-gray-200 disabled:opacity-50"
                disabled={currentPage === 1}
            >
                ←
            </button>

            {/* Sayfa Numaraları */}
            {pageNumbers.map((number) => (
                <button
                    key={number}
                    onClick={() => onPageChange(number)}
                    className={`px-4 py-2 transition-all duration-300 mx-1 rounded-full ${currentPage === number ? "bg-gray-700 text-white" : "bg-white text-gray-500 hover:bg-gray-200"}`}
                >
                    {number}
                </button>
            ))}

            {/* Sağ Ok */}
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
