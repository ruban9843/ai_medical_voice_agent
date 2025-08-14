import React from 'react'
import { doctorAgent } from '@/app/_types/page' // Adjust the import path as necess
import Image from 'next/image'



type Props ={
    doctorAgent: doctorAgent,
    SetSelectedDoctor: any,
    selectedDoctor: doctorAgent
}

function SuggestedDoctorCard({doctorAgent, SetSelectedDoctor, selectedDoctor}:Props) {
  return (
    <div className={`flex flex-col items-center 
     border rounded-2xl shadow p-5  hover:border-blue-500
      cursor-pointer ${selectedDoctor?.id === doctorAgent?.id && 'border-blue-500'}`}
     onClick={()=>SetSelectedDoctor(doctorAgent)}>
        <Image src={doctorAgent?.image} alt={doctorAgent.specialist} width={70} height={70}
         className='w-[50px] h-[50px]  rounded-4xl object-cover'/>
        <h2 className='font-bold text-sm  text-center '>{doctorAgent?.specialist}</h2>
        <p className='line-clamp-2 text-sm text-gray-500'>{doctorAgent?.description}</p>
    </div>
  )
}

export default SuggestedDoctorCard