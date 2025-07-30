import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import Quiz from './pages/Quiz';
import NotFound from './pages/NotFound';
import { QuizResults } from './components/QuizResults';
import './styles/main.css';

function App() {
  const [userEmail, setUserEmail] = useState('');
  const [quizResults, setQuizResults] = useState(null);

  const handleEmailSubmit = async (email) => {
    setUserEmail(email);
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
  };

  const handleQuizComplete = (results) => {
    setQuizResults(results);
  };

  const handleRestart = () => {
    setUserEmail('');
    setQuizResults(null);
  };

  // Show results if quiz is completed
  if (quizResults) {
    return <QuizResults results={quizResults} onRestart={handleRestart} />;
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              !userEmail ? (
                <Index onEmailSubmit={handleEmailSubmit} />
              ) : (
                <Navigate to="/quiz" replace />
              )
            } 
          />
          <Route 
            path="/quiz" 
            element={
              userEmail ? (
                <Quiz onComplete={handleQuizComplete} />
              ) : (
                <Navigate to="/" replace />
              )
            } 
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;