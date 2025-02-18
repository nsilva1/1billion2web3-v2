import React from 'react'
import githubIcon from '@/images/github.svg'
import Image from 'next/image'
import { signIn } from '@/lib/auth'

const GithubButton = () => {
  return (
    <form action={async () => {
        'use server';
        await signIn('github')
    }}>
        <button className='flex justify-center gap-4 p-4 rounded-lg w-full'>
            <Image src={githubIcon} alt='Github' width={24} />
            Continue with GitHub
        </button>
    </form>
  )
}

export { GithubButton }