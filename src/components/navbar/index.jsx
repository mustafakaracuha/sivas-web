import React from "react";
import { NavLink } from "react-router-dom";

import { RiHomeLine } from "react-icons/ri";
import { LuCalendar, LuCoffee } from "react-icons/lu";
import { TbBuildingBank } from "react-icons/tb";


function Navbar() {
    return (
        <nav className="bg-gray-700 rounded-r-[40px] h-[20rem] rounded-br-[40px] text-white w-20 pt-5 px-3">
            <ul className="space-y-7">
                <li className="relative group">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `hover:bg-gray-600 rounded-full flex items-center  w-12 h-12 justify-center ${isActive ? "bg-white text-gray-600 rounded-full w-12 h-12 transition-all duration-300" : ""}`
                        }
                    >
                        <RiHomeLine size={22} />
                    </NavLink>
                    {/* Tooltip */}
                    <span className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-white text-gray-600 text-sm px-2 py-1 rounded opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
                        Anasayfa
                    </span>
                </li>
                <li className="relative group">
                    <NavLink
                        to="/etkinlikler"
                        className={({ isActive }) => ` flex items-center w-12 h-12 justify-center ${isActive ? "bg-white text-gray-600 rounded-full w-12 h-12 transition-all duration-300" : ""}`}
                    >
                        <LuCalendar size={22} />
                    </NavLink>
                    {/* Tooltip */}
                    <span className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-white text-gray-600  text-sm px-2 py-1 rounded opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
                        Etkinlikler
                    </span>
                </li>
                <li className="relative group">
                    <NavLink
                        to="/mekanlar"
                        className={({ isActive }) => ` flex items-center w-12 h-12 justify-center ${isActive ? "bg-white text-gray-600 rounded-full w-12 h-12 transition-all duration-300" : ""}`}
                    >
                        <TbBuildingBank size={22} />
                    </NavLink>
                    {/* Tooltip */}
                    <span className="absolute left-14 top-1/2 transform -translate-y-1/2 bg-white text-gray-600 text-sm px-2 py-1 rounded opacity-0 scale-0 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200">
                        Mekanlar
                    </span>
                </li>
                <li className="relative group">
                    <NavLink
                        to="/kafeler"
                        className={({ isActive }) => ` flex items-center w-12 h-12 justify-center ${isActive ? "bg-white text-gray-600 rounded-full w-12 h-12 transition-all duration-300" : ""}`}
                    >
                        <LuCoffee size={22} />
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
