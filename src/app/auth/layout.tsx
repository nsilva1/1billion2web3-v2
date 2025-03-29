import React from 'react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <section className='w-full relative'>
      <ToastContainer />
        <div className='absolute inset-0 -z-10 h-full w-full'>
            <div className='h-screen flex items-center justify-center bg-slate-200'>
                {children}
            </div>
        </div>
    </section>
  )
}

export default AuthLayout