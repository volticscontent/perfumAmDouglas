"use client"

import React, { useState, useEffect, useRef, useCallback } from "react"
import { Button } from "./button"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import { Label } from "./label"
import { Trophy, DollarSign } from "lucide-react"
import PriceAnchoring from "../../src/components/PriceAnchoring"
import QuizHeader from "../../src/components/QuizHeader"
import Footer from "../../src/components/Footer"
import { trackQuizStep } from "./tracking"

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

    }
    25% {
      border-color: #ff6600;

    }
    50% {
      border-color: #ffff00;

    }
    75% {
      border-color: #ff6600;

    }
    100% {
      border-color: #ff0000;

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
    background: linear-gradient(to right, #20ca97, #00ffb3);
    border-radius: 9999px;
    transition: width 0.1s linear;
  }
`

// Declare tipos globais para os pixels
declare global {
  interface Window {
    TiktokAnalyticsObject?: string;
    ttq?: {
      track: (event: string, data?: Record<string, unknown>) => void;
      page: () => void;
      identify: (data: Record<string, unknown>) => void;
    };
    _fbq?: {
      push: (args: unknown[]) => void;
    };
    pixelId?: string;
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

// Enhanced notification component with better animations
const SuccessNotification = ({ show, onClose }: { show: boolean; onClose: () => void }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isExiting, setIsExiting] = useState(false)
  const [progress, setProgress] = useState(100)

  useEffect(() => {
    if (show) {
      setIsVisible(true)
      setProgress(100)
      
      // Update progress every 100ms for smoother animation
      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev <= 0) {
            clearInterval(progressInterval)
            return 0
          }
          return prev - 2 // Decrease 2% every 100ms = 5 seconds total
        })
      }, 100)
      
      const timer = setTimeout(() => {
        setIsExiting(true)
        setTimeout(() => {
          setIsVisible(false)
          setTimeout(() => {
            onClose()
            setIsExiting(false)
            setProgress(100) // Reset progress
          }, 500) // Increased exit animation time
        }, 200)
      }, 5000) // Increased display time to 5 seconds

      return () => {
        clearTimeout(timer)
        clearInterval(progressInterval)
      }
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div
      className={`fixed top-4 right-4 z-50 transition-all duration-700 transform ${
        isVisible && !isExiting 
          ? "translate-x-0 opacity-100 scale-100" 
          : "translate-x-full opacity-0 scale-95"
      }`}
    >
      <div className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center space-x-3 border border-green-400 backdrop-blur-sm">
        <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
          <DollarSign className="h-8 w-8 text-green-500 animate-bounce" />
        </div>
        <div>
          <p className="font-bold text-lg">Congratulations! 🎉</p>
          <p className="text-sm opacity-90">You&apos;ve earned a £20 discount!</p>
        </div>
        <button 
          onClick={onClose}
          className="ml-2 text-white hover:text-gray-200 transition-colors duration-200"
          aria-label="Close notification"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="absolute bottom-0 left-0 h-1 bg-green-300 rounded-b-xl" style={{ 
          width: `${progress}%`,
          transition: 'width 0.1s linear'
        }}></div>
      </div>
    </div>
  )
}

// Loading component for better UX
const LoadingSpinner = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-6 h-6", 
    lg: "w-8 h-8"
  }
  
  return (
    <div className={`${sizeClasses[size]} animate-spin rounded-full border-2 border-[#4feb95] border-t-white`}></div>
  )
}

