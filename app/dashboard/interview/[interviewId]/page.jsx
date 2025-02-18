"use client"
import { Button } from '@/components/ui/button';
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import { Lightbulb, WebcamIcon } from 'lucide-react';
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
        <div className='my-10 '>
            <h2 className='font-bold text-2xl '>Let's get started</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>

                <div className='flex flex-col my-5 gap-5 p-5 rounded-lg border'>
                    <div className='flex flex-col p-5 rounded-lg border gap-5'>
                        <h2 className='text-lg'>Job Role/ Job Position: {interviewData.jobPosition}</h2>
                        <h2 className='text-lg'>Job Description/ Tech Stack: {interviewData.jobDesc}</h2>
                        <h2 className='text-lg'>Years of Experience {interviewData.jobExperience}</h2>
                    </div>
                    <div className='p-5 border rounded-lg border-yellow-300 bg-yellow-100'>
                        <h2 className='flex items-center gap-2 text-yellow-500'><Lightbulb /><strong>Information</strong></h2>
                        <p className='mt-3 text-yellow-500'>Enable Video Web cam and Microphone to start your AI Generated Mock Interview. It has 5 questions on the basis of your answer. NOTE: we never record your video, web cam access you can disable at any time if you want</p>

                    </div>

                </div>
                <div className=''>
                    {webCamEnable
                        ? <Webcam
                            onUserMedia={() => setWebCamEnable(true)}
                            onUserMediaError={() => setWebCamEnable(false)}
                            mirrored={true}
                            style={{ height: 300, width: 300 }} />
                        :
                        <>
                            <WebcamIcon className='h-72 w-full my-7 p-20 bg-secondary rounded-lg border' />
                            <Button variant="ghost" onClick={() => setWebCamEnable(true)}>Enable Web cam & Microphone</Button>
                        </>
                    }

                </div>
            </div>
            <div className='flex justify-end items-end'>
                <Button >Start Interview</Button>
            </div>


        </div>
    )
}

export default Interview
