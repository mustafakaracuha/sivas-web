import React from "react";
import { NavLink, useLocation } from "react-router-dom";

import { RiHomeLine } from "react-icons/ri";
import { LuCalendar, LuCoffee } from "react-icons/lu";
import { TbBuildingBank } from "react-icons/tb";


function Navbar() {
    const location = useLocation()

    
    return (
        <nav className={location.pathname === "/" ? "absolute top-[17rem] opacity-50 transition-all cursor-pointer hover:opacity-100 bg-gray-700 rounded-r-[40px] h-[17rem] rounded-br-[40px] text-white w-18 pt-[1.2rem] px-3 z-[99999]": "absolute top-[17rem] bg-gray-700 rounded-r-[40px] h-[17rem] rounded-br-[40px] text-white w-18 pt-[1.2rem] px-3 z-[99999]"}>
            <ul className="space-y-6">
                <li className="relative group">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `hover:bg-gray-600 rounded-full flex items-center  w-10 h-10 justify-center ${isActive ? "bg-white text-gray-600 rounded-full w-10 h-10 transition-all duration-300" : ""}`
                        }
                    >
                        <RiHomeLine size={20} />
                    </NavLink>
                    {/* Tooltip */}
                    <span className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-white text-gray-600 text-sm px-2 py-1 rounded opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
                        Anasayfa
                    </span>
                </li>
                <li className="relative group">
                    <NavLink
                        to="/etkinlikler"
                        className={({ isActive }) => `hover:bg-gray-600 rounded-full flex items-center w-10 h-10 justify-center ${isActive ? "bg-white text-gray-600 rounded-full w-10 h-10 transition-all duration-300" : ""}`}
                    >
                        <LuCalendar size={20} />
                    </NavLink>
                    {/* Tooltip */}
                    <span className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-white text-gray-600  text-sm px-2 py-1 rounded opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
                        Etkinlikler
                    </span>
                </li>
                <li className="relative group">
                    <NavLink
                        to="/mekanlar"
                        className={({ isActive }) => `hover:bg-gray-600 rounded-full flex items-center w-10 h-10 justify-center ${isActive ? "bg-white text-gray-600 rounded-full w-10 h-10 transition-all duration-300" : ""}`}
                    >
                        <TbBuildingBank size={20} />
                    </NavLink>
                    {/* Tooltip */}
                    <span className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-white text-gray-600 text-sm px-2 py-1 rounded opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
                        Mekanlar
                    </span>
                </li>
                <li className="relative group">
                    <NavLink
                        to="/kafeler"
                        className={({ isActive }) => `hover:bg-gray-600 rounded-full flex items-center w-10 h-10 justify-center ${isActive ? "bg-white text-gray-600 rounded-full w-10 h-10 transition-all duration-300" : ""}`}
                    >
                        <LuCoffee size={20} />
                    </NavLink>
                    {/* Tooltip */}
                    <span className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-white text-black text-sm px-2 py-1 rounded opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
                        Kafeler
                    </span>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;
