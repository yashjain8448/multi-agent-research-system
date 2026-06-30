import styles from "./WriterCard.module.css";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

const WriterCard = ({ title, content, copyable }) => {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const previewLength = 300;
  const displayedContent = expanded ? content : content.slice(0, previewLength);

  function handleCopy() {
    navigator.clipboard.writeText(content);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{title}</h5>

        {copyable && (
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={handleCopy}
          >
            {copied ? "✅ Copied" : "📋 Copy"}
          </button>
        )}
      </div>

      <div className="card-body">
        <div className="agent-content">
          <ReactMarkdown>
            {displayedContent +
              (!expanded && content.length > previewLength ? "..." : "")}
          </ReactMarkdown>
        </div>
        {content.length > previewLength && (
          <div className="mt-3">
            <button
              className="btn btn-link p-0"
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? "Collapse ▲" : "Expand ▼"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WriterCard;
