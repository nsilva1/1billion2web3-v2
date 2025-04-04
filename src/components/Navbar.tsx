import React from 'react'
import { navbarButtons } from '@/lib/constants'
import Image from 'next/image'
import logo from '@/images/1b2web3.png'
import Link from 'next/link'
import menu from '@/images/menu.svg'
import { auth } from '@/lib/auth'
import { SignOutButton } from './SignOutButton'

const Navbar = async () => {
    const session = await auth();

  return (
    <nav className='w-full flex p-6 justify-between items-center navbar'>
        <Link href='/'>
        <Image 
            src={logo}
            className='w-[50px] h-[50px]'
            alt='Logo'
        />
        </Link>

        <div className='hidden md:flex'>
        {
            session ? (
                <div className='flex gap-4 justify-end'>
                    <div>Logged In: {session.user?.name}</div>
                    <div><SignOutButton /></div>
                </div>
            ) : (
                <div className="justify-end items-center">
            {
                navbarButtons.map((navbaBbutton, index) => (
                    <div key={index} className={`font-normal cursor-pointer text-[16px] text-white bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded-xl ${index === navbarButtons.length -1 ? 'mr-0' : 'mr-10'}`}>
                        <Link href={navbaBbutton.path}>{navbaBbutton.label}</Link>
                    </div>
                ))
            }
                </div>
            )
        }
        </div>

        {/* Mobile view */}
        <div className={`md:hidden flex justify-end items-center flex-1`}>
            <Image 
                src={menu}
                className='object-contain'
                alt='Menu'
            />

            {/* <div className={`flex md:hidden p-6 absolute top-20 right-0 mx-4 my-2 rounded-xl shadow-xl bg-white sidebar`}>
                <ul className="list-none flex flex-col justify-end items-center flex-1">
                {
                navbarButtons.map((navbaBbutton, index) => (
                    <li key={index} className={`font-normal cursor-pointer text-[16px] text-white bg-sky-500 hover:bg-sky-700 py-2 px-4 rounded-xl ${index === navbarButtons.length -1 ? 'mb-0' : 'mb-5'}`}>
                        <Link href={navbaBbutton.path}>{navbaBbutton.label}</Link>
                    </li>
                ))
            }
                </ul>
            </div> */}
        </div>
    </nav>
  )
}

export { Navbar }