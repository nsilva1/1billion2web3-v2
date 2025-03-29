'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/images/1b2web3.png';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { login } from '@/actions/login';
import { isStringEmpty } from '@/lib/helperFunctions';
import { toast } from 'react-toastify';
import { GoogleButton } from '@/components/GoogleButton';

export interface UserCredentials {
  email: string;
  password: string;
}

const page = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const checkSession = async () => {
    const session = await auth();
    if (session) redirect('/dashboard');
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isStringEmpty(email) || isStringEmpty(password)) {
      toast.warning('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const user: UserCredentials = {
        email,
        password,
      };

      await login(user);
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Error Logging In. Please try again later');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSession()
  },[])

  return (
    <div>
      <div
        className={`flex flex-col items-center lg:flex-row justify-between lg:px-20`}
      >
        <div className='bg-white shadow-xl rounded-xl w-96 p-6'>
        <form
          onSubmit={handleSubmit}
          
        >
          <fieldset disabled={loading}>
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type='password'
                  autoComplete='current-password'
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Password'
                  required
                />
              </div>
              {loading ? (
                <div className='flex justify-center items-center'>
                  <div className='animate-spin rounded-full border-4 border-blue-600 border-t-transparent w-8 h-8'></div>
                </div>
              ) : (
                <button
                  type='submit'
                  className='btn bg-blue-500 hover:bg-blue-700 p-4 rounded-2xl text-white w-full mt-4'
                >
                  LOGIN
                </button>
              )}
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
          </fieldset>
        </form>
        <hr className='my-4' />
        <GoogleButton />
        </div>
        
      </div>
    </div>
  );
};

export default page;
