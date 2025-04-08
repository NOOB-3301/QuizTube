import { useState } from "react";

type QuizFormat = "mcq" | "long-answer" | "summarize";

const Home = () => {
  const [youtubeLink, setYoutubeLink] = useState("");
  const [selectedFormat, setSelectedFormat] = useState<QuizFormat>("mcq");
  const [questionCount, setQuestionCount] = useState(10);
  const [wordCount, setWordCount] = useState(250);

  const handleFormatChange = (format: QuizFormat) => {
    setSelectedFormat(format);
    if (format === "mcq") {
      setQuestionCount(10);
    } else if (format === "long-answer") {
      setQuestionCount(5);
    } else {
      setWordCount(250);
    }
  };

  const getDescription = () => {
    if (selectedFormat === "summarize") {
      return `A ${wordCount}-word summary of the video content`;
    } else if (selectedFormat === "mcq") {
      return `${questionCount} multiple choice questions to test understanding`;
    } else {
      return `${questionCount} open-ended questions for deeper learning`;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      youtubeLink,
      selectedFormat,
      count: selectedFormat === "summarize" ? wordCount : questionCount
    });
  };

  return (
    <div className="home-container">
      <h1>Welcome to QuizTube</h1>
      <p>Create and take quizzes from YouTube videos</p>
      
      <form onSubmit={handleSubmit} className="video-form">
        <div className="input-group">
          <input
            type="text"
            value={youtubeLink}
            onChange={(e) => setYoutubeLink(e.target.value)}
            placeholder="Paste YouTube video link here"
            className="video-input"
            required
          />
        </div>

        <div className="format-options">
          <label className="format-option">
            <input
              type="radio"
              name="format"
              value="mcq"
              checked={selectedFormat === "mcq"}
              onChange={(e) => handleFormatChange(e.target.value as QuizFormat)}
            />
            <div className="format-option-content">
              <span className="format-label">Multiple Choice</span>
              <span className="count-limit">Max 25 questions</span>
            </div>
          </label>

          <label className="format-option">
            <input
              type="radio"
              name="format"
              value="long-answer"
              checked={selectedFormat === "long-answer"}
              onChange={(e) => handleFormatChange(e.target.value as QuizFormat)}
            />
            <div className="format-option-content">
              <span className="format-label">Long Answer</span>
              <span className="count-limit">Max 10 questions</span>
            </div>
          </label>

          <label className="format-option">
            <input
              type="radio"
              name="format"
              value="summarize"
              checked={selectedFormat === "summarize"}
              onChange={(e) => handleFormatChange(e.target.value as QuizFormat)}
            />
            <div className="format-option-content">
              <span className="format-label">Summarize</span>
              <span className="count-limit">100-1000 words</span>
            </div>
          </label>
        </div>

        <div className="count-selector">
          {selectedFormat === "summarize" ? (
            <div className="count-input">
              <label htmlFor="wordCount">Word Count</label>
              <div className="count-display">{wordCount}</div>
              <div className="slider-container">
                <input
                  type="range"
                  id="wordCount"
                  min="100"
                  max="1000"
                  step="50"
                  value={wordCount}
                  onChange={(e) => setWordCount(Number(e.target.value))}
                />
                <div className="slider-labels">
                  <span>100</span>
                  <span>1000</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="count-input">
              <label htmlFor="questionCount">Number of Questions</label>
              <div className="count-display">{questionCount}</div>
              <div className="slider-container">
                <input
                  type="range"
                  id="questionCount"
                  min="1"
                  max={selectedFormat === "mcq" ? 25 : 10}
                  value={questionCount}
                  onChange={(e) => setQuestionCount(Number(e.target.value))}
                />
                <div className="slider-labels">
                  <span>1</span>
                  <span>{selectedFormat === "mcq" ? "25" : "10"}</span>
                </div>
              </div>
            </div>
          )}
          <div className="count-description">{getDescription()}</div>
        </div>

        <button type="submit" className="generate-button">
          Generate {selectedFormat === "mcq" ? "Quiz" : 
                   selectedFormat === "long-answer" ? "Questions" : 
                   "Summary"}
        </button>
      </form>
    </div>
  );
};

export default Home;