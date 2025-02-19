"use client"
import { Button } from '@/components/ui/button'
import { Mic, Webcam } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import useSpeechToText from 'react-hook-speech-to-text';

const RecordAnswer = () => {
    const [userAns, setUserAns] = useState('')
    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    });

    useEffect(()=> {
        results.map((res) => {
            setUserAns(prevAns=> prevAns+results?.transcript)
        })
    }, [results])

    return (
        <div className='flex items-center flex-col justify-center'>
            <div className='mt-20 flex flex-col justify-center items-center rounded-lg p-5 bg-black'>
                <Image src={'/'} alt='webcam image' width={200} height={200} className='absolute' />
                <Webcam
                    mirrored="true"
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10,
                    }}
                />
            </div>

            <Button onClick={isRecording?stopSpeechToText: startSpeechToText} className='my-10' variant="outline">
                {isRecording ?
                    <h2 className='text-red-600 flex gap-2'><Mic/>'Recording...'</h2> 
                    : 'Record Answer'
                }
                
            </Button>


            
        </div>
    )
}

export default RecordAnswer
