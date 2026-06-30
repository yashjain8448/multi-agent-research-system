from langchain.tools import tool
import requests
from bs4 import BeautifulSoup
from tavily import TavilyClient
import os
from dotenv import load_dotenv
from rich import print

load_dotenv()

# Tavily Client 
tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

@tool
def web_search(query: str) -> str:
    """Performs the web search and return the result in form of Titles, URLs and snippets."""

    results = tavily_client.search(query=query, max_results=5)

    output = []

    # The result that we get from tavily
    # Formatting the result in a readable way
    for result in results['results']:
        title = result['title']
        url = result['url']
        snippet = result['content'][:300] 
        output.append(f"Title: {title}\nURL: {url}\nSnippet: {snippet}\n")

    return "\n-----\n".join(output)


@tool
def scrape_url(url: str) -> str:
    """
    Scrape and return the clean text content from given URL.
    """

    try:
        # Make a GET request to the URL with a timeout and user-agent header
        response = requests.get(url, timeout = 8, headers={'User-Agent': 'Mozilla/5.0'})
        soup = BeautifulSoup(response.content, 'html.parser') # BeautifulSoup converts it into an object that Python can navigate.

        # Remove script, style, footer, and nav tags to clean the content
        # i.e the content that is not relevant to the main content of the page
        for tag in soup(['script', 'style', 'footer', 'nav']):
            tag.decompose()

        return soup.get_text(separator=" ", strip=True)[:3000]
        # means bw diff html blocks separator is space 
    
    except Exception as e:
        return f"Error scraping URL: {str(e)}"
    

