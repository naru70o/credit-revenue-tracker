import { UserButton,UserProfile } from '@clerk/nextjs'
import React from 'react'

export default function page() {
  return (
    <div className="grid grid-cols-1 justify-center content-center px-4 h-screen w-full">
      <div className="w-full flex flex-col gap-3 justify-center mb-12">
        <div className='self-end'>
        <UserButton />
        </div>
        <UserProfile/>
      </div>
      </div>
  )
}
