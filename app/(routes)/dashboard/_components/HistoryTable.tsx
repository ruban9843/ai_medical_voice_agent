import React from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { SessionDetail ,Report } from '../medical-agent/[sessionId]/page'
import moment from 'moment'
import ViewReportDialog from './ViewReportDialog'

type Props ={
    historyList:SessionDetail[]& { report?: Report }
}
function HistoryTable({historyList}:Props) {
  return (
    <div>
          <Table>
              <TableCaption>Previous Consultation Reports</TableCaption>
              <TableHeader>
                  <TableRow>
                      <TableHead >Ai Medical Specilist</TableHead>
                      <TableHead >Description</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                {historyList.map((record:SessionDetail ,index:number)=>(
                    <TableRow key={index}>
                      <TableCell className="font-medium">{record.selectedDoctor.specialist}</TableCell>
                      <TableCell>{record.notes}</TableCell>
                      <TableCell>{ moment(new Date(record.createdOn)).fromNow()}</TableCell>
                      <TableCell className="text-right"><ViewReportDialog record={record as SessionDetail & { report?: Report }} /></TableCell>
                  </TableRow>
                  ))
                }
                  
              </TableBody>
          </Table>
    </div>
  )
}

export default HistoryTable