import { useState, useMemo } from 'react';
import quizData from '../data/quizzes.json';
import './Cheatsheet.css';

function Cheatsheet() {
  const [selectedTopic, setSelectedTopic] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCards, setExpandedCards] = useState({});

  // Process quiz data into cheatsheet entries grouped by topic
  const { topics, cheatsheetData } = useMemo(() => {
    const uniqueQuestions = quizData.filter(q => !q.isDuplicate);
    const topicMap = {};

    uniqueQuestions.forEach(q => {
      const topic = q.topic || 'Other';
      if (!topicMap[topic]) topicMap[topic] = [];

      // Extract the keyword (short version) from question
      const questionEn = q.question_en || '';
      const questionVi = q.question_vi || '';

      // Build the correct answer text
      const correctKeys = (q.correct || '').split(',').map(k => k.trim());
      const correctTexts = correctKeys.map(key => {
        const opt = (q.options || []).find(o => o.key === key);
        return opt ? { key, en: opt.text_en, vi: opt.text_vi } : { key, en: key, vi: key };
      });

      topicMap[topic].push({
        id: q.id,
        questionEn: questionEn,
        questionVi: questionVi,
        correctKeys: q.correct,
        correctTexts,
        explanationEn: q.explanation_en || '',
        explanationVi: q.explanation_vi || '',
        multipleChoice: q.multipleChoice || false,
      });
    });

    // Sort topics by count desc
    const sortedTopics = Object.entries(topicMap)
      .sort((a, b) => b[1].length - a[1].length)
      .map(([name, items]) => ({ name, count: items.length }));

    return { topics: sortedTopics, cheatsheetData: topicMap };
  }, []);

  // Filter by topic and search
  const filteredData = useMemo(() => {
    let data = selectedTopic === 'all' ? cheatsheetData : { [selectedTopic]: cheatsheetData[selectedTopic] || [] };

    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      const filtered = {};
      Object.entries(data).forEach(([topic, items]) => {
        const matches = items.filter(item =>
          item.questionEn.toLowerCase().includes(term) ||
          item.questionVi.toLowerCase().includes(term) ||
          item.correctTexts.some(ct => ct.en.toLowerCase().includes(term) || ct.vi.toLowerCase().includes(term))
        );
        if (matches.length > 0) filtered[topic] = matches;
      });
      return filtered;
    }
    return data;
  }, [selectedTopic, searchTerm, cheatsheetData]);

  const totalFiltered = Object.values(filteredData).reduce((sum, items) => sum + items.length, 0);

  const toggleCard = (id) => {
    setExpandedCards(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const expandAll = () => {
    const allIds = {};
    Object.values(filteredData).flat().forEach(item => { allIds[item.id] = true; });
    setExpandedCards(allIds);
  };

  const collapseAll = () => setExpandedCards({});

  return (
    <div className="cheatsheet-page">
      <div className="cheatsheet-header">
        <h1>📋 Cheatsheet Ôn Thi</h1>
        <p className="cheatsheet-subtitle">
          Keyword → Đáp án đúng — học thuộc nhanh để đi thi trắc nghiệm
        </p>
      </div>

      {/* Search bar */}
      <div className="cheatsheet-search">
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Tìm kiếm keyword... (VD: SQLite, Fragment, onBind)"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm('')}>✕</button>
          )}
        </div>
        <div className="search-stats">
          {totalFiltered} câu hỏi {searchTerm && `cho "${searchTerm}"`}
        </div>
      </div>

      {/* Topic filter chips */}
      <div className="cheatsheet-topics">
        <button
          className={`topic-chip ${selectedTopic === 'all' ? 'active' : ''}`}
          onClick={() => setSelectedTopic('all')}
        >
          Tất cả ({quizData.filter(q => !q.isDuplicate).length})
        </button>
        {topics.map(t => (
          <button
            key={t.name}
            className={`topic-chip ${selectedTopic === t.name ? 'active' : ''}`}
            onClick={() => setSelectedTopic(t.name)}
          >
            {t.name} ({t.count})
          </button>
        ))}
      </div>

      {/* Expand/Collapse controls */}
      <div className="cheatsheet-controls">
        <button className="ctrl-btn" onClick={expandAll}>📖 Mở tất cả giải thích</button>
        <button className="ctrl-btn" onClick={collapseAll}>📕 Thu gọn tất cả</button>
      </div>

      {/* Cheatsheet content */}
      <div className="cheatsheet-content">
        {Object.entries(filteredData).map(([topic, items]) => (
          <div key={topic} className="topic-section">
            <div className="topic-header">
              <h2>{topic}</h2>
              <span className="topic-count">{items.length} câu</span>
            </div>

            <div className="cards-grid">
              {items.map(item => (
                <div
                  key={item.id}
                  className={`cheat-card ${expandedCards[item.id] ? 'expanded' : ''}`}
                  onClick={() => toggleCard(item.id)}
                >
                  <div className="card-question">
                    <span className="card-id">#{item.id}</span>
                    <div className="card-q-text">
                      <div className="q-en">{item.questionEn}</div>
                      <div className="q-vi">{item.questionVi}</div>
                    </div>
                  </div>

                  <div className="card-answer">
                    <span className="answer-label">
                      {item.multipleChoice ? '🎯 Đáp án:' : '🎯 Đáp án:'}
                    </span>
                    <div className="answer-keys">
                      {item.correctTexts.map(ct => (
                        <span key={ct.key} className="answer-badge">
                          <strong>{ct.key}.</strong> {ct.en}
                          {ct.vi !== ct.en && <span className="answer-vi"> — {ct.vi}</span>}
                        </span>
                      ))}
                    </div>
                  </div>

                  {expandedCards[item.id] && (
                    <div className="card-explanation">
                      <div className="explain-section">
                        <span className="explain-flag">🇬🇧</span>
                        <p>{item.explanationEn}</p>
                      </div>
                      <div className="explain-section">
                        <span className="explain-flag">🇻🇳</span>
                        <p>{item.explanationVi}</p>
                      </div>
                    </div>
                  )}

                  <div className="card-expand-hint">
                    {expandedCards[item.id] ? '▲ Thu gọn' : '▼ Xem giải thích'}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {totalFiltered === 0 && (
          <div className="no-results">
            <span>😅</span>
            <p>Không tìm thấy kết quả cho "{searchTerm}"</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cheatsheet;
