import React from 'react'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'

const Page = async () => {
  const session = await auth()
  if(!session) redirect('/login')

  return (
    <div>
      Dashboard page
    </div>
  )
}

export default Page