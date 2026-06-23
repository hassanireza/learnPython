# Day 19 📦 - Modules & Packages

<div align="center">

| [← Day 18: Previous Lesson](../day-18/README.md) | [🏠 Home](../../README.md) | [Day 20: Next Lesson →](../day-20/README.md) |
|:---|:---:|---:|

</div>

---

## Overview

Learn to organize your code into reusable modules, use the Python standard library, and manage third-party packages with `pip`.

**What you will learn today:**

- Creating and importing your own modules
- `from module import name` vs `import module`
- The `__name__ == '__main__'` guard
- Exploring the Python standard library
- Installing packages with `pip`
- Virtual environments with `venv`

---

## Key Concepts

| Concept | Description |
|---|---|
| `module` | Any `.py` file is a module. Import it with `import filename` (without the `.py`). |
| `package` | A directory containing an `__init__.py` file, grouping related modules together. |
| `__name__` | Set to `'__main__'` when a file is run directly, or to the module name when imported. The guard `if __name__ == '__main__':` prevents code from running on import. |
| `venv` | A virtual environment is an isolated Python installation for a project. Best practice for every project. |

---

## Code Examples

### Importing modules

```python
# Import the whole module (access via module.function)
import math
print(math.sqrt(16))      # 4.0
print(math.pi)             # 3.14159...

# Import specific names
from math import sqrt, pi
print(sqrt(16))            # 4.0 (no prefix needed)

# Import with an alias
import datetime as dt
today = dt.date.today()
print(today)

# Import all names (avoid in production - pollutes namespace)
from os.path import *

# Standard library highlights
import random
import json
import os
import sys
import re
import collections
import itertools
```

### Virtual environments and pip

```python
# Create a virtual environment
# python3 -m venv venv

# Activate it:
# macOS/Linux:  source venv/bin/activate
# Windows:      venv\Scripts\activate

# Install packages
# pip install requests
# pip install "requests==2.31.0"  # pin a version

# Save dependencies
# pip freeze > requirements.txt

# Install from requirements
# pip install -r requirements.txt

# Deactivate
# deactivate

# Check installed packages
# pip list
# pip show requests
```

---

## Today's Project: Random Quote CLI

> Build a modular quote application with a separate quotes module, display module, and main runner.

**View the full project:** [project/solution.py](./project/solution.py)

```python
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
```

---

## Knowledge Check

Before moving on, make sure you can explain each concept without looking at the lesson.

---

<div align="center">

| [← Day 18: Previous Lesson](../day-18/README.md) | [🏠 Home](../../README.md) | [Day 20: Next Lesson →](../day-20/README.md) |
|:---|:---:|---:|

</div>
