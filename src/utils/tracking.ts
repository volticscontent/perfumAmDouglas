// Tracking utilities for the quiz

interface QuizStepData {
  [key: string]: string | number | boolean | undefined;
}

interface QuizResult {
  category?: string;
  preferences?: string[];
  score?: number;
  [key: string]: string | number | boolean | string[] | undefined;
}

declare global {
  interface Window {
    fbq?: (action: string, event: string, data?: Record<string, unknown>) => void;
    pixelId?: string;
  }
}

export const trackQuizStep = (step: string, data?: QuizStepData) => {
  // Console logging for debugging
  console.log(`Quiz Step: ${step}`, data);
  
  // Track quiz events with Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'QuizStep', {
      step: step,
      data: data
    });
  }
  
  // Track quiz events with Utmify
  if (typeof window !== 'undefined' && window.pixelId) {
    try {
      fetch(`https://api.utmify.com.br/tracking/v1/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pixel_id: window.pixelId,
          event: 'quiz_step',
          event_data: {
            step: step,
            data: data
          }
        })
      }).catch(error => console.log('Utmify quiz tracking error:', error));
    } catch (error) {
      console.log('Utmify quiz tracking error:', error);
    }
  }
};

export const trackQuizCompletion = (result: QuizResult) => {
  // Track quiz completion with Meta Pixel
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('trackCustom', 'QuizCompleted', {
      result: result
    });
  }
  
  // Track quiz completion with Utmify
  if (typeof window !== 'undefined' && window.pixelId) {
    try {
      fetch(`https://api.utmify.com.br/tracking/v1/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          pixel_id: window.pixelId,
          event: 'quiz_completed',
          event_data: {
            result: result
          }
        })
      }).catch(error => console.log('Utmify quiz completion tracking error:', error));
    } catch (error) {
      console.log('Utmify quiz completion tracking error:', error);
    }
  }
};

export const useTikTokClickIdCapture = () => {
  // Simple hook for TikTok click ID capture
  // Returns empty string for now - can be implemented with actual TikTok integration
  return '';
};