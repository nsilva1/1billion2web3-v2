'use client';

import React, { useTransition } from 'react';
import googleIcon from '@/images/google.svg';
import Image from 'next/image';
import { googleSignIn } from '@/actions/google';
import { toast } from 'react-toastify';

const GoogleButton = () => {
  const [isPending, startTransition] = useTransition();

  const handleGoogleSignIn = () => {
    startTransition(async () => {
      try {
        await googleSignIn();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error('Error signing in with Google. Please try again.');
        }
      }
    });
  };

  return (
    <button
      onClick={handleGoogleSignIn}
      disabled={isPending}
      className='flex justify-center gap-4 p-4 rounded-lg w-full bg-gray-400'
    >
      <Image src={googleIcon} alt='Google' width={24} />
      {isPending ? 'Signing In...' : 'Continue with Google'}
    </button>
  );
};

export { GoogleButton };
