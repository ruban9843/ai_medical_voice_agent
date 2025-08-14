

export type doctorAgent ={
    id:number,
    specialist: string,
    description: string,
    image: string,
    agentPrompt: string,
    voiceId: string,
    subscriptionRequired: boolean
}

export type SessionDetail={
  id:number,
  notes:string,
  sessionId:string,
  report:JSON,
  selectedDoctor:doctorAgent,
  createdOn:string,
  voiceId:string
}

export interface Report {
  sessionId: string;
  agent: string;
  user: string;
  timestamp: string;
  chiefComplaint: string;
  summary: string;
  symptoms: string[];
  duration: string;
  severity: string;
  medicationsMentioned: string[];
  recommendations: string[];
}