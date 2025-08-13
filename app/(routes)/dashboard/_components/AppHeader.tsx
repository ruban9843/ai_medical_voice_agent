
import Image from 'next/image'
import React from 'react'
import { UserButton } from '@clerk/nextjs'
import Link from 'next/link'



const menuOptions =[
    {
        id:1,
        name:'Home',
        path:'/dashboard'
    },
    {
        id:2,
        name:'History',
        path:'/dashboard/history'
    },
    {
        id:3,
        name:'Pricing',
        path:'/dashboard/billing'
    },
    {
        id:4,
        name:'Profile',
        path:'/profile'
    }
]

function AppHeader() {
  return (
    <div className='flex items-center justify-between  p-4 shadow c'>
        <Image src={'./logo1.svg'} alt="Logo" width={180} height={90} />

        <div className="hidden md:flex gap-12 items-center">
           {menuOptions.map((option,index)=>(
                <Link href={option.path} key={index}>
                    <h2 className='hover:font-bold'>{option.name}</h2> 
                </Link>
           ))}
        </div>
        <UserButton/>
    </div>
  )
}

export default AppHeader