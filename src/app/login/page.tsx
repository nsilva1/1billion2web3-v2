import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/images/1b2web3.png'
import { auth, signIn } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { executeAction } from '@/lib/executeAction'

const page = async () => {
    const session = await auth()
    if(session) redirect('/dashboard')

  return (
    <div>
        <div className={`flex flex-col items-center lg:flex-row justify-between lg:px-20`}>
        {/* Login form card */}
        <form action={async (formData: FormData) => {
            'use server';
            await executeAction({
                actionFn: async () => {
                    await signIn('credentials', formData)
                }
            })
        }} className='bg-white shadow-xl rounded-xl w-96 p-6'>
            <div className='flex flex-col gap-4'>
                <Image src={logo} alt='1Billion2Web3' className='w-[100px] h-[100px] mx-auto' />
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input name='email' type="email" autoComplete='email' className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Email Address" required />
                </div>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Password</label>
                    <input name='password' type="password" autoComplete='current-password' className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Password" required />
                </div>
                <button type='submit' className='btn bg-blue-500 hover:bg-blue-700 p-4 rounded-2xl text-white w-full mt-4'>LOGIN</button>
                <p className='text-center text-gray-500 mt-4'>
                    Don't have an account? <Link className='text-blue-500 hover:underline' href='/register'>Register</Link>
                </p>
            </div>
        </form>
        {/* Welcome text */}
        <div className={`text-center lg:text-left hidden lg:block`}>
            <h2 className={`xs:text-[48px] text-[40px] xs:leading-[76.8px] leading-[66.8px] w-full font-semibold`}>Web 3 Quest</h2>
            <p className={`font-normal text-[18px] leading-[30.8px]`}>
                Welcome to the 1Billion2Web3 Initiative quiz. Watch short videos in the metaverse and answer questions. Get a free token at the end.
            </p>
        </div>
        </div>
    </div>
  )
}

export default page