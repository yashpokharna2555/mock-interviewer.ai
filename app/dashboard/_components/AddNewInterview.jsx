"use client"
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { chatSession } from '@/utils/GeminiAiModal';
import { LoaderCircle } from 'lucide-react';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { v4 as uuidv4 } from 'uuid'
import { useUser } from '@clerk/nextjs';
import moment from 'moment/moment';
import { useRouter } from 'next/navigation';


const AddNewInterview = () => {
    const [openDialog, setOpenDialog] = useState(false);
    const [jobPosition, setJobPosition] = useState();
    const [jobDesc, setJobDesc] = useState();
    const [jobExp, setJobExp] = useState();
    const [loading, setLoading] = useState(false);
    const [jsonResponse, setJsonResponse] = useState([])
    const router = useRouter()
    const { user } = useUser();

    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault();
        console.log(jobDesc);

        const InputPrompt = "Job Position: " + jobPosition + ", Job Description: " + jobDesc + ", Years of Expirence: " + jobExp + ". Depends on Job Position Description and Years of Expirence give us 5 questions alonf=g with Answer in JSON Format. Give us question and answer field on JSON"
        const result = await chatSession.sendMessage(InputPrompt)
        const mockJsonResp = (result.response.text()).replace('```json', '').replace('```', '')
        console.log(mockJsonResp);
        setJsonResponse(mockJsonResp)
        if (mockJsonResp) {
            const resp = await db.insert(MockInterview)
                .values({
                    mockId: uuidv4(),
                    jsonMockResp: mockJsonResp,
                    jobPosition: jobPosition,
                    jobDesc: jobDesc,
                    jobExperience: jobExp,
                    createdBy: user?.primaryEmailAddress?.emailAddress,
                    createdAt: moment().format('DD-MM-yyyy')
                }).returning({ mockId: MockInterview.mockId })

            console.log("Inserted Id: ", resp);
            if(resp) {
                setOpenDialog(false)
                router.push('/dashboard/interview/'+resp[0]?.mockId)
            }
        } else {
            console.log("Error");
            
        }


        setLoading(false)

    }
    return (
        <div>
            <div onClick={() => setOpenDialog(true)} className='p-10 border rounded-lg bg-secondary hover:scale-105 hover:shadow-md cursor-pointer transition-all'>
                <h2 className='font-bold text-lg text-center'>+ Add New</h2>
            </div>
            <Dialog open={openDialog}>

                <DialogContent className='max-w-2xl'>
                    <DialogHeader>
                        <DialogTitle>Tell us more about your job interviewing</DialogTitle>
                        <DialogDescription>
                            <form action="" onSubmit={onSubmit}>
                                <div>

                                    <h2 className='text-2xl'>Add Details about your job position/role, Job description and years of expirence</h2>
                                    <div className='mt-7 my-3'>
                                        <label htmlFor="">Job Role/Job Position</label>
                                        <Input onChange={(e) => setJobPosition(e.target.value)} placeholder="Ex. Full Stack Developer" required />
                                    </div>

                                    <div className='my-3'>
                                        <label htmlFor="">Job Description/ Tech Stack(In Short)</label>
                                        <Textarea onChange={(e) => setJobDesc(e.target.value)} placeholder="Ex. React, Angular, NodeJs etc" required />
                                    </div>

                                    <div className='my-3'>
                                        <label htmlFor="">Years of expirence</label>
                                        <Input onChange={(e) => setJobExp(e.target.value)} placeholder="Ex. 5" type="number" required />
                                    </div>
                                </div>
                                <div className='flex gap-5 justify-end'>
                                    <Button type="button" variant="ghost" onClick={() => setOpenDialog(false)}>Cancel</Button>
                                    <Button type="submit" disabled={loading}>
                                        {
                                            loading ? <LoaderCircle className='animate-spin' /> : 'Start Interview'
                                        }
                                    </Button>
                                </div>
                            </form>
                        </DialogDescription>

                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default AddNewInterview
