import { useState } from "react";
import TopicForm from "./components/TopicForm";
import ResultsSection from "./components/ResultsSection";

const App = () => {
  const [topic, setTopic] = useState("");
  {
    /*This is for input which changes after every letter type*/
  }
  const [researchTopic, setResearchTopic] = useState("");
  const [researchData, setResearchData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [visibleCards, setVisibleCards] = useState({
    search: false,
    reader: false,
    writer: false,
    critic: false,
  });

  async function handleResearch() {
    setResearchTopic(topic);
    setTopic("");
    setLoading(true);
    setError("");
    setResearchData(null);

    // Hide all cards initially
    setVisibleCards({
      search: false,
      reader: false,
      writer: false,
      critic: false,
    });

    try {
      const response = await fetch("http://127.0.0.1:8000/research", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic: topic,
        }),
      });

      const data = await response.json();

      setResearchData(data);

      // Show cards one by one
      setTimeout(() => {
        setVisibleCards((prev) => ({
          ...prev,
          search: true,
        }));
      }, 500);

      setTimeout(() => {
        setVisibleCards((prev) => ({
          ...prev,
          reader: true,
        }));
      }, 1500);

      setTimeout(() => {
        setVisibleCards((prev) => ({
          ...prev,
          writer: true,
        }));
      }, 2500);

      setTimeout(() => {
        setVisibleCards((prev) => ({
          ...prev,
          critic: true,
        }));
      }, 3500);
    } catch (error) {
      setError("Research failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container py-5">
      <div className="hero">
        <h1 className="title">🤖 Multi-Agent Research System</h1>

        <p className="subtitle">
          AI-powered research using Search, Reader, Writer & Critic agents.
        </p>
      </div>

      <TopicForm
        topic={topic}
        setTopic={setTopic}
        handleResearch={handleResearch}
        loading={loading}
      />

      {researchData && (
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body py-3">
            <small className="text-uppercase text-muted fw-semibold">
              Research Topic
            </small>

            <h3 className="fw-bold text-primary mb-1">{researchTopic}</h3>

            <small className="text-muted">
              Generated using Search • Reader • Writer • Critic Agents
            </small>
          </div>
        </div>
      )}

      <div className="results">
        <ResultsSection
          researchData={researchData}
          visibleCards={visibleCards}
        />
      </div>

      {error && <h2>{error}</h2>}
    </div>
  );
};

export default App;
