import React, { useState } from "react";

const AdminPanel = ({ addQuiz }) => {
  const [quiz, setQuiz] = useState({ title: "", questions: [] });
  const [question, setQuestion] = useState({
    text: "",
    options: [],
    correct: "",
  });

  const handleQuizChange = (e) =>
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  const handleQuestionChange = (e) =>
    setQuestion({ ...question, [e.target.name]: e.target.value });
  const handleOptionChange = (e, index) => {
    const options = [...question.options];
    options[index] = e.target.value;
    setQuestion({ ...question, options });
  };

  const addQuestion = () => {
    setQuiz({ ...quiz, questions: [...quiz.questions, question] });
    setQuestion({ text: "", options: [], correct: "" });
  };

  const saveQuiz = () => {
    addQuiz(quiz);
    setQuiz({ title: "", questions: [] });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">Create Quiz</h2>
      <input
        type="text"
        name="title"
        value={quiz.title}
        onChange={handleQuizChange}
        placeholder="Quiz Title"
        className="p-2 border"
      />
      <div className="mt-4">
        <input
          type="text"
          name="text"
          value={question.text}
          onChange={handleQuestionChange}
          placeholder="Question Text"
          className="p-2 border"
        />
        {question.options.map((option, index) => (
          <input
            key={index}
            type="text"
            value={option}
            onChange={(e) => handleOptionChange(e, index)}
            placeholder={`Option ${index + 1}`}
            className="p-2 border mt-2"
          />
        ))}
        <button
          onClick={() =>
            setQuestion({ ...question, options: [...question.options, ""] })
          }
          className="p-2 mt-2 bg-blue-500 text-white"
        >
          Add Option
        </button>
        <input
          type="text"
          name="correct"
          value={question.correct}
          onChange={handleQuestionChange}
          placeholder="Correct Option"
          className="p-2 border mt-2"
        />
        <button
          onClick={addQuestion}
          className="p-2 mt-2 bg-green-500 text-white"
        >
          Add Question
        </button>
      </div>
      <button onClick={saveQuiz} className="p-2 mt-4 bg-purple-500 text-white">
        Save Quiz
      </button>
    </div>
  );
};

export default AdminPanel;
