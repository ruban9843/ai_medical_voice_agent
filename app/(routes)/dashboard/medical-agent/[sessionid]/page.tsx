"use client"
import axios from 'axios';
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { doctorAgent } from '../../_components/DoctorAgentCard';
import { Circle, Loader2, PhoneCall, PhoneOff } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Vapi from '@vapi-ai/web';
import { useRouter } from 'next/router';
import { toast } from 'sonner';

export type SessionDetail={
  id:number,
  notes:string,
  sessionId:string,
  report:JSON,
  selectedDoctor:doctorAgent,
  createdOn:string,
  voiceId:string
}
type messages ={
  role:string,
  text:string
}

function  MedicalVoiceAgent() {
  const {sessionId}=useParams();
  const [sessionDetail,setSessionDetail]=useState<SessionDetail>();
  const [callStarted,setCallStarted]=useState(false);
  const [vapiInstance,setVapiInstance]=useState<any>();
  const [currentRoll,setCurrentRole]=useState<String|null>()
  const [liveTranscript,setLiveTranscript]=useState<String>();
  const [messages,setMessages]=useState<messages[]>([]);
  const [loading,setLoading]=useState(false);
  const router =useRouter()

  useEffect(()=>{
      sessionId && GetSessionDetails()
    },[sessionId]
  )

  const GetSessionDetails = async () => {
    const result = await axios.get('/api/session-chat?sessionId=' + sessionId)
    console.log("ruban1", result.data);
    setSessionDetail(result.data)
  }

  const StartCall = async () => {
    if (!sessionDetail?.selectedDoctor) {
      console.error("No doctor selected");
      return;
    }

    setLoading(true);

    try {
      const vapi = new Vapi(process.env.NEXT_PUBLIC_VAPI_API_KEY!);
      setVapiInstance(vapi);

      const appId = (sessionDetail.selectedDoctor.id === 4 || sessionDetail.selectedDoctor.id === 5 || sessionDetail.selectedDoctor.id === 6 || sessionDetail.selectedDoctor.id === 7 ||sessionDetail.selectedDoctor.id === 8)
        ? process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID2
        : process.env.NEXT_PUBLIC_VAPI_VOICE_ASSISTANT_ID1;

      if (!appId) {
        throw new Error("Missing VAPI App ID");
      }

      await vapi.start(appId);

      vapi.on('call-start', () => {
        setLoading(false);
        console.log('Call started');
        setCallStarted(true);
      });

      vapi.on('call-end', () => {
        console.log('Call ended');
        setCallStarted(false);
      });

      vapi.on('message', (message) => {
        if (message.type === 'transcript') {
          const { role, transcriptType, transcript } = message;
          console.log(`${role}: ${transcript}`);
          if (transcriptType === 'partial') {
            setLiveTranscript(transcript);
            setCurrentRole(role);
          } else if (transcriptType === 'final') {
            setMessages((prev: any) => [...prev, { role, text: transcript }]);
            setLiveTranscript("");
            setCurrentRole(null);
          }
        }
      });

      vapi.on('speech-start', () => {
        console.log('Assistant started speaking');
        setCurrentRole('assistant');
      });

      vapi.on('speech-end', () => {
        console.log('Assistant stopped speaking');
        setCurrentRole('user');
      });

    } catch (error) {
      console.error('Error starting call:', error);
      setLoading(false);
    }
  };


  const endCall = async () => {
      if(!vapiInstance) return;
      setLoading(true);
      vapiInstance.on('call-end', async () => {
        console.log('Call ended - generating report now...');
        const result = await GenerateReport();
        console.log("Report generated:", result);
        setLoading(false);
      });
      vapiInstance.stop();
      vapiInstance.off('call-start');
      vapiInstance.off('call-end');
      vapiInstance.off('message');
      vapiInstance.off('speech-start');
      vapiInstance.off('speech-end');
      setCallStarted(false);
      setVapiInstance(null);
      toast.success('your report is generated!')
      router.replace('/dashboard')

  };

  const GenerateReport = async()=>{
    console.log("its calling")
    const result =await axios.post('/api/medical-report',{
      messages:messages,
      sessionDetail:sessionDetail,
      sessionId:sessionId
    })
    console.log(result.data);
    return result.data;
  }



return (
    <div className="p-10 border bg-secondary rounded=3xl">
      <div className="flex justify-between items-center">
        <h1 className='p-1 px-2 border rounded-md flex gap-2 items-center'><Circle className={`h-4 w-4 ${callStarted?'bg-green-500':'bg-red-500'}`}/>{callStarted?'connected...':'Not connected'}</h1>
        <h2 className="font-bold text-xl text-gray-400">00:00</h2>
      </div>
      {sessionDetail &&<div className='flex items-center flex-col mt-10'>
          <Image src={sessionDetail?.selectedDoctor?.image} alt={sessionDetail?.selectedDoctor?.specialist??''}  width={120}  height={120} className='h-[100px] w-[100px] object-cover rounded-full '/>
          <h2>{sessionDetail.selectedDoctor.specialist}</h2>
          <p className='text-sm text-gray-400'>AI Medical Voice Agent</p>

          <div className="mt-12 overflow-y-auto flex flex-col items-center px-10 md:px-28 lg:px-52 xl:px-72">
            {messages?.slice(-4).map((msg:messages,index)=>(
              <div key={index} className="">
                <h2 className='text-gray-400 p-2'>{msg.role} : {msg.text}</h2>
              </div>
            ))

            }
          </div>

          <div className="mt-32">
            {/* <h2 className='text-gray-400'>Assistent Msg</h2> */}
           {liveTranscript && liveTranscript?.length>0 &&  <h1 className='text-lg'>{currentRoll}:{liveTranscript}</h1>}
           </div>

          { !callStarted?
            <Button className='mt-50' disabled={loading} onClick={StartCall}>{loading ? <Loader2 className='animate-spin' /> : <PhoneCall/>} Start Call</Button> 
            :<Button  variant={'destructive'} disabled={loading} onClick={endCall}> {loading ? <Loader2 className='animate-spin' /> :<PhoneOff/>} Disconnect</Button>}
        </div>}
    </div>
  )
}

export default MedicalVoiceAgent