"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "./src/components/button"
import { RadioGroup, RadioGroupItem } from "./src/components/radio-group"
import { Label } from "./src/components/label"
import { Trophy, DollarSign } from "lucide-react"
import Image from "next/image"
import PriceAnchoring from "./src/components/PriceAnchoring"
import styles from './src/styles/animations.module.css'
import { trackQuizStep, useTikTokClickIdCapture } from "./src/utils/tracking"

// Add animated border keyframes for progress
const progressBarStyles = `
  @keyframes progress {
    from { width: 100%; }
    to { width: 0%; }
  }
  
  @keyframes progressReverse {
    from { width: 0%; }
    to { width: 100%; }
  }

  @keyframes borderGlow {
    0% {
      border-color: #ff0000;
      box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
    }
    25% {
      border-color: #ff6600;
      box-shadow: 0 0 20px rgba(255, 102, 0, 0.5);
    }
    50% {
      border-color: #ffff00;
      box-shadow: 0 0 20px rgba(255, 255, 0, 0.5);
    }
    75% {
      border-color: #ff6600;
      box-shadow: 0 0 20px rgba(255, 102, 0, 0.5);
    }
    100% {
      border-color: #ff0000;
      box-shadow: 0 0 20px rgba(255, 0, 0, 0.5);
    }
  }

  @keyframes discountShine {
    0% {
      background-position: -100% 0;
    }
    100% {
      background-position: 100% 0;
    }
  }

  .discount-progress-bar {
    background: linear-gradient(90deg, #88ff59, #1eff00, #88ff59);
    background-size: 200% 100%;
    animation: discountShine 2s ease-in-out infinite;
    position: relative;
    overflow: hidden;
  }

  .discount-progress-bar::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
    animation: discountShine 2s ease-in-out infinite;
  }

  .animated-border {
    position: relative;
    overflow: hidden;
  }

  .animated-border::before {
    content: '';
    position: absolute;
    top: -2px;
    left: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(45deg, #ff0000, #ff6600, #ffff00, #ff6600, #ff0000);
    background-size: 300% 300%;
    border-radius: 14px;
    z-index: -1;
    animation: borderAnimation 3s ease-in-out infinite;
  }

  @keyframes borderAnimation {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  .progress-container {
    width: 100%;
    height: 8px;
    background-color: #e5e7eb;
    border-radius: 9999px;
    overflow: hidden;
  }

  .progress-bar {
    height: 100%;
    background: linear-gradient(to right, #ca2020, #ff0000);
    border-radius: 9999px;
    transition: width 0.1s linear;
  }
`

// Declare global types for tracking pixels
declare global {
  interface Window {
    fbq?: any
    ttq?: any
    utmify?: any
    dataLayer?: any[]
  }
}

interface Question {
  id: number
  question: string
  options: string[]
  correct: number
  explanation: string
}

const questions: Question[] = [
  {
    id: 1,
    question: "When choosing the perfect perfume, what matters most to you?",
    options: ["The scent / fragrance notes 🌸", "How long it lasts on the skin ⏳", "The brand ✨", "The price 💷"],
    correct: 0,
    explanation: "The fragrance notes are the heart of any great perfume!",
  },
  {
    id: 2,
    question: "Where do you usually discover new perfumes?",
    options: ["In physical stores 🏬", "On social media 📱", "Through online ads 💻", "From friends or family 👥"],
    correct: 0,
    explanation: "Physical stores offer the best experience to test and discover new scents!",
  },
  {
    id: 3,
    question: "How often do you buy a new perfume?",
    options: ["Once a year", "Two to three times a year", "Every season (four times a year)", "Monthly or more"],
    correct: 0,
    explanation: "Taking time to choose the perfect perfume makes each purchase special!",
  },
  {
    id: 4,
    question: "What influences your decision the most when buying a new perfume?",
    options: ["Recommendations from friends or family", "Online reviews", "Testing in store", "Promotions or discounts"],
    correct: 0,
    explanation: "Personal recommendations from trusted people are invaluable when choosing fragrances!",
  },
  {
    id: 5,
    question: "Which type of promotion interests you the most?",
    options: ["Direct discount on price", "Multi-product kits", "Free samples with purchase", "Cashback or loyalty points"],
    correct: 0,
    explanation: "Direct discounts provide immediate value on your favorite fragrances!",
  },
  {
    id: 6,
    question: "Do you usually buy perfumes more for yourself or as gifts?",
    options: ["For myself 🎁", "As a gift 🎀", "Both equally ⚖️", "Depends on the occasion 🗓️"],
    correct: 0,
    explanation: "Treating yourself to a beautiful fragrance is always a wonderful choice!",
  },
]

// Success notification component
const SuccessNotification = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose()
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="fixed top-4 right-4 z-50 animate-in slide-in-from-right-full duration-300">
      <div className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
        <span className="font-medium">Correct answer!</span>
      </div>
    </div>
  )
}

// Falling heart animation component
const FallingHeart = ({ delay }: { delay: number }) => (
  <div 
    className={`absolute text-red-500 text-2xl pointer-events-none ${styles.fall}`}
    style={{
      left: `${Math.random() * 100}%`,
      top: '-50px',
      animationDelay: `${delay}ms`
    }}
  >
    ❤️
  </div>
)

