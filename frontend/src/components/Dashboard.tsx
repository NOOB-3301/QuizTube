import { useState } from 'react';

interface Activity {
  id: number;
  title: string;
  date: string;
  score?: number;
  type: 'quiz' | 'study';
}

interface UserProfile {
  name: string;
  rank: string;
  totalActivities: number;
  quizzesTaken: number;
  studyHours: number;
  averageScore: number;
}

interface Goal {
  title: string;
  date: string;
}

const Dashboard = () => {
  const [activities] = useState<Activity[]>([
    { id: 1, title: "React Fundamentals Quiz", date: "2024-01-15", score: 85, type: 'quiz' },
    { id: 2, title: "TypeScript Basics", date: "2024-01-14", score: 92, type: 'quiz' },
    { id: 3, title: "Study Session: JavaScript", date: "2024-01-13", type: 'study' },
  ]);

  const [userProfile] = useState<UserProfile>({
    name: "John Doe",
    rank: "Advanced Learner",
    totalActivities: 45,
    quizzesTaken: 32,
    studyHours: 28,
    averageScore: 88
  });

  const [newGoal, setNewGoal] = useState<Goal>({
    title: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    setNewGoal({ title: '', date: new Date().toISOString().split('T')[0] });
  };

  return (
    <div className="dashboard-container">
      <section className="dashboard-section activity-section">
        <h2>Previous Activity</h2>
        <div className="activity-list">
          {activities.map(activity => (
            <div key={activity.id} className="activity-card">
              <div className="activity-header">
                <h3>{activity.title}</h3>
                <span className="activity-date">{activity.date}</span>
              </div>
              {activity.score !== undefined && (
                <div className="activity-score">
                  Score: <span>{activity.score}%</span>
                </div>
              )}
              <div className="activity-type">
                {activity.type === 'quiz' ? '📝 Quiz' : '📚 Study'}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="dashboard-section planner-section">
        <h2>Study Planner</h2>
        <div className="planner-content">
          <div className="planner-card add-goal-card">
            <h3>Add New Goal</h3>
            <form onSubmit={handleAddGoal} className="add-goal-form">
              <div className="form-group">
                <label htmlFor="videoLink">YouTube Video Link</label>
                <input
                  id="videoLink"
                  type="text"
                  placeholder="Paste your YouTube video URL here"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                  required
                  className="goal-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="studyDate">Study Date</label>
                <input
                  id="studyDate"
                  type="date"
                  value={newGoal.date}
                  onChange={(e) => setNewGoal({ ...newGoal, date: e.target.value })}
                  required
                  className="date-input"
                />
              </div>
              <button type="submit" className="add-goal-button">
                Schedule Study Session
              </button>
            </form>
          </div>
          <div className="planner-card">
            <h3>Today's Goals</h3>
            <ul className="goal-list">
              <li>Complete React Hooks Quiz</li>
              <li>Study Next.js Basics</li>
              <li>Review Previous Quizzes</li>
            </ul>
          </div>
          <div className="planner-card">
            <h3>Upcoming</h3>
            <ul className="upcoming-list">
              <li>
                <span className="date">Tomorrow</span>
                <span className="task">Advanced TypeScript</span>
              </li>
              <li>
                <span className="date">Wed, Jan 17</span>
                <span className="task">React Router Deep Dive</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="dashboard-section profile-section">
        <h2>User Profile</h2>
        <div className="profile-content">
          <div className="profile-header">
            <div className="profile-avatar">
              <img src="/default-avatar.svg" alt="Profile" />
            </div>
            <div className="profile-info">
              <h3>{userProfile.name}</h3>
              <span className="profile-rank">{userProfile.rank}</span>
            </div>
          </div>
          <div className="profile-stats">
            <div className="stat-card">
              <div className="stat-icon">🎯</div>
              <div className="stat-details">
                <span className="stat-value">{userProfile.totalActivities}</span>
                <span className="stat-label">Total Activities</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📝</div>
              <div className="stat-details">
                <span className="stat-value">{userProfile.quizzesTaken}</span>
                <span className="stat-label">Quizzes Taken</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">⏱️</div>
              <div className="stat-details">
                <span className="stat-value">{userProfile.studyHours}h</span>
                <span className="stat-label">Study Time</span>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">📊</div>
              <div className="stat-details">
                <span className="stat-value">{userProfile.averageScore}%</span>
                <span className="stat-label">Average Score</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;