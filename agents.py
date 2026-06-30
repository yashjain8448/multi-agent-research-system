from langchain.agents import create_agent
from langchain_mistralai import ChatMistralAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from tools import web_search , scrape_url 
from dotenv import load_dotenv

load_dotenv()

# Create a MistralAI model
llm = ChatMistralAI(model = "mistral-small-2506")

#  Create a search agent 
def build_search_agent():
    return create_agent(
        model = llm,
        tools = [web_search],
    )

# Create a reader agent
def build_reader_agent():
    return create_agent(
        model = llm,
        tools = [scrape_url],
    )

# Create a write chain

writer_prompt = ChatPromptTemplate.from_messages([
    ("system", """
You are an expert research writer.

Write a detailed, professional report using ONLY Markdown.

Use EXACTLY the following structure.

# Executive Summary

Provide a concise overview in 2–3 paragraphs.

---

# Key Findings

## Finding 1

Explain thoroughly.

## Finding 2

Explain thoroughly.

## Finding 3

Explain thoroughly.

(Add more findings if necessary.)

---

# Conclusion

Summarize the research.

---

# Sources

List every URL as Markdown links.

Example:

- [WHO](https://...)

- [Nature](https://...)

Rules:
- Be factual and objective.
- Use professional language.
- Do not invent information.
- Use only the provided research.
- Return ONLY Markdown.
"""),
    ("human", """
Topic:
{topic}

Research:
{research}
""")
])

writer_chain = writer_prompt | llm | StrOutputParser()

# Create a critic chain
critic_prompt = ChatPromptTemplate.from_messages([
    (
        "system",
        """You are a senior research reviewer.

Evaluate the following report objectively.

Return ONLY Markdown using this exact structure.

# Overall Score

**Score:** X/10

---

# Strengths

- ...
- ...
- ...

---

# Areas for Improvement

- ...
- ...
- ...

---

# Suggestions

- ...
- ...

---

# Final Verdict

Write one concise paragraph summarizing the quality of the report."""
    ),
    (
        "human",
        """Review the research report below and evaluate it strictly.
Report:
{report}
"""
    )
])

critic_chain = critic_prompt | llm | StrOutputParser()