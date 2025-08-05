import { AIDoctorAgents } from '@/shared/list'
import React from 'react'
import DoctorAgentCard from './DoctorAgentCard'

function DoctorAgentList() {
  return (
    <div className="mt-5">
        <h2 className='font-bold text-xl'>AI Specialist Doctors Agent</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:cols-4 xl:grid-cols-5 mt-5 gap-8">
            {AIDoctorAgents.map((doctor ,index)=>(
                <div className="" key={index}>
                    <DoctorAgentCard doctorAgent={doctor} />
                </div>
            ))}
        </div>

    </div>

  )
}

export default DoctorAgentList