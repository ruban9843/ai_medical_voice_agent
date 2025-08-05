import { openai } from "@/config/OpenAiModels";
import { AIDoctorAgents } from "@/shared/list";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const {notes}=await req.json()
    try {
        const completion = await openai.chat.completions.create({
            model: "mistralai/mistral-small-3.2-24b-instruct:free",
            messages: [
                {role:'system', content:JSON.stringify(AIDoctorAgents)},
                { role: "user", content: "User Notes/symptoms"+notes+"Depends on User notes anmd symptoms, please suggest list of doctor , Return the Object in JSON only" }
            ],
        });
        const rawResponse = completion.choices[0].message;
        //@ts-ignore
        const Resp=rawResponse.content.trim().replace('```json','').replace('```','');
        const JSONResp =JSON.parse(Resp);
        return NextResponse.json(JSONResp);
    } catch (e) {
        return NextResponse.json(e)
    }


}