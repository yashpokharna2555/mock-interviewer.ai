"use client"
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { WebcamIcon } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import Webcam from 'react-webcam';

const Interview = ({ params }) => {
    const [interviewData, setInterviewData] = useState()
    const [webCamEnable, setWebCamEnable] = useState(false)
    useEffect(() => {
        console.log(params);
        GetInterviewDetails()
    }, [])

    const GetInterviewDetails = async () => {
        const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, params.interviewId))
        console.log(result);
        setInterviewData(result[0]);
    }
    return (
        <div className='my-10 flex justify-center flex-col items-center'>
            <h2 className='font-bold text-2xl '>Let's get started</h2>
            <div className=''>
                {webCamEnable 
                    ? <Webcam 
                        onUserMedia={()=>setWebCamEnable(true)} 
                        onUserMediaError={()=>setWebCamEnable(false)} 
                        mirrored={true}
                        style={{ height: 300, width: 300 }} /> 
                    : 
                    <>
                        <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
                        <Button onClick={() => setWebCamEnable(true)}>Enable Web cam & Microphone</Button>
                    </>
                }

            </div>
            <div className='flex flex-col my-5'>
                <h2 className='text-lg'>Job Role/ Job Position: {interviewData.jobPosition}</h2>
                <h2 className='text-lg'>Job Description/ Tech Stack: {interviewData.jobDesc}</h2>
                <h2 className='text-lg'>Years of Experience {interviewData.jobExperience}</h2>
            </div>
        </div>
    )
}

export default Interview
