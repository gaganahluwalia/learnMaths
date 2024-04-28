import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MathLearn = () => {
  const [selectedOperation, setSelectedOperation] = useState(null)
  const [num1, setNum1] = useState(0)
  const [num2, setNum2] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [result, setResult] = useState(null)

  const generateRandomNumber = maxNum => {
    return Math.floor(Math.random() * (maxNum + 1)) // Generates a random number between 0 and maxNum
  }

  const generateQuestion = operation => {
    setSelectedOperation(operation)
    setNum1(generateRandomNumber(100))
    setNum2(generateRandomNumber(10))
    setResult(null)
    setUserAnswer('')
  }

  const checkAnswer = () => {
    const correctAnswer = calculateCorrectAnswer()
    if (parseInt(userAnswer) === correctAnswer) {
      toast.success(`Success, ${userAnswer} is the correct answer`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: generateQuestion(selectedOperation),
      })
      setResult(true)
    } else {
      toast.error(`Oops, ${userAnswer} is not the correct answer, try again`, {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        onClose: setUserAnswer(''),
      })
      setResult(false)
    }
  }

  const calculateCorrectAnswer = () => {
    switch (selectedOperation) {
      case 'addition':
        return num1 + num2
      case 'subtraction':
        return num1 - num2
      case 'multiplication':
        return num1 * num2
      default:
        return 0
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blue-200">
      <h1 className="text-4xl font-bold mb-8">Math Learning App</h1>
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => generateQuestion('addition')}
          className="bg-yellow-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Addition
        </button>
        <button
          onClick={() => generateQuestion('subtraction')}
          className="bg-green-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Subtraction
        </button>
        <button
          onClick={() => generateQuestion('multiplication')}
          className="bg-red-400 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Multiplication
        </button>
      </div>
      {selectedOperation && (
        <div className="flex items-center space-x-4 mb-4">
          <span className="text-xl">{num1}</span>
          <span className="text-xl">
            {selectedOperation === 'multiplication'
              ? '×'
              : selectedOperation === 'subtraction'
              ? '-'
              : '+'}
          </span>
          <span className="text-xl">{num2}</span>
          <span className="text-xl">=</span>
          <input
            type="text"
            value={userAnswer}
            onChange={e => setUserAnswer(e.target.value)}
            className="border-2 border-gray-400 rounded p-2 text-center w-20"
          />
        </div>
      )}
      {selectedOperation && (
        <button
          onClick={checkAnswer}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Submit
        </button>
      )}
      <ToastContainer />
    </div>
  )
}

export default MathLearn
