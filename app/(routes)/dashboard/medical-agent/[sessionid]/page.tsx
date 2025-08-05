import { useParams } from 'next/navigation'
import React from 'react'

function MedicalVoiceAgent() {
    const {sessionid}=useParams()
  return (
    <div>Medical Voice Agent {sessionid}</div>
  )
}

export default MedicalVoiceAgent