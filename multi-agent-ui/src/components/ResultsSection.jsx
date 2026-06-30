import WriterCard from "./WriterCard";
import CriticCard from "./CriticCard";
import SearchCard from "./SearchCard";
import ReaderCard from "./ReaderCard";

const ResultsSection = ({ researchData, visibleCards }) => {
  if (!researchData) return null;

  return (
    <>
      {visibleCards.search && (
        <SearchCard content={researchData.search_results} />
      )}

      {visibleCards.reader && (
        <ReaderCard content={researchData.reader_results} />
      )}

      {visibleCards.writer && (
        <WriterCard
          title="✍️ Writer Agent"
          content={researchData.writer_results}
          copyable={true}
        />
      )}

      {visibleCards.critic && (
        <CriticCard content={researchData.critic_results} />
      )}
    </>
  );
};

export default ResultsSection;
