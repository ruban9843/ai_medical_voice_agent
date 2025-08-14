"use client"
import React, { useEffect, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { DialogClose } from '@radix-ui/react-dialog'
import { ArrowRight, Loader2 } from 'lucide-react'
import axios from 'axios'
import  { doctorAgent } from '@/app/_types/page'
import SuggestedDoctorCard from './SuggestedDoctorCard'
import { useRouter } from 'next/navigation'
import { useAuth } from '@clerk/nextjs'
import { SessionDetail } from '@/app/_types/page'

function AddNewSessionDialog() {

    const [note, setNote] = useState<string>();
    const [loading, setLoading] = useState(false);
    const [suggestedDoctors, setSuggestedDoctors] = useState<doctorAgent[]>();
    const [selectedDoctor, setSelectedDoctor] = useState<doctorAgent>();
    const router = useRouter()
    const [historyList, setHistoryList] = useState<SessionDetail[]>([])

    const { has }=useAuth();
      //@ts-ignore
    const paidUser = has&&has({plan:'pro'})
    
    useEffect(()=>{
          GetHistoryList()
        },[])
    
    const GetHistoryList = async()=>{
        const result =await axios.get('/api/session-chat?sessionId=all')
        console.log(result.data);;
        setHistoryList(result.data)
    }


    const OnClickNext = async () => {
        setLoading(true);
        const result = await axios.post('/api/suggest-doctors', {
            notes: note
        })
        console.log(result.data);
        setSuggestedDoctors(result.data);
        setLoading(false);
    }


    const OnStartConsultation = async () => {
        setLoading(true);
        const result = await axios.post('/api/session-chat', {
            notes: note,
            selectedDoctor: selectedDoctor
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

    return (
        <Dialog >
            <DialogTrigger   >
                <span>
                    <Button className='mt-2 inline-block px-4 py-2 bg-primary text-white rounded cursor-pointer hover:bg-primary/90' disabled={!paidUser && historyList?.length>=1}>+ Start Consultation</Button>
                </span>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader >
                    <DialogTitle>Add Basic Details</DialogTitle>
                    <DialogDescription asChild >
                        {!suggestedDoctors ?
                            <div className="">
                                <h1>Add Symptoms Or Any Other Details</h1>
                                <Textarea placeholder='Add details here ...' className='h-[200px] mt-1 '
                                    onChange={(e) => setNote(e.target.value)} />
                            </div>
                            :
                            <div className="">
                                <h1>Select The Doctor</h1>
                                <div className="grid grid-cols-3 gap-5 ">
                                    {/* suggested doctors */}
                                    {Array.isArray(suggestedDoctors) && suggestedDoctors.map((doctor, index) => (
                                        <SuggestedDoctorCard key={index} doctorAgent={doctor} SetSelectedDoctor={() => { setSelectedDoctor(doctor) }}
                                            //@ts-ignore
                                            selectedDoctor={selectedDoctor} />
                                    ))
                                    }
                                </div>
                            </div>
                        }

                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <span >
                            Cancel
                        </span>
                    </DialogClose>
                    {!suggestedDoctors ? <Button disabled={!note || loading} onClick={() => OnClickNext()}>
                        Next {loading && <Loader2 className='animate-spin' />}<ArrowRight /></Button>
                        :
                        <Button disabled={!selectedDoctor || loading} onClick={() => OnStartConsultation()} >
                            Start Consultation
                            {loading && <Loader2 className='animate-spin' />}<ArrowRight />
                        </Button>}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddNewSessionDialog