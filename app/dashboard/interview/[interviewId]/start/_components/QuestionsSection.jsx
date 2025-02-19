import { Lightbulb, Volume2 } from 'lucide-react'
import React from 'react'

const QuestionsSection = ({mockInterviewQuestion, activeQuestionIndex}) => {

    const textToSpeach = (text) => {
        if('sppechSynthesis' in window) {
            const sppech = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(speech)
        } else {
            alert('Sorry, your browser not support speech to text')
        }
    }
  return mockInterviewQuestion&& (
    <div className='p-5 border rounded-lg my-10'>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {mockInterviewQuestion && mockInterviewQuestion.map((question,idx)=>(
            <h2 className={`p-2 bg-secondary rounded-full text-sm md:text-sm text-center cursor-pointer ${activeQuestionIndex == idx && 'bg-primary text-white'}`}>Question #{idx+1}</h2>
        ))}

        
      </div>
      <h2 className='my-5 text-md md:text-lg'>{mockInterviewQuestion[activeQuestionIndex]?.question}</h2>
        <Volume2 className='currsor-pointer' onClick={()=>textToSpeach(mockInterviewQuestion[activeQuestionIndex]?.question)}/>
      <div className='border rounded-lg p-5 bg-blue-100 mt-20'>
        <h2 className='flex gap-2 items-center text-primary'>
            <Lightbulb />
            <strong>Note: </strong>
        </h2>
        <h2 className='text-sm text-primary my-2'>Click on Record Answer when you want to answer the question. At the end of interview we will give you feedback along with correct answer for each of question and your answer to compare it.</h2>
      </div>
    </div>
  )
}

export default QuestionsSection
