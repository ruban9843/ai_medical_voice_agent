import { db } from "@/config/db";
import { openai } from "@/config/OpenAiModels";
import { SessionChatTable } from "@/config/schema";
import { eq } from "drizzle-orm";
import { NextRequest,NextResponse } from "next/server"

const REPORT_GEN_PROPMT =`You are an AI Medical Voice Agent that just finished a voice conversation with a user. 
                            Your task is to generate a structured medical consultation report in JSON format with the following fields:

                            1. sessionId: a unique session identifier
                            2. agent: the medical specialist name (e.g., "General Physician AI")
                            3. user: name of the patient or "Anonymous" if not provided
                            4. timestamp: current date and time in ISO format
                            5. chiefComplaint: one-sentence summary of the main health concern
                            6. summary: a 2-3 sentence summary of the conversation, symptoms, and recommendations
                            7. symptoms: list of symptoms mentioned by the user
                            8. duration: how long the user has experienced the symptoms
                            9. severity: mild, moderate, or severe
                            10. medicationsMentioned: list of any medicines mentioned. 
                                - If the user did not mention any medicine, infer and suggest over-the-counter or commonly used medications based on the symptoms (do not leave this empty).
                            11. recommendations: list of AI suggestions (e.g., rest, see a doctor).
                                - If the user did not ask for or receive explicit recommendations, infer and provide medically reasonable general recommendations based on the symptoms (do not leave this empty).

                            Return ONLY the JSON object in the following format:

                            {
                            "sessionId": "string",
                            "agent": "string",
                            "user": "string",
                            "timestamp": "ISO Date string",
                            "chiefComplaint": "string",
                            "summary": "string",
                            "symptoms": ["symptom1", "symptom2"],
                            "duration": "string",
                            "severity": "string",
                            "medicationsMentioned": ["med1", "med2"],
                            "recommendations": ["rec1", "rec2"]
                            }

                            Rules:
                            - Do not include any text outside of the JSON.
                            - Fill in medicationsMentioned and recommendations even if not explicitly mentioned in the conversation, using your medical knowledge and the provided symptoms.
                            - Keep the suggestions safe and general (no prescription-only drugs unless clearly mentioned by the user).`

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