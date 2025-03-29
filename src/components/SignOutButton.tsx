'use client'

import React from 'react'
import { signOut } from 'next-auth/react'

const SignOutButton = () => {

    const handleSignOut = async () => {
        await signOut()
    }

  return (
    <button className='flex justify-center items-center py-2 px-4 rounded-lg w-full bg-red-500 hover:bg-red-600 text-white' onClick={handleSignOut} type='button'>
        Sign Out
    </button>
  )
}

export { SignOutButton }