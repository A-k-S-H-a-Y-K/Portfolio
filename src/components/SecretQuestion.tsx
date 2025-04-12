import { motion } from 'framer-motion';
import { useSecretQuestion } from '../hooks/useSecretQuestion';

interface SecretQuestionProps {
  correctAnswer: string;
}

export const SecretQuestion = ({ correctAnswer }: SecretQuestionProps) => {
  const {
    showPopup,
    setShowPopup,
    showSuccess,
    showError,
    answer,
    setAnswer,
    handleAnswerSubmit
  } = useSecretQuestion(correctAnswer);

  return (
    <>
      <button 
        onClick={() => setShowPopup(true)}
        className="mx-2 hover:text-blue-400 transition-colors"
      >
        . __ .
      </button>

      {/* Question Popup */}
      {showPopup && (
        <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-white p-4 rounded-lg shadow-lg">
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              placeholder="Say my name !"
              className="px-3 py-2 border rounded text-black"
            />
            <button
              onClick={handleAnswerSubmit}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      {/* Success Message */}
      {showSuccess && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ 
            duration: 3.5,
            times: [0, 0.2, 0.8, 1],
            ease: "easeInOut"
          }}
        >
          <img 
            src="/assets/success.jpg" 
            alt="Success" 
            className="object-contain rounded-lg shadow-lg max-h-screen max-w-screen-lg"
          />
        </motion.div>
      )}

      {/* Error Message */}
      {showError && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ 
            duration: 3.5,
            times: [0, 0.2, 0.8, 1],
            ease: "easeInOut"
          }}
        >
          <div className="bg-red-500 text-white px-8 py-4 rounded-lg shadow-lg text-xl">
            Tsk tsk… that answer didn't miss the mark, it missed the entire map.
          </div>
        </motion.div>
      )}
    </>
  );
}; 