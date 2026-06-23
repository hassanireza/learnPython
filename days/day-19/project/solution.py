"""
Day 19 Project: Random Quote CLI
==================================
A modular quote application demonstrating imports.

Structure:
  solution.py   (main runner - this file)
"""
import random
from datetime import date

# Inline module simulation (in a real project, these would be separate files)

QUOTES = [
    {"text": "The only way to do great work is to love what you do.", "author": "Steve Jobs"},
    {"text": "In the beginning was the Word, and the Word was Python.", "author": "Unknown Pythonista"},
    {"text": "First, solve the problem. Then, write the code.", "author": "John Johnson"},
    {"text": "Experience is the name everyone gives to their mistakes.", "author": "Oscar Wilde"},
    {"text": "Code is like humor. When you have to explain it, it is bad.", "author": "Cory House"},
    {"text": "Programs must be written for people to read, and only incidentally for machines.", "author": "Abelson & Sussman"},
    {"text": "The best error message is the one that never shows up.", "author": "Thomas Fuchs"},
    {"text": "Make it work, make it right, make it fast.", "author": "Kent Beck"},
]


def get_random_quote(quotes: list[dict]) -> dict:
    """Return a random quote from the collection."""
    return random.choice(quotes)


def get_quote_of_the_day(quotes: list[dict]) -> dict:
    """Return a deterministic quote based on today's date."""
    index = date.today().toordinal() % len(quotes)
    return quotes[index]


def format_quote(quote: dict, width: int = 60) -> str:
    """Format a quote for display."""
    text = quote["text"]
    author = quote["author"]
    border = "=" * width
    return f"\n{border}\n\n  {text}\n\n  - {author}\n\n{border}"


def search_quotes(query: str, quotes: list[dict]) -> list[dict]:
    """Search quotes by text or author (case-insensitive)."""
    q = query.lower()
    return [quote for quote in quotes if q in quote["text"].lower() or q in quote["author"].lower()]


def main() -> None:
    print("=" * 60)
    print("              RANDOM QUOTE CLI")
    print("=" * 60)
    print("Commands: random | today | search | list | quit\n")

    while True:
        cmd = input("> ").strip().lower()

        if cmd == "random":
            print(format_quote(get_random_quote(QUOTES)))

        elif cmd == "today":
            print("Quote of the day:")
            print(format_quote(get_quote_of_the_day(QUOTES)))

        elif cmd == "search":
            query = input("  Search term: ").strip()
            results = search_quotes(query, QUOTES)
            if results:
                for q in results:
                    print(format_quote(q))
            else:
                print(f"  No quotes matching '{query}'.")

        elif cmd == "list":
            for i, q in enumerate(QUOTES, 1):
                print(f"  {i}. {q['author']}: {q['text'][:50]}...")

        elif cmd == "quit":
            print("\nStay inspired!")
            break

        else:
            print("  Unknown command.")


if __name__ == "__main__":
    main()
