import React from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { SessionDetail } from '../medical-agent/[sessionId]/page'
import moment from 'moment'

type Props={
    record:SessionDetail
}

function ViewReportDialog({record}:Props) {
    return (
        <div>
            <Dialog>
                <DialogTrigger><Button variant={'link'} size={'sm'}> view report</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            <h2 className="text-center text-4xl">Medical AI Voice Agent Report</h2>
                        </DialogTitle>
                        <DialogDescription asChild>
                            <div className="">
                                <h2 className='fontbold text-blue-500 text-lg'>Video Info :</h2>
                                <div className=" grid grid-cols-2">
                                        <h2><span>Doctor Specialization:{record.selectedDoctor?.specialist}</span></h2>
                                        <h2><span>Counsult Date:{moment(new Date(record?.createdOn)).fromNow()}</span></h2>
                                </div>
                            </div>
                            
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ViewReportDialog