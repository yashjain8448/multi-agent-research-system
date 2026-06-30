import ReactMarkdown from "react-markdown";
import { useState } from "react";

const SearchCard = ({ content }) => {
  const sources = content.split("-----");
  const [expandedSources, setExpandedSources] = useState([]);

  function toggleExpand(index) {
    if (expandedSources.includes(index)) {
      setExpandedSources((prev) => prev.filter((item) => item !== index));
    } else {
      setExpandedSources((prev) => [...prev, index]);
    }
  }

  return (
    <div className="card shadow-sm mb-4">
      <div className="card-header">
        <h5 className="mb-0">🔍 Search Agent</h5>
      </div>

      <div className="card-body">
        {sources.map((source, index) => {
          const isExpanded = expandedSources.includes(index);

          const displayedContent = isExpanded ? source : source.slice(0, 250);

          return (
            <div key={index} className="border rounded p-3 mb-3">
              <ReactMarkdown>
                {displayedContent +
                  (!isExpanded && source.length > 250 ? "..." : "")}
              </ReactMarkdown>

              {source.length > 250 && (
                <button
                  className="btn btn-link p-0 mt-2"
                  onClick={() => toggleExpand(index)}
                >
                  {isExpanded ? "Collapse ▲" : "Expand ▼"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SearchCard;
