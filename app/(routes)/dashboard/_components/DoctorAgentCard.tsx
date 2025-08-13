'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useAuth } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Loader2Icon } from 'lucide-react'
import { IconArrowRight } from '@tabler/icons-react'


export type doctorAgent ={
    id:number,
    specialist: string,
    description: string,
    image: string,
    agentPrompt: string,
    voiceId: string,
    subscriptionRequired: boolean
}
type Props ={
    doctorAgent: doctorAgent
}



function DoctorAgentCard({doctorAgent}:Props) {
   const [loading, setLoading] = useState(false);
   const router = useRouter()
    const OnStartConsultation = async () => {
        setLoading(true);
        const result = await axios.post('/api/session-chat', {
            notes: 'user Query',
            selectedDoctor: doctorAgent
        });
        console.log("suguaan",result.data)
        if(result.data?.sessionId){
            setLoading(true);

            console.log(result.data?.sessionId);
            //route to new conversation
            setLoading(true);
            router.push('/dashboard/medical-agent/'+result.data?.sessionId)
        }
        setLoading(false); 
    }


  const { has }=useAuth();
  //@ts-ignore
  const paidUser = has&&has({plan:'pro'})
  console.log(paidUser)

  return (
    <div className="relative">
        {doctorAgent.subscriptionRequired && <Badge className='absolute m-2 right-0'>
          Premium
        </Badge>
        }
        <Image src={doctorAgent.image} alt={doctorAgent.specialist}
        width={200} height={300}
        className="w-full h-[250px] object-cover rounded-xl" />

        <h2 className="font-bold mt-1 ">{doctorAgent.specialist}</h2>
        <p className="line-clamp-2  text-sm text-gray-500"> {doctorAgent.description}</p>
        <Button className='w-full mt-2' disabled={!paidUser && doctorAgent.subscriptionRequired} onClick={OnStartConsultation}>
          {loading ?<Loader2Icon className='animate-spin'/>:<IconArrowRight/>} Start Consultation  </Button>
    </div>
  )
}

export default DoctorAgentCard