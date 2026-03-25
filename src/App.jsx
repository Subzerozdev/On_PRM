import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Quiz from './pages/Quiz';
import Learn from './pages/Learn';
import Cheatsheet from './pages/Cheatsheet';
import './App.css';

function App() {
  return (
    <Router>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/cheatsheet" element={<Cheatsheet />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
