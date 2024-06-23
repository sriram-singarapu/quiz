import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AdminPanel from "./AdminPanel";
import QuizTaker from "./QuizTaker";
import NavBar from "./NavBar";
import "./App.css"; // Ensure you import your CSS file here

const App = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuiz, setCurrentQuiz] = useState(null);

  const addQuiz = (quiz) => {
    setQuizzes([...quizzes, quiz]);
  };

  const saveProgress = (progress) => {
    if (progress) {
      localStorage.setItem("quizProgress", JSON.stringify(progress));
    } else {
      localStorage.removeItem("quizProgress");
    }
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <NavBar />
        <div className="p-4">
          <h1 className="text-3xl text-center mb-8">Online Quiz Platform</h1>
          <Routes>
            <Route
              path="/"
              element={
                <div>
                  <h2 className="text-2xl mb-4">Available Quizzes</h2>
                  {quizzes.map((quiz, index) => (
                    <div
                      key={index}
                      className="p-4 bg-white shadow mb-4 cursor-pointer"
                      onClick={() => setCurrentQuiz(quiz)}
                    >
                      {quiz.title}
                    </div>
                  ))}
                </div>
              }
            />
            <Route path="/admin" element={<AdminPanel addQuiz={addQuiz} />} />
            <Route
              path="/quizzes"
              element={
                currentQuiz ? (
                  <QuizTaker quiz={currentQuiz} saveProgress={saveProgress} />
                ) : (
                  <div>Select a quiz to start</div>
                )
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
