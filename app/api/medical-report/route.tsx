import { db } from "@/config/db";
import { openai } from "@/config/OpenAiModels";
import { SessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest,NextResponse } from "next/server"

const REPORT_GEN_PROPMT =`You are an Al Medical Voice Agent that just finished a voice conversation with a user.  generate a structured report with the following fields:
            I. sessionld: a unique session identifier
            2. agent: the medical specialist name (e.g., "General Physician Al")
            3. user: name Of the patient or "Anonymous" if not provided
            4. timestamp: current date and time in ISO format
            5. chiefComplaint: one-sentence summary of the main health concern
            6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
            7. symptoms: list of symptoms mentioned by the user
            8. duration: how long the user has experienced the symptoms
            q. severity: mild, moderate, or severe
            10. medicationsMentioned: list Of any medicines mentioned
            11. recommendations: list of Al suggestions (e.g., rest, see a doctor)
            Return the result in this JSON format:
            "sessionld": "string"
            "agent": "string",
            "user": "string"
            "timestamp": "ISO Date string",
            "chiefComplaint": "string",
            "summary": "string",
            "symptoms": ["symptoml", "symptom2"],
            "duration": "string"
            "severity": "string"
            "medicationsMentioned": ["medl "i "med2"],
            "recommendations": ["recl "rec2"],
            Only include valid fields. Respond with nothing else. if  no recomendation and medicines to fill details for symptoms for your knowledge 
            Depends on Users  problems and conversations between  Ai Medical Agent and User`

export async function POST(req:NextRequest) {
    const{sessionId,sessionDetail,messages}=await req.json();
    console.log("wait ra ruba", sessionId,sessionDetail,messages);
    try {
        const UserInput="Ai Doctor Agent Info:"+JSON.stringify(sessionDetail)+", Conversation:"+JSON.stringify(messages);
        
        const completion = await openai.chat.completions.create({
                model: "mistralai/mistral-small-3.2-24b-instruct:free",
                messages: [
                    {role:'system', content:REPORT_GEN_PROPMT},
                    { role: "user", content: UserInput }
                ],
            });
            const rawResponse = completion.choices[0].message;
            //@ts-ignore
            const Resp=rawResponse.content.trim().replace('```json','').replace('```','');
            const JSONResp =JSON.parse(Resp);

            //save to Database
            const  result =await db.update(SessionChatTable).set({
                report:JSONResp
            }).where(eq(SessionChatTable.sessionId,sessionId));
            
            return NextResponse.json(JSONResp);
    } catch (error) {
        return NextResponse.json(error)
        
    }

    
}