import { logo } from '@/app/DemoData/DemoImg'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Logo({ path }) {
    return (
        <Link href={path || "/"} className=" flex items-center font-bold hover:text-blue-500 duration-200">
            <Image
                width={100}
                height={100}
                alt="TickmarkQ logo"
                src={logo}
                className="w-[50px] md:w-[70px] h-[50px] md:h-[60px] "
            />
            <h2 className='text-[1.5rem] md:text-3xl'>Tickmark
                <span className=" font-bold text-[1.7rem] md:text-4xl italic text-red-700">q</span>
            </h2>
        </Link>
    )
}
