import React, { useState, useEffect } from "react";
import "animate.css";

const QuizTaker = ({ quiz, saveProgress }) => {
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);

  const handleAnswerChange = (e, questionIndex) => {
    setAnswers({ ...answers, [questionIndex]: e.target.value });
  };

  const submitQuiz = () => {
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    saveProgress(null); // clear progress on submission
  };

  useEffect(() => {
    // Load saved progress if any
    const savedProgress = JSON.parse(localStorage.getItem("quizProgress"));
    if (savedProgress) {
      setAnswers(savedProgress.answers);
    }
  }, []);

  useEffect(() => {
    // Save progress to local storage
    localStorage.setItem("quizProgress", JSON.stringify({ answers }));
  }, [answers]);

  if (score !== null) {
    return (
      <div className="p-4 animate__animated animate__fadeIn">
        <h2 className="text-2xl font-bold">
          Your Score: {score} / {quiz.questions.length}
        </h2>
        {quiz.questions.map((question, index) => (
          <div key={index} className="mt-4">
            <p className="font-semibold">{question.text}</p>
            {question.options.map((option, i) => {
              let optionClass = "p-2 my-2 rounded";
              if (answers[index] === option) {
                optionClass +=
                  option === question.correct ? " bg-green-200" : " bg-red-200";
              } else if (option === question.correct) {
                optionClass += " bg-green-200";
              } else {
                optionClass += " bg-gray-100";
              }
              return (
                <div key={i} className={optionClass}>
                  {option}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-4 animate__animated animate__fadeIn">
      <h2 className="text-2xl mb-4 font-bold">{quiz.title}</h2>
      {quiz.questions.map((question, index) => (
        <div key={index} className="mt-4">
          <p className="font-semibold animate__animated animate__fadeInLeft">
            {question.text}
          </p>
          {question.options.map((option, i) => (
            <label
              key={i}
              className="block mt-2 animate__animated animate__fadeInRight"
            >
              <input
                type="radio"
                name={`question-${index}`}
                value={option}
                onChange={(e) => handleAnswerChange(e, index)}
                className="mr-2"
              />
              {option}
            </label>
          ))}
        </div>
      ))}
      <button
        onClick={submitQuiz}
        className="p-2 mt-4 bg-blue-500 text-white rounded animate__animated animate__pulse"
      >
        Submit Quiz
      </button>
    </div>
  );
};

export default QuizTaker;
