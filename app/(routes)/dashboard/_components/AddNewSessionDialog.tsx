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
import { ArrowRight } from 'lucide-react'

function AddNewSessionDialog() {

    const [note,setNote]=useState<string>()
    return (
        <Dialog>
            <DialogTrigger>
                <Button className='w-full mt-2'>Start Consultation</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Add Basic Details</DialogTitle>
                    <DialogDescription>
                        <div className="">
                            <h1>Add Symptoms Or Any Other Details</h1>
                            <Textarea placeholder='Add details here ...' className='h-[200px] mt-1 ' 
                            onChange={(e)=>{setNote(e.target.value)}}/>
                        </div>
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose>
                        <Button variant={'outline'}>Cancel</Button>
                    </DialogClose>
                    <Button disabled={!note}>Next <ArrowRight/></Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default AddNewSessionDialog