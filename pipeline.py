from agents import build_reader_agent , build_search_agent , writer_chain , critic_chain

def run_research_pipeline(topic: str) -> dict :

    state = {}

    # Step 1: Search Agent
    search_agent = build_search_agent()
    search_results = search_agent.invoke({
    "messages": [
        "user",
        f"""
Conduct a comprehensive web search on "{topic}".

Find the 5 most relevant and authoritative sources.

Return the response ONLY in Markdown.

For EACH source use EXACTLY this format:

## Source 1

**Title:** ...

🔗 **Link:** [Open Source](https://example.com)

**Snippet:** ...

---

## Source 2

**Title:** ...

🔗 **Link:** [Open Source](https://example.com)

**Snippet:** ...

---

Rules:
- Use valid Markdown.
- Make the URL a Markdown hyperlink exactly like:
  [Open Source](URL)
- Preserve the original URL.
- Do not add any introduction.
- Do not add any conclusion.
- Only return the formatted search results.
"""
    ]
})

    # Storing the search results in state for later use
    # -1 is used to get the last message which contains the search results i.e AI Message
    state['search_results'] = search_results['messages'][-1].content

    print(f"\nSearch Agent Results: {state['search_results']}\n")


    # Step 2: Reader Agent
    reader_agent = build_reader_agent()

    reader_results = reader_agent.invoke({
        "messages": ["user", f"""Based on the search results below, identify the single most authoritative and relevant source.

Search Results: {state['search_results']}
Scrape ONLY that source and extract the information.

Return the response ONLY in Markdown using EXACTLY this structure:

# Selected Source

**Title:** ...

**Reason Chosen:** Explain in one or two sentences why this source was selected.

---

# Main Concepts

- ...
- ...
- ...

---

# Key Statistics

- ...
- ...
- ...

---

# Important Quotes

> ...

> ...

---

Rules:
- Do not include raw HTML.
- Keep bullet points concise.
- Preserve factual accuracy.
- Return only Markdown.""" ]
    })

    state['reader_results'] = reader_results['messages'][-1].content

    print(f"\nReader Agent Results: {state['reader_results']}\n")

    # Step 3: Writer Chain

    #  Combining the search results from scrapping and searching
    research_combined = (
        f"Search Results:\n{state['search_results']}\n\n"
        f"Reader Results:\n{state['reader_results']}"
    )

    # Storing the writer results in state 
    state['writer_results'] = writer_chain.invoke({
        "topic": topic,
        "research": research_combined
    })

    print(f"\nWriter Chain Results: {state['writer_results']}\n")


    # Step 4: Critic Chain
    state['critic_results'] = critic_chain.invoke({
        "report": state['writer_results']
    })

    print(f"\nCritic's Evaluation: {state['critic_results']}\n")

    # Return the final state with all results
    return state

if __name__ == "__main__":
    topic = input("Enter the research topic: ")
    run_research_pipeline(topic)