// Componente de vídeo simplificado
const VideoPlayer = React.memo(() => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [showMuteButton, setShowMuteButton] = useState(true);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const forcePlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().catch(() => {
            console.log("Unable to start video automatically");
          });
        });
      }
    };

    const handleError = () => {
      console.error('Video failed to load');
      setVideoError(true);
    };

    forcePlay();
    video.addEventListener('canplay', forcePlay);
    video.addEventListener('loadeddata', forcePlay);
    video.addEventListener('error', handleError);
    setTimeout(forcePlay, 1000);

    return () => {
      video.removeEventListener('canplay', forcePlay);
      video.removeEventListener('loadeddata', forcePlay);
      video.removeEventListener('error', handleError);
    };
  }, []);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
      if (!videoRef.current.muted) {
        // If unmuted, hide button after small delay
        setTimeout(() => {
          setShowMuteButton(false);
        }, 500);
      }
    }
  };

  if (videoError) {
    return (
      <div style={{ 
        position: 'relative', 
        width: '100%', 
        paddingBottom: '56.25%',
        backgroundColor: '#f3f4f6',
        borderRadius: '25px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          color: '#6b7280'
        }}>
          <p>Video não disponível</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%' }}>
      <video
        ref={videoRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '25px'
        }}
        autoPlay
        playsInline
        controls={false}
        preload="auto"
        onError={() => setVideoError(true)}
      >
        <source src="videos/vsl.mp4" type="video/mp4" />
        <source src="videos/vsl.webm" type="video/webm" />
        <source src="videos/vsl.ogg" type="video/ogg" />
        Seu navegador não suporta o elemento de vídeo.
      </video>
      {showMuteButton && (
        <button
          onClick={toggleMute}
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 10,
            background: 'rgba(0, 0, 0, 0.6)',
            border: 'none',
            borderRadius: '50%',
            width: '80px',
            height: '80px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'white',
            transition: 'opacity 0.3s ease'
          }}
        >
          {isMuted ? (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      )}
    </div>
  );
});

VideoPlayer.displayName = 'VideoPlayer';

// Rastrear visualização da VSL apenas uma vez globalmente
const useTrackVSLView = () => {
  useEffect(() => {
    setTimeout(() => {
      trackQuizStep('vsl_view'); // Rastrear visualização do vídeo
    }, 1000);
  }, []);
};

const useAudioSystem = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const initializeAudio = () => {
      try {
        if (!audioRef.current) {
          const audio = new Audio("https://cdn.shopify.com/s/files/1/0946/2290/8699/files/notifica_o-venda.mp3?v=1749150271");
          audio.preload = "auto";
          audio.volume = 1;
          audioRef.current = audio;

          // Inicializa o contexto de áudio para dispositivos móveis
          const AudioContext = (window as Window & {
            AudioContext?: typeof window.AudioContext;
            webkitAudioContext?: typeof window.AudioContext;
          }).AudioContext || (window as Window & {
            AudioContext?: typeof window.AudioContext;
            webkitAudioContext?: typeof window.AudioContext;
          }).webkitAudioContext;
          if (AudioContext) {
            const audioContext = new AudioContext();
            if (audioContext.state === "suspended") {
              audioContext.resume();
            }
          }
          setIsInitialized(true);
        }
      } catch (error) {
        console.error('Error initializing audio:', error);
      }
    };

    // Inicializa na primeira interação
    const handleFirstInteraction = () => {
      initializeAudio();
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };

    document.addEventListener("touchstart", handleFirstInteraction, { passive: true });
    document.addEventListener("click", handleFirstInteraction);
    document.addEventListener("keydown", handleFirstInteraction);

    return () => {
      document.removeEventListener("touchstart", handleFirstInteraction);
      document.removeEventListener("click", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };
  }, []);

  const playSound = useCallback(() => {
    try {
      if (audioRef.current && isInitialized) {
        audioRef.current.currentTime = 0;
        audioRef.current.play().catch(error => {
          console.error('Error playing sound:', error);
        });
      }
    } catch (error) {
      console.error('Error playing sound:', error);
    }
  }, [isInitialized]);

  return { playSound, isInitialized };
};

// Componente do painel USP - versão minimalista Adidas
const USPPanel = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[9999] bg-black bg-opacity-20 flex items-start justify-center">
      <div className="bg-white w-full max-w-4xl mt-12 mx-4">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-4">
          <div className="text-xs font-medium uppercase tracking-[0.25em] text-black">WWE SummerSlam</div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-50 transition-colors duration-150"
            aria-label="Close"
          >
            <svg className="w-4 h-4 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="grid md:grid-cols-3 gap-px bg-gray-100">
          {/* History */}
          <div className="p-12 text-center bg-white">
            <div className="text-xs text-gray-400 uppercase tracking-[0.2em] mb-6">Since 1988</div>
            <div className="text-sm text-gray-900 mb-2 leading-relaxed">
              The Biggest Party
            </div>
            <div className="text-xs text-gray-500">
              Of The Summer
            </div>
          </div>

          {/* Achievements */}
          <div className="p-12 text-center bg-white">
            <div className="text-xs text-gray-400 uppercase tracking-[0.2em] mb-6">Legend</div>
            <div className="text-sm text-gray-900 mb-2 leading-relaxed">
              John Cena
            </div>
            <div className="text-xs text-gray-500">
              Farewell Tour
            </div>
          </div>

          {/* Legacy */}
          <div className="p-12 text-center bg-white">
            <div className="text-xs text-gray-400 uppercase tracking-[0.2em] mb-6">Champion</div>
            <div className="text-sm text-gray-900 mb-2 leading-relaxed">
              Cody Rhodes
            </div>
            <div className="text-xs text-gray-500">
              American Nightmare
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 text-center">
          <div className="text-xs text-gray-400 uppercase tracking-[0.2em]">The Biggest Event of the Summer</div>
        </div>
      </div>
    </div>
  )
}



