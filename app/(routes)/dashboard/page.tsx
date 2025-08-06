
import React from 'react'
import HistoryList from './_components/HistoryList'
import { Button } from '@/components/ui/button'
import DoctorAgentList from './_components/DoctorAgentList'
import AddNewSessionDialog from './_components/AddNewSessionDialog'

function Dashboard() {
  return (
    <div className="">
        <div className="flex justify-between items-center ">
          <h1 className='font-bold text-2xl' >My Dashboard</h1>
          <AddNewSessionDialog/>
        </div>
        <HistoryList/>
        <DoctorAgentList/>
    </div>
  )
}

export default Dashboard