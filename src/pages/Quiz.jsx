import { useState, useEffect, useCallback, useRef } from 'react';
import quizData from '../data/quizzes.json';
import './Quiz.css';

function Quiz() {
  const [mode, setMode] = useState('menu'); // menu, practice, result, review
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState([]); // for multi-select
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [timer, setTimer] = useState(0);
  const [examTime, setExamTime] = useState(null);
  const [questionCount, setQuestionCount] = useState(10);
  const timerRef = useRef(null);

  // Filter out duplicates for unique questions
  const uniqueQuestions = quizData.filter(q => !q.isDuplicate && q.correct && q.options && q.options.length > 0);

  const topics = [...new Set(uniqueQuestions.map(q => q.topic))];

  const startQuiz = useCallback((isExam = false) => {
    let filtered = filter === 'all' 
      ? [...uniqueQuestions] 
      : uniqueQuestions.filter(q => q.topic === filter);
    
    // Shuffle
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }

    const count = Math.min(questionCount, filtered.length);
    filtered = filtered.slice(0, count);
    
    setQuestions(filtered);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setSelectedAnswers([]);
    setShowExplanation(false);
    setScore(0);
    setAnswers([]);
    setTimer(0);
    setMode('practice');

    if (isExam) {
      setExamTime(count * 60); // 1 min per question
    } else {
      setExamTime(null);
    }
  }, [filter, questionCount, uniqueQuestions]);

  // Timer
  useEffect(() => {
    if (mode === 'practice') {
      timerRef.current = setInterval(() => {
        setTimer(prev => {
          if (examTime && prev + 1 >= examTime) {
            // Time's up
            clearInterval(timerRef.current);
            setMode('result');
            return prev + 1;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [mode, examTime]);

  const currentQ = questions[currentIndex];

  const handleSelect = (key) => {
    if (showExplanation) return;
    
    if (currentQ?.multipleChoice) {
      setSelectedAnswers(prev => {
        if (prev.includes(key)) {
          return prev.filter(k => k !== key);
        }
        return [...prev, key];
      });
    } else {
      setSelectedAnswer(key);
    }
  };

  const handleConfirm = () => {
    const correctVal = currentQ?.correct || '';
    if (currentQ?.multipleChoice) {
      const correctArr = correctVal.split(',');
      const isCorrect = correctArr.length === selectedAnswers.length &&
        correctArr.every(c => selectedAnswers.includes(c));
      if (isCorrect) setScore(s => s + 1);
      setAnswers(prev => [...prev, { 
        questionId: currentQ.id, 
        selected: selectedAnswers.join(','), 
        correct: correctVal, 
        isCorrect 
      }]);
    } else {
      const isCorrect = selectedAnswer === correctVal;
      if (isCorrect) setScore(s => s + 1);
      setAnswers(prev => [...prev, { 
        questionId: currentQ.id, 
        selected: selectedAnswer, 
        correct: correctVal, 
        isCorrect 
      }]);
    }
    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentIndex + 1 >= questions.length) {
      clearInterval(timerRef.current);
      setMode('result');
    } else {
      setCurrentIndex(i => i + 1);
      setSelectedAnswer(null);
      setSelectedAnswers([]);
      setShowExplanation(false);
    }
  };

  const formatTime = (s) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const getScoreColor = () => {
    const pct = (score / questions.length) * 100;
    if (pct >= 80) return 'var(--accent-success)';
    if (pct >= 60) return 'var(--accent-warning)';
    return 'var(--accent-danger)';
  };

  // MENU
  if (mode === 'menu') {
    return (
      <div className="quiz-page page-container">
        <div className="quiz-menu animate-fadeInUp">
          <div className="menu-header">
            <h1>✏️ Luyện Đề Trắc Nghiệm</h1>
            <p>Chọn chủ đề và số câu hỏi để bắt đầu luyện tập</p>
          </div>

          <div className="menu-options">
            <div className="option-group">
              <label>🗂️ Chủ đề</label>
              <div className="topic-filters">
                <button 
                  className={`topic-btn ${filter === 'all' ? 'active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  Tất cả ({uniqueQuestions.length})
                </button>
                {topics.map(t => {
                  const count = uniqueQuestions.filter(q => q.topic === t).length;
                  return (
                    <button
                      key={t}
                      className={`topic-btn ${filter === t ? 'active' : ''}`}
                      onClick={() => setFilter(t)}
                    >
                      {t} ({count})
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="option-group">
              <label>🔢 Số câu hỏi</label>
              <div className="count-options">
                {[5, 10, 15, 20, 29].map(n => (
                  <button
                    key={n}
                    className={`count-btn ${questionCount === n ? 'active' : ''}`}
                    onClick={() => setQuestionCount(n)}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="menu-actions">
            <button className="btn btn-primary btn-lg" onClick={() => startQuiz(false)}>
              ✏️ Luyện tập
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => startQuiz(true)}>
              ⏱️ Thi thử (1 phút/câu)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // RESULT
  if (mode === 'result') {
    const pct = Math.round((score / questions.length) * 100);
    return (
      <div className="quiz-page page-container">
        <div className="result-card animate-fadeInUp">
          <div className="result-emoji">
            {pct >= 80 ? '🎉' : pct >= 60 ? '👍' : '💪'}
          </div>
          <h2>Kết quả</h2>
          <div className="result-score" style={{ color: getScoreColor() }}>
            {score}/{questions.length}
          </div>
          <div className="result-pct" style={{ color: getScoreColor() }}>
            {pct}%
          </div>
          <div className="result-time">
            ⏱️ Thời gian: {formatTime(timer)}
          </div>
          <div className="result-message">
            {pct >= 80 ? 'Xuất sắc! Bạn đã nắm vững kiến thức!' :
             pct >= 60 ? 'Khá tốt! Cần ôn lại một số chủ đề.' :
             'Cần cố gắng thêm! Hãy xem lại giải thích bên dưới.'}
          </div>
          <div className="result-actions">
            <button className="btn btn-primary" onClick={() => setMode('review')}>
              📖 Xem lại đáp án
            </button>
            <button className="btn btn-outline" onClick={() => setMode('menu')}>
              🔄 Làm lại
            </button>
          </div>
        </div>
      </div>
    );
  }

  // REVIEW
  if (mode === 'review') {
    return (
      <div className="quiz-page page-container">
        <div className="review-header">
          <h2>📖 Xem lại đáp án</h2>
          <button className="btn btn-outline" onClick={() => setMode('menu')}>
            ← Về menu
          </button>
        </div>
        <div className="review-list">
          {questions.map((q, i) => {
            const answer = answers[i];
            return (
              <div key={q.id} className={`review-item ${answer?.isCorrect ? 'correct' : 'wrong'}`}>
                <div className="review-q-header">
                  <span className="review-q-num">Câu {i + 1}</span>
                  <span className={`review-badge ${answer?.isCorrect ? 'correct' : 'wrong'}`}>
                    {answer?.isCorrect ? '✅ Đúng' : '❌ Sai'}
                  </span>
                  <span className="review-topic">{q.topic}</span>
                </div>
                <div className="review-question-bilingual">
                  <p className="question-en">🇬🇧 {q.question_en}</p>
                  <p className="question-vi">🇻🇳 {q.question_vi}</p>
                </div>
                <div className="review-options">
                  {q.options.map(opt => {
                    const isCorrect = (q.correct || '').includes(opt.key);
                    const isSelected = answer?.selected?.includes(opt.key);
                    let className = 'review-option';
                    if (isCorrect) className += ' correct';
                    if (isSelected && !isCorrect) className += ' wrong';
                    return (
                      <div key={opt.key} className={className}>
                        <span className="opt-key">{opt.key}</span>
                        <div className="opt-bilingual">
                          <span className="opt-en">{opt.text_en}</span>
                          <span className="opt-vi">{opt.text_vi}</span>
                        </div>
                        {isCorrect && <span className="opt-mark">✓</span>}
                        {isSelected && !isCorrect && <span className="opt-mark">✗</span>}
                      </div>
                    );
                  })}
                </div>
                <div className="review-explanation">
                  <strong>💡 Giải thích / Explanation:</strong>
                  <p className="explanation-en">🇬🇧 {q.explanation_en}</p>
                  <p className="explanation-vi">🇻🇳 {q.explanation_vi}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // PRACTICE
  if (!currentQ) return null;

  const progress = ((currentIndex + 1) / questions.length) * 100;
  const isMulti = currentQ.multipleChoice;
  const canConfirm = isMulti ? selectedAnswers.length > 0 : selectedAnswer !== null;

  return (
    <div className="quiz-page page-container">
      {/* Top Bar */}
      <div className="quiz-topbar">
        <button className="btn btn-outline btn-sm" onClick={() => {
          clearInterval(timerRef.current);
          setMode('menu');
        }}>
          ✕ Thoát
        </button>
        <div className="quiz-progress-info">
          <span>Câu {currentIndex + 1}/{questions.length}</span>
          <span className="quiz-timer">⏱️ {formatTime(timer)}
            {examTime && <span className="timer-remaining"> / {formatTime(examTime)}</span>}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="quiz-progress-bar">
        <div className="quiz-progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Question */}
      <div className="quiz-card animate-fadeIn" key={currentQ.id}>
        <div className="quiz-meta">
          <span className="quiz-topic-badge">{currentQ.topic}</span>
          {currentQ.clo !== 'N/A' && <span className="quiz-clo-badge">{currentQ.clo}</span>}
          {isMulti && <span className="quiz-multi-badge">Chọn nhiều đáp án</span>}
        </div>

        <div className="quiz-question-bilingual">
          <h2 className="quiz-question-en">🇬🇧 {currentQ.question_en}</h2>
          <h3 className="quiz-question-vi">🇻🇳 {currentQ.question_vi}</h3>
        </div>

        <div className="quiz-options">
          {currentQ.options.map(opt => {
            const isSelected = isMulti 
              ? selectedAnswers.includes(opt.key.trim())
              : selectedAnswer === opt.key.trim();
            const isCorrect = (currentQ.correct || '').includes(opt.key.trim());
            
            let className = 'quiz-option';
            if (isSelected) className += ' selected';
            if (showExplanation) {
              if (isCorrect) className += ' correct';
              if (isSelected && !isCorrect) className += ' wrong';
            }

            return (
              <button
                key={opt.key}
                className={className}
                onClick={() => handleSelect(opt.key.trim())}
                disabled={showExplanation}
              >
                <span className="option-key">{opt.key}</span>
                <div className="option-text-bilingual">
                  <span className="option-en">{opt.text_en}</span>
                  {opt.text_en !== opt.text_vi && (
                    <span className="option-vi">{opt.text_vi}</span>
                  )}
                </div>
                {showExplanation && isCorrect && <span className="option-icon">✓</span>}
                {showExplanation && isSelected && !isCorrect && <span className="option-icon">✗</span>}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {showExplanation && (
          <div className={`explanation-box ${answers[answers.length - 1]?.isCorrect ? 'correct' : 'wrong'}`}>
            <div className="explanation-header">
              {answers[answers.length - 1]?.isCorrect 
                ? '✅ Chính xác!' 
                : `❌ Sai rồi! Đáp án đúng: ${currentQ.correct || 'N/A'}`
              }
            </div>
            <div className="explanation-content">
              <strong>💡 Giải thích / Explanation:</strong>
              <p className="explanation-en-text">🇬🇧 {currentQ.explanation_en}</p>
              <p className="explanation-vi-text">🇻🇳 {currentQ.explanation_vi}</p>
            </div>
            {currentQ.source_image && (
              <div className="explanation-source">
                📸 Nguồn: {currentQ.source_image}
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="quiz-actions">
          {!showExplanation ? (
            <button 
              className="btn btn-primary btn-lg quiz-confirm-btn"
              onClick={handleConfirm}
              disabled={!canConfirm}
            >
              Xác nhận
            </button>
          ) : (
            <button 
              className="btn btn-primary btn-lg quiz-confirm-btn"
              onClick={handleNext}
            >
              {currentIndex + 1 >= questions.length ? 'Xem kết quả' : 'Câu tiếp theo →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Quiz;
