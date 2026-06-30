import styles from "./TopicForm.module.css";

const TopicForm = ({ topic, setTopic, handleResearch, loading }) => {
  return (
    <div className="mx-auto" style={{ maxWidth: "700px" }}>
      <label className="form-label fw-semibold">Research Topic</label>
      <input
        className="form-control form-control-lg"
        type="text"
        placeholder="e.g. AI in Healthcare"
        value={topic}
        onChange={(event) => setTopic(event.target.value)}
      />

      <div className="text-center mt-4">
        <button
          className="btn btn-primary btn-lg px-4"
          onClick={handleResearch}
          disabled={loading || topic.trim() === ""}
        >
          {loading ? "Researching..." : "Start Research"}
        </button>
      </div>
    </div>
  );
};

export default TopicForm;
