import { useState } from 'react';

export const useSecretQuestion = (correctAnswer: string) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [answer, setAnswer] = useState('');

  const handleAnswerSubmit = () => {
    if (answer.toLowerCase() === correctAnswer) {
      setShowSuccess(true);
      setShowPopup(false);
      setTimeout(() => setShowSuccess(false), 3500);
    } else {
      setShowError(true);
      setShowPopup(false);
      setTimeout(() => setShowError(false), 3500);
    }
    setAnswer('');
  };

  return {
    showPopup,
    setShowPopup,
    showSuccess,
    showError,
    answer,
    setAnswer,
    handleAnswerSubmit
  };
}; 