// Usar o QuizHeader simplificado
const CompleteHeader = () => {
  return <QuizHeader />;
};

// Remover o MinimalHeader e USPHeader antigos e usar apenas o CompleteHeader
export default function WWESummerSlamQuiz() {
  const [gameStarted, setGameStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showUSPPanel, setShowUSPPanel] = useState(false);

  // Add styles to document head
  useEffect(() => {
    const styleElement = document.createElement("style");
    styleElement.innerHTML = progressBarStyles;
    document.head.appendChild(styleElement);
    
    return () => {
      document.head.removeChild(styleElement);
    };
  }, []);

  // Hook de captura do ttclid removido para evitar loops infinitos
  // useTikTokClickIdCapture();

  const { playSound } = useAudioSystem();
  const [progressValue, setProgressValue] = useState(100);
  const progressTimer = useRef<NodeJS.Timeout | null>(null);

  // Modificar a função de resposta com loading e scroll automático
  const handleAnswer = useCallback(() => {
    if (isSubmitting) return
    
    // Verificar se temos uma pergunta válida
    if (currentQuestion < 0 || currentQuestion >= questions.length) {
      console.error('Current question index out of bounds:', currentQuestion, 'Total questions:', questions.length);
      return;
    }
    
    const currentQuestionData = questions[currentQuestion];
    if (!currentQuestionData) {
      console.error('Pergunta atual não encontrada');
      return;
    }
    
    // Verificar se uma resposta foi selecionada
    if (selectedAnswer === '' || selectedAnswer === null) {
      console.warn('No answer selected, skipping...');
      // Para auto-advance, não retorna, continua com resposta vazia
    }
    
    setIsSubmitting(true)
    
    // Rastrear resposta da pergunta
    trackQuizStep('question_answered', { 
      questionNumber: currentQuestion + 1,
      answer: selectedAnswer || 'no_answer',
      isCorrect: selectedAnswer === currentQuestionData.options[currentQuestionData.correct]
    });
    
    // Verificar se a resposta está correta
    const isCorrect = selectedAnswer === currentQuestionData.options[currentQuestionData.correct];
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      playSound(); // Tocar som apenas para respostas corretas
    }
    
    // Simular um pequeno delay para melhor UX
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1)
        setSelectedAnswer("")
        setIsSubmitting(false)
        // Scroll automático para o topo ao avançar pergunta
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        // Quiz completo
        setQuizCompleted(true)
        setIsSubmitting(false)
        setShowNotification(true)
        
        // Rastrear conclusão do quiz
        trackQuizStep('quiz_completed', { 
          totalCorrect: correctAnswers + (isCorrect ? 1 : 0),
          totalQuestions: questions.length 
        });
        
        // Scroll automático para o topo ao completar quiz
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 600)
  }, [currentQuestion, selectedAnswer, isSubmitting, correctAnswers, playSound]);

  // Remover o useEffect que adiciona os estilos
  useEffect(() => {
    if (progressTimer.current) {
      clearInterval(progressTimer.current);
    }

    if (gameStarted && !quizCompleted) {
      progressTimer.current = setInterval(() => {
        setProgressValue(prev => {
          const newValue = prev - 1;
          if (newValue <= 0) {
            if (progressTimer.current) {
              clearInterval(progressTimer.current);
            }
            // Avança automaticamente para a próxima pergunta quando o tempo acabar
            handleAnswer();
            return 100;
          }
          return newValue;
        });
      }, 100); // 10 seconds total (100 * 100ms = 10000ms)
    }

    return () => {
      if (progressTimer.current) {
        clearInterval(progressTimer.current);
      }
    };
  }, [gameStarted, currentQuestion, quizCompleted, handleAnswer]);

  // Reset progress quando mudar de pergunta
  useEffect(() => {
    setProgressValue(100);
    
    // Rastrear visualização da pergunta quando gameStarted está true
    if (gameStarted && !quizCompleted) {
      trackQuizStep('question_viewed', { questionNumber: currentQuestion + 1 });
    }
  }, [currentQuestion, gameStarted, quizCompleted]);

  // Debug para verificar o estado
  useEffect(() => {
    console.log('showUSPPanel state changed:', showUSPPanel)
  }, [showUSPPanel])

  // Usar o hook de delay (removido - não utilizado)



  // Função para fechar o painel USP
  const handleUSPClose = () => {
    console.log('handleUSPClose called')
    setShowUSPPanel(false)
  }

  // Modificar a função de início do quiz com loading e scroll automático
  const handleStartQuiz = () => {
    setIsLoading(true)
    trackQuizStep('quiz_start'); // Rastrear início do quiz
    
    // Simular um pequeno delay para melhor UX
    setTimeout(() => {
      setGameStarted(true)
      setIsLoading(false)
      // Scroll automático para o topo ao iniciar quiz
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 800)
  }

  // Função para lidar com o clique no botão de compra
  const handleBuyNowClick = () => {
    trackQuizStep('go_to_store'); // Evento final - ir para a loja
    
    // Construir URL com UTMs diretamente da URL atual
    let url = "/";
    
    // Capturar UTMs da URL atual
    const currentUrl = new URL(window.location.href);
    const params = new URLSearchParams();
    
    // Adicionar UTMs se existirem na URL atual
    const utmParams = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'gclid', 'fbclid', 'ttclid'];
    utmParams.forEach(param => {
      const value = currentUrl.searchParams.get(param);
      if (value) {
        params.append(param, value);
      }
    });
    
    if (params.toString()) {
      url += `?${params.toString()}`;
    }
    
    const newWindow = window.open(url, "_blank");
    if (newWindow) newWindow.opener = null;
  }







  useTrackVSLView(); // Comentado junto com o VSL

  // Rastrear visualização da página final
  useEffect(() => {
    if (quizCompleted) {
      trackQuizStep('final_page_viewed');
    }
  }, [quizCompleted]);

  // Initial screen with the president
  if (!gameStarted) {
    return (
      <>
        <div className="min-h-screen bg-white flex flex-col">
          <CompleteHeader />
          <USPPanel isOpen={showUSPPanel} onClose={handleUSPClose} />
          <div className="flex-grow">
            <div className="container mx-auto px-2 py-10">
              <div className="text-center mb-10 animate-fadeIn">
                <h1 className="text-4xl font-normal font-thin text-gray-900">Mach das Quiz und erhalte bis zu 120 € Rabatt (Faça o quiz e ganhe ate 120 euros de desconto)</h1>
              </div>
              
              <div className="space-y-10">
                <div className="animate-scaleIn">
                  {/* <VideoPlayer isReady={true} /> */}
                  <VideoPlayer />
                </div>

                <div className="bg-[#9bdcd2] text-center py-5 px-5 text-sm relative rounded-xl">
                  <blockquote className="text-1xl md:text-lg text-[#020202] font-thin text-center leading-relaxed">
                    &quot;Answer 6 questions about your perfume preferences and get £120 off a set of perfumes.&quot;
                  </blockquote>
                </div>

                <Button
                  onClick={handleStartQuiz}
                  disabled={isLoading}
                  className="w-full bg-[#ffffff] border-2 border-black hover:border-[#9bdcd2] hover:bg-[#9bdcd2] text-black hover:text-white text-xl py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center gap-3"
                  size="lg"
                >
                  {isLoading ? (
                    <>
                      <LoadingSpinner size="md" />
                      Starting Quiz...
                    </>
                  ) : (
                    <>
                      <Trophy className="h-6 w-6" />
                      Start Quiz
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (quizCompleted) {
    return (
      <>
        <div className="min-h-screen bg-white flex flex-col">
          <CompleteHeader />
          <USPPanel isOpen={showUSPPanel} onClose={handleUSPClose} />
          <div className="flex-grow container mx-auto px-4 py-4">
            <div className="space-y-4">
              <div className="transform transition-all duration-500">
                <PriceAnchoring onBuyClick={handleBuyNowClick} />
              </div>

              <div className="flex flex-col gap-4">
                {/* Discount progress bar */}
                <DiscountProgressBar correctAnswers={correctAnswers} />
                
              </div>
            </div>
          </div>
          <BasicFooter />
        </div>
      </>
    )
  }

  return (
    <>
      <div className="min-h-screen bg-white flex flex-col">
        <CompleteHeader />
        <USPPanel isOpen={showUSPPanel} onClose={handleUSPClose} />
        <div className="flex-grow container mx-auto px-1 py-5">
          <SuccessNotification show={showNotification} onClose={() => setShowNotification(false)} />

          <div className="w-full max-w-2xl mx-auto">
            <div className="mb-6 animate-fadeIn">
              <div className="flex justify-center mb-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Your discount</p>
                  <p className={`text-2xl font-bold text-[#4ada12] transform transition-all duration-500 ${
                    correctAnswers > 0 ? 'scale-125 animate-pulse' : ''
                  }`}>
                    £{correctAnswers * 20}
                  </p>
                  <p className="text-xs text-gray-500">Participation reward</p>
                </div>
              </div>
              {gameStarted && !quizCompleted && (
                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${progressValue}%` }}
                  />
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="animate-slideIn">
                {questions[currentQuestion] && (
                  <div className="bg-[#ffffff] p-10 rounded-xl border border-gray-900 shadow-sm transition-all duration-300 hover:shadow-md mb-4">
                    <h3 className="text-xl font-semibold mb-4 text-black border-b border-gray-900 pb-2">{questions[currentQuestion].question}</h3>

                    <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer} className="space-y-4">
                      {questions[currentQuestion].options.map((option: string, index: number) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-3 p-4 rounded-xl transition-all duration-200 cursor-pointer bg-white border border-gray-900 ${
                            selectedAnswer === index.toString() 
                              ? 'bg-gray-100 shadow-sm transform scale-105' 
                              : 'bg-gray-100 hover:transform hover:scale-105'
                          }`}
                        >
                          <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                          <Label htmlFor={`option-${index}`} className="flex-1 text-black cursor-pointer font-medium">
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                )}

                <Button
                  onClick={handleAnswer}
                  disabled={!selectedAnswer || isSubmitting}
                  className={`w-full py-4 mt-3 text-white transition-all duration-200 transform hover:scale-105 ${
                    isSubmitting 
                      ? 'bg-gray-400 cursor-not-allowed' 
                      : 'bg-black hover:bg-gray-800 hover:shadow-lg'
                  }`}
                  size="lg"
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <LoadingSpinner size="sm" />
                      Processing...
                    </div>
                  ) : (
                    "Confirm Answer"
                  )}
                </Button>

                {/* Discount progress bar instead of quiz progress */}
                <DiscountProgressBar correctAnswers={correctAnswers} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

// Discount progress bar component
const DiscountProgressBar = ({ correctAnswers }: { correctAnswers: number }) => {
  const discount = correctAnswers * 20;
  const maxDiscount = 120;
  const progressPercentage = (discount / maxDiscount) * 100;

  return (
    <div className="bg-[#ffffff] p-4 rounded-lg">
      <div className="flex justify-center items-center">
        <span className="text-sm text-gray-600 mr-10">Discount progress:</span>
        <span className="font-semibold text-gray-600">£{discount} / </span>
        <span className="text-[#26ca20] font-bold ml-5">£{maxDiscount}</span>
      </div>
      <div 
        aria-valuemax={100} 
        aria-valuemin={0} 
        aria-valuenow={progressPercentage}
        role="progressbar" 
        className="relative h-4 w-full overflow-hidden rounded-full bg-gray-200 mt-2"
      >
        <div 
          className="discount-progress-bar h-full transition-all duration-500 ease-out" 
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

// Usar o Footer da store
const BasicFooter = () => <Footer />;