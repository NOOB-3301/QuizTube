import { useState } from 'react';
import YouTube from 'react-youtube';

interface Question {
  id: number;
  question: string;
  options?: string[];
  correctAnswer?: number;
  type: 'mcq' | 'long-answer';
}

const sampleQuestions: Question[] = [
  {
    id: 1,
    question: "What is the main topic of this video?",
    options: ["Option 1", "Option 2", "Option 3", "Option 4"],
    correctAnswer: 0,
    type: 'mcq'
  },
  {
    id: 2,
    question: "Explain the concept discussed at 2:30 in your own words.",
    type: 'long-answer'
  }
];

const Workspace = () => {
  const [videoId, setVideoId] = useState<string>('dQw4w9WgXcQ'); // Default video ID
  const [selectedQuestion, setSelectedQuestion] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string | number>>({});

  const handleAnswerChange = (questionId: number, answer: string | number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  return (
    <div className="workspace-container">
      <div className="video-section">
        <div className="video-wrapper">
          <YouTube
            videoId={videoId}
            opts={{
              height: '100%',
              width: '100%',
              playerVars: {
                autoplay: 0,
                modestbranding: 1,
                rel: 0,
              },
            }}
          />
        </div>
      </div>
      
      <div className="questions-section">
        <h2>Questions</h2>
        <div className="questions-list">
          {sampleQuestions.map((q, index) => (
            <div 
              key={q.id}
              className={`question-item ${selectedQuestion === index ? 'selected' : ''}`}
              onClick={() => setSelectedQuestion(index)}
            >
              <div className="question-content">
                <h3>Question {index + 1}</h3>
                <p>{q.question}</p>
                
                {q.type === 'mcq' ? (
                  <div className="options-list">
                    {q.options?.map((option, optIndex) => (
                      <label key={optIndex} className="option-item">
                        <input
                          type="radio"
                          name={`question-${q.id}`}
                          checked={answers[q.id] === optIndex}
                          onChange={() => handleAnswerChange(q.id, optIndex)}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <textarea
                    className="answer-input"
                    placeholder="Type your answer here..."
                    value={answers[q.id] as string || ''}
                    onChange={(e) => handleAnswerChange(q.id, e.target.value)}
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Workspace;