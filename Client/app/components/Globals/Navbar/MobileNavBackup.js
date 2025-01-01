{isMenuOpen && (
    <div className="absolute top-[70px] left-0 w-full bg-gray-100 p-6 flex flex-col items-start gap-4 md:hidden z-10">
        {items.map((item, index) => (
            <Link
                href={item.path}
                key={index}
                className={`text-[16px] font-medium hover:text-blue-500 duration-200 ${path.includes(item.path) ? "text-blue-500" : ""
                    }`}
            >
                {item.item}
            </Link>
        ))}

        {/* Services Dropdown */}
        <div className="relative group cursor-pointer">
            <span className="hover:bg-blue-500 hover:text-white px-4 py-2 rounded-md duration-200">
                Services
            </span>
            <ul className="absolute top-full left-0 hidden group-hover:flex flex-col space-y-2 bg-white p-4 shadow-md w-[250px]">
                {categories && categories.length > 0 && categories.map((item, index) => (
                    <Link
                        key={index}
                        href={item.path}
                        className="block text-gray-700 text-[16px] hover:text-blue-500"
                    >
                        {item.item}
                    </Link>
                ))}
            </ul>
        </div>

        {/* Profile Section */}
        <div>
            <AccountBtn />
        </div>
    </div>
)}