import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  const stats = [
    { icon: '📝', value: '30', label: 'Câu hỏi', color: 'var(--accent-primary)' },
    { icon: '📚', value: '10+', label: 'Chủ đề', color: 'var(--accent-secondary)' },
    { icon: '🎯', value: '5', label: 'CLOs', color: 'var(--accent-success)' },
    { icon: '🖼️', value: '30', label: 'Ảnh đề cũ', color: 'var(--accent-info)' },
  ];

  const features = [
    {
      icon: '✏️',
      title: 'Luyện Tập Trắc Nghiệm',
      desc: 'Luyện đề với câu hỏi từ đề thi cũ, có giải thích chi tiết song ngữ Anh - Việt.',
      link: '/quiz',
      linkText: 'Bắt đầu luyện',
      gradient: 'var(--gradient-primary)',
    },
    {
      icon: '📖',
      title: 'Nội Dung Học Tập',
      desc: 'Nội dung bài giảng được tóm tắt bằng tiếng Việt, kèm ví dụ code thực tế.',
      link: '/learn',
      linkText: 'Xem nội dung',
      gradient: 'var(--gradient-success)',
    },
  ];

  const topics = [
    { name: 'Activity Lifecycle', icon: '🔄', count: 2 },
    { name: 'Intents', icon: '🔗', count: 3 },
    { name: 'Fragment', icon: '🧩', count: 3 },
    { name: 'Service', icon: '⚙️', count: 3 },
    { name: 'BroadcastReceiver', icon: '📡', count: 3 },
    { name: 'Content Providers', icon: '📦', count: 3 },
    { name: 'Layout & Widgets', icon: '🎨', count: 4 },
    { name: 'Notification', icon: '🔔', count: 2 },
    { name: 'Sockets', icon: '🌐', count: 2 },
    { name: 'Multithread', icon: '🧵', count: 1 },
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">📱 Mobile Programming - FPT University</div>
          <h1 className="hero-title">
            Ôn thi <span className="gradient-text">PRM392</span>
            <br />hiệu quả
          </h1>
          <p className="hero-subtitle">
            Website ôn luyện trắc nghiệm PRM392 với câu hỏi từ đề thi cũ,
            giải thích song ngữ Anh - Việt, và nội dung bài giảng tóm tắt dễ hiểu.
          </p>
          <div className="hero-actions">
            <Link to="/quiz" className="btn btn-primary btn-lg">
              ✏️ Luyện đề ngay
            </Link>
            <Link to="/learn" className="btn btn-outline btn-lg">
              📚 Xem nội dung
            </Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="code-preview">
            <div className="code-header">
              <span className="dot red"></span>
              <span className="dot yellow"></span>
              <span className="dot green"></span>
              <span className="code-title">MainActivity.java</span>
            </div>
            <pre className="code-content">
{`@Override
protected void onCreate(Bundle saved) {
    super.onCreate(saved);
    setContentView(R.layout.main);
    
    // 🎯 PRM392 - Ready!
    Toast.makeText(this, 
        "Sẵn sàng ôn thi!", 
        Toast.LENGTH_SHORT).show();
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        <div className="stats-grid">
          {stats.map((stat, i) => (
            <div key={i} className="stat-card" style={{ animationDelay: `${i * 0.1}s` }}>
              <span className="stat-icon">{stat.icon}</span>
              <span className="stat-value" style={{ color: stat.color }}>{stat.value}</span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="features-section">
        <h2 className="section-title">Tính năng chính</h2>
        <div className="features-grid">
          {features.map((f, i) => (
            <div key={i} className="feature-card" style={{ animationDelay: `${i * 0.15}s` }}>
              <div className="feature-icon-wrap" style={{ background: f.gradient }}>
                <span className="feature-icon">{f.icon}</span>
              </div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <Link to={f.link} className="feature-link">
                {f.linkText} →
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Topics */}
      <section className="topics-section">
        <h2 className="section-title">Các chủ đề</h2>
        <div className="topics-grid">
          {topics.map((t, i) => (
            <div key={i} className="topic-chip" style={{ animationDelay: `${i * 0.05}s` }}>
              <span>{t.icon}</span>
              <span>{t.name}</span>
              <span className="topic-count">{t.count}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Syllabus Info */}
      <section className="syllabus-section">
        <h2 className="section-title">Thông tin môn học</h2>
        <div className="syllabus-card">
          <div className="syllabus-grid">
            <div className="syllabus-item">
              <span className="syllabus-label">Mã môn</span>
              <span className="syllabus-value">PRM392</span>
            </div>
            <div className="syllabus-item">
              <span className="syllabus-label">Tín chỉ</span>
              <span className="syllabus-value">3</span>
            </div>
            <div className="syllabus-item">
              <span className="syllabus-label">Tiên quyết</span>
              <span className="syllabus-value">PRO192</span>
            </div>
            <div className="syllabus-item">
              <span className="syllabus-label">Thời lượng</span>
              <span className="syllabus-value">150h (45h contact)</span>
            </div>
          </div>
          <div className="clo-list">
            <h3>📋 CLOs (Course Learning Outcomes)</h3>
            <ul>
              <li><strong>CLO1:</strong> Hiểu kiến thức cơ bản về lập trình mobile</li>
              <li><strong>CLO2:</strong> Sử dụng các control phổ biến của Android</li>
              <li><strong>CLO3:</strong> Kiến thức về các component nâng cao Android</li>
              <li><strong>CLO4:</strong> Lưu trữ dữ liệu và kết nối API</li>
              <li><strong>CLO5:</strong> Hiểu để tự học sâu hơn</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
