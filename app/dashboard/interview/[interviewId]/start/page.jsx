"use client"
import { db } from '@/utils/db';
import { MockInterview } from '@/utils/schema';
import { eq } from 'drizzle-orm';
import React, { useEffect, useState } from 'react'
import QuestionsSection from './_components/QuestionsSection';
import RecordAnswer from './_components/RecordAnswer';

const StartInterview = ({ params }) => {
    const [interviewData, setInterviewData] = useState()
    const [mockInterviewQuestion, setMockInterviewQuestion] = useState()
    const interviewId = React.use(params).interviewId; // Unwrap the params to access interviewId
    const [activeQuestionIndex, setActiveQuestionIndex] = useState(0)
    useEffect(() => {
        if (interviewId) {
            GetInterviewDetails();
        }
    }, [interviewId]) // Trigger effect when interviewId changes

    const GetInterviewDetails = async () => {
        try {
            console.log("Interview ID:", interviewId); // Log interviewId to verify it's correct
            const result = await db.select().from(MockInterview).where(eq(MockInterview.mockId, interviewId));

            console.log("DB Query Result:", result);
            console.log(result[0].jsonMockResp);
            
            if (!result.length || !result[0].jsonMockResp) {
                console.error("No valid interview data found for ID:", interviewId);
                return;
            }

            const jsonMockResponse = JSON.parse(result[0].jsonMockResp);
            console.log("Parsed JSON:", jsonMockResponse);

            setMockInterviewQuestion(jsonMockResponse);
            setInterviewData(result[0]);
        } catch (error) {
            console.error("Error fetching interview data:", error);
        }
    };

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
            {/* Questions */}
            <QuestionsSection mockInterviewQuestion={mockInterviewQuestion} activeQuestionIndex={activeQuestionIndex} />
            {/* Video audio recording */}
            <RecordAnswer />
        </div>
    )
}

export default StartInterview
