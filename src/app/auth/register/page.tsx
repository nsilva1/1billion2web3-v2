'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/images/1b2web3.png';
import { toast } from 'react-toastify';
import { register } from '@/actions/register';
import { useRouter } from 'next/navigation';
import { isStringEmpty } from '@/lib/helperFunctions';

export interface NewUser {
  name: string;
  email: string;
  walletAddress: string;
  password: string;
}

const page = () => {
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      isStringEmpty(fullName) ||
      isStringEmpty(email) ||
      isStringEmpty(address) ||
      isStringEmpty(password)
    ) {
      toast.warning('Please fill all fields');
      return;
    }

    setLoading(true);

    try {
      const newUser: NewUser = {
        name: fullName,
        email,
        walletAddress: address,
        password,
      };

      await register(newUser);
      toast.success('User Registered Successfully');
      router.push('/login');
    } catch (error) {
      toast.error('Error Registering User');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='bg-white rounded-xl'>
      <form
        onSubmit={handleSubmit}
        className='shadow-xl rounded-xl w-96 p-6'
      >
        <fieldset disabled={loading}>
          <div className='flex flex-col gap-4'>
            <Image
              src={logo}
              alt='1Billion2Web3'
              className='w-[100px] h-[100px] mx-auto'
            />
            <div className='grid grid-cols-2 gap-2'>
              <div>
                <label className='block text-gray-700 font-medium mb-2'>
                  Full Name
                </label>
                <input
                  type='text'
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Full Name'
                  required
                />
              </div>
              <div>
                <label className='block text-gray-700 font-medium mb-2'>
                  Email
                </label>
                <input
                  type='email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Email Address'
                  required
                />
              </div>
            </div>
            <div className='grid grid-cols-1'>
              <div>
                <label className='block text-gray-700 font-medium mb-2'>
                  Wallet Address
                </label>
                <input
                  type='text'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Wallet Address'
                  required
                />
              </div>
            </div>
            <div className='grid grid-cols-1'>
              <div>
                <label className='block text-gray-700 font-medium mb-2'>
                  Password
                </label>
                <input
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className='w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500'
                  placeholder='Password'
                  required
                />
              </div>
            </div>
            {loading ? (
              <div className='flex justify-center items-center'>
                <div className='animate-spin rounded-full border-4 border-blue-600 border-t-transparent w-8 h-8'></div>
              </div>
            ) : (
              <button
                type='submit'
                className='btn bg-blue-500 hover:bg-blue-700 p-3 rounded-xl text-white w-full mt-4'
              >
                REGISTER
              </button>
            )}
            <p className='text-center text-gray-500 mt-4'>
              Already have an account?{' '}
              <Link className='text-blue-500 hover:underline' href='/auth/login'>
                Login
              </Link>
            </p>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default page;
