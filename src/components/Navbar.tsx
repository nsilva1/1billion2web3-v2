'use client'

import React, { useState } from 'react'
import { navbarButtons } from '@/utils/constants'
import Image from 'next/image'
import logo from '@/images/1b2web3.png'
import Link from 'next/link'
import menu from '@/images/menu.svg'
import close from '@/images/close.svg'

const Navbar = () => {
    const [toggle, setToggle] = useState(false)

  return (
    <nav className='w-full flex p-6 justify-between items-center navbar'>
        <Image 
            src={logo}
            className='w-[50px] h-[50px]'
            alt='Logo'
        />

        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
            {
                navbarButtons.map((navbaBbutton, index) => (
                    <li key={index} className={`font-normal cursor-pointer text-[16px] ${index === navbarButtons.length -1 ? 'mr-0' : 'mr-10'}`}>
                        <Link href={navbaBbutton.path}>{navbaBbutton.label}</Link>
                    </li>
                ))
            }
        </ul>

        {/* Mobile view */}
        <div className={`sm:hidden flex justify-end items-center flex-1`}>
            <Image 
                src={toggle ? close : menu}
                className='object-contain'
                alt='Menu'
                onClick={() => setToggle(!toggle)}
            />

            <div className={`${toggle ? 'flex' : 'hidden'} p-6 absolute top-20 right-0 mx-4 my-2 rounded-xl shadow-xl sidebar`}>
                <ul className="list-none flex flex-col justify-end items-center flex-1">
                {
                navbarButtons.map((navbaBbutton, index) => (
                    <li key={index} className={`font-normal cursor-pointer text-[16px] ${index === navbarButtons.length -1 ? 'mb-0' : 'mb-5'}`}>
                        <Link href={navbaBbutton.path}>{navbaBbutton.label}</Link>
                    </li>
                ))
            }
                </ul>
            </div>
        </div>
    </nav>
  )
}

export { Navbar }