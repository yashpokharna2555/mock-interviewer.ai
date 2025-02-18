import { Button } from '@/components/ui/button'
import { Webcam } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const RecordAnswer = () => {
    return (
        <div className='flex items-center flex-col justify-center'>
            <div className='mt-20 flex flex-col justify-center items-center rounded-lg p-5 bg-black'>
                <Image src={'/'} alt='webcam image' width={200} height={200} className='absolute' />
                <Webcam
                    mirrored={true}
                    style={{
                        height: 300,
                        width: '100%',
                        zIndex: 10,
                    }}
                />
            </div>

            <Button className='my-10' variant="outline">Record Answer</Button>
        </div>
    )
}

export default RecordAnswer
