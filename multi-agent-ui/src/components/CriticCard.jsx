import ReactMarkdown from "react-markdown";

const CriticCard = ({ content }) => {
  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h5 className="mb-0">🧐 Critic Agent</h5>
      </div>

      <div className="card-body">
        <div className="agent-content">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default CriticCard;
