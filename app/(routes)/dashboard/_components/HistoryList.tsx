"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, { useState } from 'react'
import AddNewSessionDialog from './AddNewSessionDialog'

function HistoryList() {
    const [historyList, setHistoryList] = useState([])
  return (
    <div className='mt-10'>
        {
            historyList.length ==0?
            <div className="flex items-center flex-col justify-center gap-5 p-7 border border-dashed rounded-2xl border-3">
                <Image src={'/medical-assistance.png'} alt='medical'
                width={200} height={200}/>
                <h2 className='font-bold text-xl mt-2'>No Recent Consultaions</h2>
                <p>It looks like you haven't consulted with any doctors yet.</p>
                <AddNewSessionDialog/>
            </div>:
            <div className="">

            </div>
        }

       

    </div>
  )
}

export default HistoryList