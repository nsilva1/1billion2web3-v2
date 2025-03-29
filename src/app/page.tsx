import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/images/1b2web3.png';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { toast } from 'react-toastify';
import { UserCredentials } from './auth/login/page';
import { login } from '@/actions/login';
import { isStringEmpty } from '@/lib/helperFunctions';
import { GoogleButton } from '@/components/GoogleButton';

const page = async () => {
  const session = await auth();
  if (session) redirect('/dashboard');

  return (
    <div className='bg-slate-300 p-8'>
      <div
        className={`h-screen flex gap-8 flex-col items-center lg:flex-row lg:px-20`}
      >
        {/* Login form card */}
        <div className='bg-white shadow-xl rounded-xl lg:w-[550px] p-6'>
        <form
          action={async (formData: FormData) => {
            'use server';
            const email = formData.get('email') as string;
            const password = formData.get('password') as string;

            if (isStringEmpty(email) || isStringEmpty(password)) {
              toast.warning('Please fill all fields');
              return;
            }

            const user: UserCredentials = {
              email,
              password,
            };

            try {
              await login(user);
            } catch (error) {
              if (error instanceof Error) {
                toast.error(error.message);
              } else {
                toast.error('Error Logging In. Please try again later');
              }
            }
          }}
          className=''
        >
          <div className='flex flex-col gap-4'>
            <Image
              src={logo}
              alt='1Billion2Web3'
              className='w-[100px] h-[100px] mx-auto'
            />
            <div>
              <label className='block text-gray-700 font-medium mb-2'>
                Email
              </label>
              <input
                name='email'
                type='email'
                autoComplete='email'
                className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Email Address'
                required
              />
            </div>
            <div>
              <label className='block text-gray-700 font-medium mb-2'>
                Password
              </label>
              <input
                name='password'
                type='password'
                autoComplete='current-password'
                className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                placeholder='Password'
                required
              />
            </div>
            <button
              type='submit'
              className='btn bg-blue-500 hover:bg-blue-700 p-4 rounded-2xl text-white w-full my-4'
            >
              LOGIN
            </button>
            <p className='text-center text-gray-500 mt-4'>
              Don't have an account?{' '}
              <Link
                className='text-blue-500 hover:underline'
                href='/auth/register'
              >
                Register
              </Link>
            </p>
          </div>
        </form> 
        <hr className='my-4' />
        <GoogleButton />           
        </div>
        {/* Welcome text */}
        <div className={`lg:text-left hidden lg:block`}>
          <h2
            className={`xs:text-[48px] text-[60px] xs:leading-[76.8px] leading-[66.8px] w-full font-semibold`}
          >
            Web 3 Quest
          </h2>
          <p className={`font-normal text-[20px]`}>
            Welcome to the 1Billion2Web3 Initiative quiz. Watch short videos in
            the metaverse and answer questions. Get a free token at the end.
          </p>
        </div>
      </div>
    </div>
  );
};

export default page;