// Loading spinner component
const LoadingSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  }

  return (
    <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-gray-300 border-t-red-600`}></div>
  )
}

// Main Quiz Component
export default function PerfumeQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string>("")
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [hearts, setHearts] = useState<number[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [showPriceAnchoring, setShowPriceAnchoring] = useState(false)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [isTimerActive, setIsTimerActive] = useState(false)
  
  // Initialize TikTok Click ID capture
  useTikTokClickIdCapture()

  // Timer effect
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, isTimerActive])

  // Format time for display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  // Handle answer selection
  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value)
  }

  // Handle next question
  const handleNext = () => {
    if (!selectedAnswer) return

    setIsLoading(true)
    
    // Track quiz step
    trackQuizStep('question_answered', { questionNumber: currentQuestion + 1, isCorrect: parseInt(selectedAnswer) === questions[currentQuestion].correct })

    setTimeout(() => {
      const isCorrect = parseInt(selectedAnswer) === questions[currentQuestion].correct
      
      if (isCorrect) {
        setCorrectAnswers(prev => prev + 1)
        setShowSuccess(true)
        
        // Add falling hearts animation
        const newHearts = Array.from({ length: 5 }, (_, i) => Date.now() + i)
        setHearts(newHearts)
        
        setTimeout(() => {
          setHearts([])
        }, 3000)
      }

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedAnswer("")
      } else {
        setShowResult(true)
        setIsTimerActive(false)
        trackQuizStep('quiz_completed')
        
        // Show price anchoring after a short delay
        setTimeout(() => {
          setShowPriceAnchoring(true)
        }, 2000)
      }
      
      setIsLoading(false)
    }, 1000)
  }

  // Start quiz
  const startQuiz = () => {
    setIsTimerActive(true)
    trackQuizStep('quiz_started')
  }

  // Restart quiz
  const restartQuiz = () => {
    setCurrentQuestion(0)
    setSelectedAnswer("")
    setCorrectAnswers(0)
    setShowResult(false)
    setShowPriceAnchoring(false)
    setTimeLeft(300)
    setIsTimerActive(false)
    trackQuizStep('quiz_restarted')
  }

  // Calculate progress percentage
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: progressBarStyles }} />
      
      <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 py-8 px-4 relative overflow-hidden">
        {/* Falling hearts */}
        {hearts.map((heart) => (
          <FallingHeart key={heart} delay={0} />
        ))}
        
        {/* Success notification */}
        <SuccessNotification show={showSuccess} onClose={() => setShowSuccess(false)} />
        
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <Image
                src="/logo.svg"
                alt="Perfume Quiz Logo"
                width={120}
                height={60}
                className="h-12 w-auto"
              />
            </div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Discover Your Perfect Fragrance
            </h1>
            <p className="text-gray-600">
              Take our quiz to find your ideal perfume match
            </p>
          </div>

          {!isTimerActive && currentQuestion === 0 ? (
            /* Start Screen */
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="mb-6">
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Ready to Find Your Signature Scent?
                </h2>
                <p className="text-gray-600">
                  Answer 6 quick questions to discover perfumes that match your style and preferences.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="text-center">
                    <Image
                      src={`/per${i}.png`}
                      alt={`Perfume ${i}`}
                      width={80}
                      height={80}
                      className="mx-auto mb-2 rounded-lg"
                    />
                    <p className="text-sm text-gray-600">Premium Fragrance</p>
                  </div>
                ))}
              </div>
              
              <Button 
                onClick={startQuiz}
                size="lg"
                className="w-full md:w-auto px-8 py-3 text-lg font-semibold"
              >
                Start Quiz
              </Button>
            </div>
          ) : showResult ? (
            /* Results Screen */
            <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
              <div className="mb-6">
                <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Quiz Complete!
                </h2>
                <p className="text-lg text-gray-600 mb-4">
                  You got {correctAnswers} out of {questions.length} questions right!
                </p>
                
                <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-lg p-4 mb-6">
                  <p className="text-gray-700 font-medium">
                    Based on your answers, we've selected the perfect fragrances for you!
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={restartQuiz}
                  variant="outline"
                  className="px-6 py-2"
                >
                  Take Quiz Again
                </Button>
              </div>
            </div>
          ) : (
            /* Quiz Questions */
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {/* Progress bar */}
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-600">
                    Question {currentQuestion + 1} of {questions.length}
                  </span>
                  <span className="text-sm font-medium text-red-600">
                    ⏰ {formatTime(timeLeft)}
                  </span>
                </div>
                <div className="progress-container">
                  <div 
                    className="progress-bar" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Question */}
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-6">
                  {questions[currentQuestion].question}
                </h2>
                
                <RadioGroup value={selectedAnswer} onValueChange={handleAnswerSelect}>
                  <div className="space-y-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3 p-4 rounded-lg border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-colors cursor-pointer">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label 
                          htmlFor={`option-${index}`} 
                          className="flex-1 cursor-pointer text-gray-700 font-medium"
                        >
                          {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </div>

              {/* Next button */}
              <div className="flex justify-end">
                <Button 
                  onClick={handleNext}
                  disabled={!selectedAnswer || isLoading}
                  className="px-8 py-2 font-semibold"
                >
                  {isLoading ? (
                    <LoadingSpinner size="sm" />
                  ) : currentQuestion === questions.length - 1 ? (
                    "Finish Quiz"
                  ) : (
                    "Next Question"
                  )}
                </Button>
              </div>
            </div>
          )}
          
          {/* Price Anchoring Component */}
          {showPriceAnchoring && (
            <div className="mt-8">
              <PriceAnchoring 
                correctAnswers={correctAnswers}
                onBuyClick={(selectedKit: any) => {
                  console.log('Selected kit:', selectedKit)
                  trackQuizStep('kit_selected', { selectedKit })
                }}
              />
            </div>
          )}
        </div>
      </div>
    </>
  )
}