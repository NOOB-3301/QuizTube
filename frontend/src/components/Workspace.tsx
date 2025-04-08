import { useState, useEffect, ChangeEvent } from "react";
import { useParams } from "react-router-dom";
import YouTube from "react-youtube";
import axios from "axios";
import { b_link } from "./Baselink";

interface WorkspaceData {
  videoId: string;
  videoTitle: string;
  type: "mcq" | "summarize";
  questions?: {
    question: string;
    options?: string[];
    correctIndex?: number;
  }[];
  summary?: string;
}

const Workspace = () => {
  const { id } = useParams();
  const [data, setData] = useState<WorkspaceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Object to hold user answers: key is question index and value is selected option index
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});

  useEffect(() => {
    const fetchWorkspace = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${b_link}/api/workspace/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (err) {
        setError("Failed to load workspace");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchWorkspace();
  }, [id]);

  // Handler for when a radio option is selected
  const handleOptionChange = (qIndex: number, optionIndex: number) => {
    setUserAnswers((prev) => ({ ...prev, [qIndex]: optionIndex }));
  };

  // Submit handler – you can modify this function to send the data to your backend or process it as needed.
  const handleSubmit = () => {
    console.log("User answers:", userAnswers);
    // Further processing like comparing with correct answers, etc.
    alert("Submitted answers! Check console for details.");
  };

  if (loading)
    return <div className="text-center mt-10 text-lg">Loading...</div>;
  if (error)
    return <div className="text-center mt-10 text-red-500">{error}</div>;
  if (!data) return <div className="text-center mt-10">No data found</div>;

  // For MCQs we want to show submit button when all questions have a selected answer.
  const allAnswered =
    data.type === "mcq" && data.questions
      ? Object.keys(userAnswers).length === data.questions.length
      : false;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-800 to-blue-900 text-white p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-center mb-8">
          {data.videoTitle}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Video */}
          <div className="flex justify-center">
            <div className="w-full max-w-2xl aspect-video">
              <YouTube
                videoId={data.videoId}
                opts={{
                  width: "100%",
                  playerVars: { autoplay: 0 },
                }}
                className="w-full h-full"
              />
            </div>
          </div>

          {/* Questions */}
          <div className="bg-white text-black rounded-xl shadow-md p-6 max-h-[800px] overflow-y-auto">
            {data.type === "mcq" && data.questions && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Multiple Choice Questions
                </h3>
                {data.questions.map((q, qIndex) => (
                  <div key={qIndex} className="mb-6">
                    <p className="font-medium">{q.question}</p>
                    <div className="mt-2 space-y-2">
                      {q.options?.map((option, optionIndex) => (
                        <div
                          key={optionIndex}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="radio"
                            name={`question-${qIndex}`}
                            id={`q${qIndex}-opt${optionIndex}`}
                            className="form-radio text-blue-600"
                            checked={userAnswers[qIndex] === optionIndex}
                            onChange={() =>
                              handleOptionChange(qIndex, optionIndex)
                            }
                          />
                          <label
                            htmlFor={`q${qIndex}-opt${optionIndex}`}
                            className="text-sm"
                          >
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={!allAnswered}
                  className={`mt-4 w-full py-2 px-4 rounded-md text-white ${
                    allAnswered
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "bg-gray-400 cursor-not-allowed"
                  }`}
                >
                  Submit Answers
                </button>
              </div>
            )}

            {data.type === "long-answer" && data.questions && (
              <div>
                <h3 className="text-xl font-semibold mb-4">
                  Long Answer Questions
                </h3>
                {data.questions.map((q, qIndex) => (
                  <div key={qIndex} className="mb-6">
                    <p className="font-medium">{q.question}</p>
                    <p className="mt-2 text-gray-700">
                      {q.answer || "No answer provided"}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {data.type === "summarize" && data.summary && (
              <div>
                <h3 className="text-xl font-semibold mb-4">Summary</h3>
                <p className="text-gray-700">{data.summary}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Workspace;
