"use client"
import React, { useState } from 'react'
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
import DoctorAgentCard, { doctorAgent } from './DoctorAgentCard'

function AddNewSessionDialog() {

    const [note,setNote]=useState<string>();
    const[loading,setLoading]=useState(false);
    const[suggestedDoctors,setSuggestedDoctors]=useState<doctorAgent[]>();


    const OnClickNext = async() => {
        setLoading(true);
        const result = await axios.post('/api/suggest-doctors',  {
            notes:note
        })
        console.log(result.data);
        setSuggestedDoctors(result.data);
        setLoading(false);
    }

    return (
        <Dialog>
            <DialogTrigger >
                <Button className='w-full mt-2'>Start Consultation</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Basic Details</DialogTitle>
                    <DialogDescription asChild>
                        {!suggestedDoctors?
                            <div className="">
                                <h1>Add Symptoms Or Any Other Details</h1>
                                <Textarea placeholder='Add details here ...' className='h-[200px] mt-1 ' 
                                onChange={(e)=>setNote(e.target.value)}/>
                            </div>
                            :
                            <div className="grid grid-cols-3 gap-5 ">
                                {/* suggested doctors */}

                                {suggestedDoctors.map((doctor, index) => (
                                        <DoctorAgentCard key={index} doctorAgent={doctor} />
                                    ))
                                }


                            </div>
                        
                        }
                        
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button variant={'outline'}>Cancel</Button>
                    </DialogClose>
                    {!suggestedDoctors?<Button disabled={!note} onClick={()=>OnClickNext()}>
                        Next {loading && <Loader2 className='animate-spin'/>}<ArrowRight/></Button>
                    :
                    <Button >
                        Start Consultation
                    </Button>}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddNewSessionDialog