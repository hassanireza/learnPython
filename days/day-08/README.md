# Day 08 📖 - Dictionaries

<div align="center">

| [← Day 07: Previous Lesson](../day-07/README.md) | [🏠 Home](../../README.md) | [Day 09: Next Lesson →](../day-09/README.md) |
|:---|:---:|---:|

</div>

---

## Overview

Dictionaries are Python's most powerful built-in data structure for mapping keys to values. Master them and you can model almost any real-world data.

**What you will learn today:**

- Creating dictionaries with `{}`
- Accessing values with keys and `.get()`
- Adding, updating, and deleting entries
- Iterating: `.keys()`, `.values()`, `.items()`
- Nested dictionaries
- Dictionary comprehensions

---

## Key Concepts

| Concept | Description |
|---|---|
| `dict` | A mutable, unordered (Python 3.7+ maintains insertion order) collection of key-value pairs. |
| `.get(key, default)` | Safe key access. Returns `None` (or your default) if the key does not exist. Does not raise an error. |
| `.items()` | Returns view of `(key, value)` pairs - the most useful method for iterating over a dict. |
| `dict comprehension` | Build dictionaries with `{k: v for k, v in iterable}`. Elegant and fast. |

---

## Code Examples

### Creating and accessing dicts

```python
# Create a dictionary
person = {
    "name": "Alice",
    "age": 28,
    "city": "San Francisco",
    "hobbies": ["coding", "reading"],
}

# Access by key
print(person["name"])          # Alice
print(person.get("age"))       # 28
print(person.get("email"))     # None (no error!)
print(person.get("email", "N/A"))  # "N/A" (custom default)

# Add and update
person["email"] = "alice@example.com"   # Add new key
person["age"] = 29                       # Update existing key

# Delete
del person["city"]
removed = person.pop("hobbies")         # Remove and return
```

### Iterating over dictionaries

```python
scores = {"Alice": 95, "Bob": 82, "Charlie": 91}

# Iterate over keys (default)
for name in scores:
    print(name)

# Iterate over values
for score in scores.values():
    print(score)

# Iterate over key-value pairs (most common pattern)
for name, score in scores.items():
    print(f"{name}: {score}")

# Find who has the highest score
top_student = max(scores, key=scores.get)
print(f"Top student: {top_student} ({scores[top_student]})")
```

### Nested dictionaries

```python
users = {
    "alice": {"email": "alice@ex.com", "role": "admin"},
    "bob":   {"email": "bob@ex.com",   "role": "user"},
}

# Access nested values
print(users["alice"]["role"])      # admin
print(users.get("charlie", {}))   # {} - safe default

# Iterate nested
for username, info in users.items():
    print(f"{username} ({info['role']}): {info['email']}")
```

---

## Today's Project: Contact Book

> Build a contact book that stores names, phone numbers, and emails, with the ability to add, search, update, and delete contacts.

**View the full project:** [project/solution.py](./project/solution.py)

```python
"""
Day 08 Project: Contact Book
==============================
A contact manager using dictionaries.
"""


def display_contact(name: str, info: dict) -> None:
    """Pretty-print a single contact."""
    print(f"\n  Name  : {name}")
    print(f"  Phone : {info.get('phone', 'N/A')}")
    print(f"  Email : {info.get('email', 'N/A')}")


def main() -> None:
    contacts: dict[str, dict] = {}

    print("=" * 40)
    print("        CONTACT BOOK")
    print("=" * 40)
    print("Commands: add | search | list | delete | quit")

    while True:
        command = input("\n> ").strip().lower()

        if command == "add":
            name = input("  Name  : ").strip().title()
            if not name:
                print("  Name cannot be empty.")
                continue
            phone = input("  Phone : ").strip()
            email = input("  Email : ").strip()
            contacts[name] = {"phone": phone, "email": email}
            print(f"  Contact '{name}' saved.")

        elif command == "search":
            query = input("  Search name: ").strip().title()
            matches = {k: v for k, v in contacts.items() if query in k}
            if matches:
                for name, info in matches.items():
                    display_contact(name, info)
            else:
                print(f"  No contacts matching '{query}'.")

        elif command == "list":
            if not contacts:
                print("  No contacts saved yet.")
            else:
                print(f"\n  {len(contacts)} contact(s):")
                for name, info in sorted(contacts.items()):
                    display_contact(name, info)

        elif command == "delete":
            name = input("  Name to delete: ").strip().title()
            if name in contacts:
                del contacts[name]
                print(f"  Deleted: {name}")
            else:
                print(f"  Contact '{name}' not found.")

        elif command == "quit":
            print("\nGoodbye!")
            break

        else:
            print("  Unknown command.")


if __name__ == "__main__":
    main()
```

---

## Knowledge Check

Before moving on, make sure you can explain:

1. What is the main concept covered today?
2. Write a short example from memory.
3. What is one common mistake with this concept?
4. How will you use this in real projects?

---

<div align="center">

| [← Day 07: Previous Lesson](../day-07/README.md) | [🏠 Home](../../README.md) | [Day 09: Next Lesson →](../day-09/README.md) |
|:---|:---:|---:|

</div>
