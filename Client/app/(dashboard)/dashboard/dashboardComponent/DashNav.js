"use client"
import Logo from '@/app/components/Globals/Logo';
import React, { useState } from 'react';
import { MdClose, MdMenu } from 'react-icons/md';
import items from './SidebarItems';
import Link from 'next/link';

export default function DashNav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activeItem, setActiveItem] = useState(''); // Track the active item
    const [activeParent, setActiveParent] = useState(''); // Track the active parent

    const handleMenuOpen = () => {
        setMenuOpen(!menuOpen);
    };

    const handleItemClick = (parent, child) => {
        setActiveItem(child);
        setActiveParent(parent);
        setMenuOpen(false); // Close menu after selection
    };

    return (
        <div className="fixed top-0 left-0 w-full bg-gray-100 z-[999] flex items-start md:items-center justify-between px-5 py-2">
            <div className="text-4xl font-bold italic">
                <Logo />
            </div>
            <div>
                <span onClick={handleMenuOpen} className=" md:hidden text-5xl cursor-pointer z-50">
                    <MdMenu />
                </span>
                <span onClick={handleMenuOpen} className=" hidden md:block text-5xl cursor-pointer z-50">
                    <h3 className=' italic'>Dashboard</h3>
                </span>
            </div>
            <div className={`${menuOpen ? 'scale-x-1' : 'scale-x-0'} origin-right md:hidden transition-all w-[70%] h-screen fixed top-0 right-0 bg-slate-200 z-[20] overflow-y-auto sidebar-scrollbar`}>
                <span onClick={handleMenuOpen} className=' inline-block fixed top-3 right-5'>
                    <MdClose className="text-4xl border-2 border-red-500 rounded-md text-red-500 m-3 cursor-pointer transition-all hover:rotate-180" />
                </span>

                {/* Mobile view menu start here */}
                <nav className="p-4  ">
                    {items.map((menu, index) => (
                        <div key={index}>
                            {/* Parent Item */}
                            <div
                                className={`p-2 font-bold text-lg cursor-pointer ${activeParent === menu.parentItem ? 'bg-gray-300' : ''
                                    }`}
                            >
                                {menu.parentItem}
                            </div>
                            {/* Child Items */}
                            <div className="ml-4">
                                {menu.childItem.map((child, idx) => (
                                    <Link
                                        href={child.path}
                                        key={idx}
                                        className={`p-2 text-md flex items-center gap-2 cursor-pointer ${activeItem === child.item ? 'text-blue-500 font-semibold' : ''
                                            }`}
                                        onClick={() => handleItemClick(menu.parentItem, child.item)}
                                    >
                                        {child.icon}
                                        {child.item}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </nav>
                {/* Mobile view menu end here */}
            </div>
        </div>
    );
}
