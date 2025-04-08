import { useState } from "react";

interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  testsCompleted: number;
  isCurrentUser?: boolean;
}

export default function Leaderboard() {
  // Mock data - replace with actual API call
  const [leaderboardData] = useState<LeaderboardEntry[]>([
    { rank: 1, name: "Alex Thompson", score: 980, testsCompleted: 45 },
    { rank: 2, name: "Sarah Chen", score: 945, testsCompleted: 42 },
    { rank: 3, name: "Mike Johnson", score: 920, testsCompleted: 40 },
    { rank: 4, name: "Emma Davis", score: 890, testsCompleted: 38 },
    { rank: 5, name: "James Wilson", score: 870, testsCompleted: 35 },
    { rank: 6, name: "Lisa Anderson", score: 850, testsCompleted: 33 },
    { rank: 7, name: "David Lee", score: 830, testsCompleted: 30 },
    { rank: 8, name: "Rachel Kim", score: 810, testsCompleted: 28 },
    { rank: 9, name: "Chris Martin", score: 790, testsCompleted: 25 },
    { rank: 10, name: "Sofia Garcia", score: 770, testsCompleted: 23 },
  ]);

  const [userRank] = useState<LeaderboardEntry>({
    rank: 23,
    name: "John Doe",
    score: 650,
    testsCompleted: 15,
    isCurrentUser: true,
  });

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-section">
        <h2>Leaderboard</h2>
        <div className="leaderboard-list">
          {leaderboardData.map((entry) => (
            <div key={entry.rank} className="leaderboard-entry">
              <div className="rank">#{entry.rank}</div>
              <div className="user-info">
                <span className="name">{entry.name}</span>
                <div className="user-stats">
                  <span className="score">{entry.score} pts</span>
                  <span className="tests-completed">
                    {entry.testsCompleted} total tests taken
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="user-rank-section">
          <h3>Your Ranking</h3>
          <div className="leaderboard-entry current-user">
            <div className="rank">#{userRank.rank}</div>
            <div className="user-info">
              <span className="name">{userRank.name}</span>
              <div className="user-stats">
                <span className="score">{userRank.score} pts</span>
                <span className="tests-completed">
                  {userRank.testsCompleted} total tests taken
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
