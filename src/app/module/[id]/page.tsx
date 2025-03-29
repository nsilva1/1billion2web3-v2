'use client'

import React, { useState, useEffect } from 'react'
import { updateUserProgress } from '@/actions/user'
import { toast } from 'react-toastify'
import { redirect, useParams, useRouter } from 'next/navigation'
import { auth } from '@/lib/auth'
import { module1, module2, module3, module4, module5, module6, module7, module8, module9 } from '@/lib/constants'
import Image from 'next/image'
import logo from '@/images/1b2web3.jpg'


export interface QuizQuestions {
  question: string
  options: string[]
  answer: string
}

const QuizScreen = async () => {
  const { id } = useParams()
  const moduleNumber = parseInt(id as string)

  const router = useRouter()

  const session = await auth();
  if (!session) redirect('/login');

  const [questions, setQuestions] = useState<QuizQuestions[]>([]);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [questionAnswer, setQuestionAnswer] = useState('');
  const [loading, setLoading] = useState(false)

  const questionLength = questions.length;

  const saveProgress = (module: number) => {
    if (session.user && session.user.email) {
      updateUserProgress(module, session.user.email)
        .then((response) => {
          if (response.success) {
            toast.success('Progress Saved!');
          }
        }).then(() => {
          router.push(`/module/${moduleNumber}/success`)
        })
        .catch(() => {
          toast.error('Error saving progress');
        })
    } else {
      toast.error('User session is invalid. Please login again');
      redirect('/login');
    }
};

  const submitScore = () => {
    setLoading(true)

    try {
      switch (moduleNumber) {
        case 1:
          saveProgress(2)
          break;
        case 2:
          saveProgress(3)
          break;
        case 3:
          saveProgress(4)
          break;
        case 4:
          saveProgress(5)
          break;
        case 5:
          saveProgress(6)
          break;
        case 6:
          saveProgress(7)
          break;
        case 7:
          saveProgress(8)
        case 8:
          saveProgress(9)
          break;
        case 9:
          router.push(`/module/${moduleNumber}/success`)
        default:
          break;
      }
    } catch (error) {
      toast.error('Error submitting score')
    } finally {
      setLoading(false)
    }
  }

  const checkAnswer = (e: any) => {
    e.preventDefault()

    if(questionAnswer === ''){
      toast.info('Please select a valid option.')
      return;
    }

    const currentQuestion = questions[questionNumber]
    const correctAnswer = currentQuestion.answer

    if(questionAnswer.toLowerCase() != correctAnswer.toLowerCase()){
      toast.error('Incorrect Option. Try Again')
      return;
    }

    if(questionNumber === questionLength - 1){
      submitScore()
      return;
    }

    setQuestionNumber((questionNumber) => questionNumber + 1);
    setQuestionAnswer('')
  }


  useEffect(() => {
    switch(moduleNumber) {
      case 1:
        setQuestions(module1)
        break
      case 2:
        setQuestions(module2)
        break
      case 3:
        setQuestions(module3)
        break
      case 4:
        setQuestions(module4)
        break
      case 5:
        setQuestions(module5)
        break
      case 6:
        setQuestions(module6)
        break
      case 7:
        setQuestions(module7)
        break
      case 8:
        setQuestions(module8)
        break
      case 9:
        setQuestions(module9)
        break
      default:
        setQuestions([])
        break
    }
  },[moduleNumber])


  return (
    <div>
        <div className='grid grid-cols-1 place-items-center'>
          <div className='col-span-1'>
            <Image src={logo} alt='1Billion2Web3' className='w-[100px] h-[100px]' />
            <h3 className='font-bold text-3xl my-4'>Module {moduleNumber}</h3>
          </div>
        </div>
        <div className='bg-white rounded-2xl shadow-2xl'>

        </div>
    </div>
  )
}

export default QuizScreen