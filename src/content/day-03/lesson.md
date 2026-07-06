# Day 03 ✍️ - Strings & String Methods

---

## Overview

Master Python strings - one of the most used data types - including slicing, formatting, and 15+ essential methods.

**What you will learn today:**

- String creation and indexing
- String slicing `[start:stop:step]`
- f-strings (formatted string literals)
- Essential string methods
- `str.format()` and `%` formatting
- Multiline strings with triple quotes

---

## Key Concepts

| Concept | Description |
|---|---|
| `Indexing` | Access individual characters with `[index]`. First character is index `0`. Negative indices count from the end. |
| `Slicing` | Extract substrings with `[start:stop:step]`. The stop index is not included. |
| `f-strings` | The modern way to embed variables in strings: `f'Hello, {name}!'`. Introduced in Python 3.6. |
| `Immutability` | Strings cannot be changed after creation. Methods always return a *new* string. |

---

## Code Examples

### Indexing and slicing

```python
text = "Python"
#        P  y  t  h  o  n
# Index: 0  1  2  3  4  5
#        -6 -5 -4 -3 -2 -1

print(text[0])      # P   (first character)
print(text[-1])     # n   (last character)
print(text[1:4])    # yth (index 1 up to but not including 4)
print(text[:3])     # Pyt (from start to index 3)
print(text[3:])     # hon (from index 3 to end)
print(text[::-1])   # nohtyP (reversed!)
```

### Essential string methods

```python
name = "  alice johnson  "

print(name.strip())         # "alice johnson"     (remove whitespace)
print(name.strip().title()) # "Alice Johnson"     (capitalize each word)
print(name.strip().upper()) # "ALICE JOHNSON"     (all uppercase)
print(name.strip().lower()) # "alice johnson"     (all lowercase)

sentence = "I love Python. Python is great."
print(sentence.count("Python"))        # 2
print(sentence.replace("Python", "code")) # "I love code. code is great."
print(sentence.split("."))             # ['I love Python', ' Python is great', '']
print("  ".join(["one", "two", "three"])) # "one  two  three"

email = "user@example.com"
print(email.startswith("user"))    # True
print(email.endswith(".com"))      # True
print(email.find("@"))            # 4  (index of @)
```

### f-strings - the modern way

```python
name = "Alice"
age = 28
score = 9.5

# Basic usage
print(f"My name is {name} and I am {age} years old.")

# Expressions inside f-strings
print(f"Next year I will be {age + 1}.")

# Formatting numbers
pi = 3.14159265
print(f"Pi to 2 decimal places: {pi:.2f}")
print(f"Pi as percentage: {pi * 100:.1f}%")

# Padding and alignment
for i in range(1, 4):
    print(f"Item {i:>3}: {'*' * i}")
# Item   1: *
# Item   2: **
# Item   3: ***
```

---

## Today's Project: Mad Libs Generator

> Ask the user for nouns, verbs, and adjectives, then slot them into a funny story template using string methods and f-strings.

**View the full project code in the "Project Solution" panel below.**

```python
"""
Day 03 Project: Mad Libs Generator
====================================
Collect words from the user and build a funny story.
"""

print("=" * 50)
print("     MAD LIBS STORY GENERATOR")
print("=" * 50)
print("\nAnswer the prompts below to build your story!\n")

# Collect words from the user
adjective1 = input("Enter an adjective (e.g. fluffy): ").strip()
noun1 = input("Enter a noun (e.g. elephant): ").strip()
verb_past = input("Enter a verb in past tense (e.g. jumped): ").strip()
place = input("Enter a place (e.g. the library): ").strip()
adjective2 = input("Enter another adjective (e.g. mysterious): ").strip()
noun2 = input("Enter another noun (e.g. sandwich): ").strip()
number = input("Enter a number: ").strip()
verb_ing = input("Enter a verb ending in -ing (e.g. dancing): ").strip()

# Normalize capitalization
adjective1 = adjective1.lower()
noun1 = noun1.lower()
verb_past = verb_past.lower()
place = place.lower()
adjective2 = adjective2.lower()
noun2 = noun2.lower()
verb_ing = verb_ing.lower()

# Build the story using an f-string template
story = f"""
{"=" * 50}
           YOUR MAD LIBS STORY
{"=" * 50}

Once upon a time, a {adjective1} {noun1} {verb_past} all the
way to {place}. Nobody expected to find a {adjective2}
{noun2} there, but there it was - all {number} of them!

The crowd began {verb_ing} immediately. It was the most
extraordinary sight anyone in {place} had ever seen.
The {noun1} smiled, took a bow, and disappeared forever.

THE END.
{"=" * 50}
"""

print(story)
```

---

## Knowledge Check

Before moving on, make sure you can answer these:

1. How do you run a Python script from the terminal?
2. What is the difference between `print("a", "b")` and `print("a" + "b")`?
3. Can you explain what happens when Python reads your file top to bottom?
4. What does the `#` symbol do in Python?
5. How do you enter and exit the Python REPL?

---

## Common Mistakes to Avoid

```python
# WRONG - mixing indentation
if True:
    print("hello")
  print("world")  # IndentationError

# CORRECT - consistent 4-space indentation
if True:
    print("hello")
    print("world")
```

---
