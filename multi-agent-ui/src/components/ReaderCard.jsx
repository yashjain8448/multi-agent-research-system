import ReactMarkdown from "react-markdown";
import { useState } from "react";

const ReaderCard = ({ content }) => {
  const [expanded, setExpanded] = useState(false);

  const previewLength = 500;

  const displayedContent = expanded ? content : content.slice(0, previewLength);

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">📖 Reader Agent</h5>

        <button
          className="btn btn-outline-primary btn-sm"
          onClick={() => {
            navigator.clipboard.writeText(content);
          }}
        >
          📋 Copy
        </button>
      </div>

      <div className="card-body">
        <ReactMarkdown>
          {displayedContent +
            (!expanded && content.length > previewLength ? "..." : "")}
        </ReactMarkdown>

        {content.length > previewLength && (
          <button
            className="btn btn-link p-0 mt-2"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? "Collapse ▲" : "Expand ▼"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReaderCard;
