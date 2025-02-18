import React from 'react'
import { signOut } from 'next-auth/react'

const SignOutButton = () => {

    const handleSignOut = async () => {
        await signOut()
    }

  return (
    <button className='flex justify-center gap-4 p-4 rounded-lg w-full bg-red-400 hover:bg-red-600' onClick={handleSignOut} type='button'>
        Sign Out
    </button>
  )
}

export { SignOutButton }