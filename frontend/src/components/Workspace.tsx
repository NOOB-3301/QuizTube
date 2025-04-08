import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import YouTube from 'react-youtube';
import axios from 'axios';
import { b_link } from './Baselink';

interface WorkspaceData {
  videoId: string;
  videoTitle: string;
  type: 'mcq' | 'long-answer' | 'summarize';
  questions?: {
    question: string;
    options?: string[];
    correctIndex?: number;
    answer?: string;
  }[];
  summary?: string;
}

const Workspace = () => {
  const { id } = useParams();
  const [data, setData] = useState<WorkspaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${b_link}/api/workspace/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setData(response.data);
      } catch (err) {
        setError('Failed to load workspace');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspace();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div className="workspace-container">
      <div className="video-section">
        <h2>{data.videoTitle}</h2>
        <div className="video-wrapper">
          <YouTube
            videoId={data.videoId}
            opts={{
              height: '360',
              width: '640',
              playerVars: {
                autoplay: 0,
              },
            }}
          />
        </div>
      </div>

      <div className="content-section">
        {data.type === 'mcq' && data.questions && (
          <div className="mcq-section">
            <h3>Multiple Choice Questions</h3>
            {data.questions.map((q, qIndex) => (
              <div key={qIndex} className="question-card">
                <p className="question">{q.question}</p>
                <div className="options">
                  {q.options?.map((option, oIndex) => (
                    <label key={oIndex} className="option">
                      <input
                        type="radio"
                        name={`question-${qIndex}`}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {data.type === 'long-answer' && data.questions && (
          <div className="laq-section">
            <h3>Long Answer Questions</h3>
            {data.questions.map((q, index) => (
              <div key={index} className="question-card">
                <p className="question">{q.question}</p>
                <textarea
                  className="answer-input"
                  placeholder="Type your answer here..."
                  rows={5}
                />
              </div>
            ))}
          </div>
        )}

        {data.type === 'summarize' && (
          <div className="summary-section">
            <h3>Video Summary</h3>
            <p>{data.summary}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Workspace;
