import React from 'react'
import { PricingTable } from '@clerk/nextjs'

function Billing() {
  return (
    <div>
        <h2 className='font-bold text-3xl md:px-48 xl:px-64 '>Join Subscription</h2>
        <PricingTable />
    </div>
  )
}

export default Billing