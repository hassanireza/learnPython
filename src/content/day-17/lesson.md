# Day 17 ⚡ - List Comprehensions

---

## Overview

List comprehensions are one of Python's most beloved features - write concise, readable transformations in a single line.

**What you will learn today:**

- List comprehension syntax `[expr for item in iterable]`
- Filtering with conditions: `[expr for item in iterable if cond]`
- Nested comprehensions
- Dictionary comprehensions `{k: v for ...}`
- Set comprehensions `{expr for ...}`
- When to use comprehensions vs regular loops

---

## Key Concepts

| Concept | Description |
|---|---|
| `List comprehension` | A compact way to build a list: `[expression for item in iterable if condition]`. More readable than a loop + `append()`. |
| `Dict comprehension` | Build a dictionary: `{key_expr: val_expr for item in iterable}`. Perfect for transforming or filtering dicts. |
| `Set comprehension` | Build a set: `{expr for item in iterable}`. Automatically removes duplicates. |
| `Readability rule` | If a comprehension needs more than one `if` or produces complex logic, use a regular `for` loop instead. |

---

## Code Examples

### List comprehensions

```python
# Loop version
squares = []
for n in range(1, 6):
    squares.append(n ** 2)

# Comprehension version (equivalent, more Pythonic)
squares = [n ** 2 for n in range(1, 6)]
print(squares)    # [1, 4, 9, 16, 25]

# With a condition (filter)
evens = [n for n in range(20) if n % 2 == 0]
print(evens)      # [0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

# Transformation + filter combined
names = ["alice", "bob", "charlie", "dave", "eve"]
long_names = [name.title() for name in names if len(name) > 3]
print(long_names)  # ['Alice', 'Charlie', 'Dave']
```

### Dict and set comprehensions

```python
# Dict comprehension
words = ["hello", "world", "python"]
word_lengths = {word: len(word) for word in words}
print(word_lengths)  # {'hello': 5, 'world': 5, 'python': 6}

# Invert a dictionary
original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
print(inverted)   # {1: 'a', 2: 'b', 3: 'c'}

# Set comprehension (unique values)
data = [1, 2, 2, 3, 3, 3, 4]
unique_squares = {n ** 2 for n in data}
print(unique_squares)  # {1, 4, 9, 16}
```

---

## Today's Project: Data Filter Tool

> Process a list of student records using comprehensions: filter by grade, compute statistics, and transform the data.

**View the full project code in the "Project Solution" panel below.**

```python
"""
Day 17 Project: Data Filter Tool
==================================
Filter and transform student data using comprehensions.
"""

STUDENTS = [
    {"name": "Alice", "grade": 92, "subject": "Math"},
    {"name": "Bob", "grade": 71, "subject": "Science"},
    {"name": "Charlie", "grade": 88, "subject": "Math"},
    {"name": "Diana", "grade": 55, "subject": "History"},
    {"name": "Eve", "grade": 95, "subject": "Science"},
    {"name": "Frank", "grade": 63, "subject": "Math"},
    {"name": "Grace", "grade": 79, "subject": "History"},
    {"name": "Henry", "grade": 84, "subject": "Science"},
]

def letter_grade(score: int) -> str:
    """Convert a numeric score to a letter grade."""
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    return "F"

def main() -> None:
    print("=" * 55)
    print("              DATA FILTER TOOL")
    print("=" * 55)

    # Add letter grades using a comprehension
    enriched = [
        {**s, "letter": letter_grade(s["grade"])}
        for s in STUDENTS
    ]

    # Students who passed (grade >= 60)
    passed = [s["name"] for s in enriched if s["grade"] >= 60]
    failed = [s["name"] for s in enriched if s["grade"] < 60]

    # Group by subject
    subjects = {s["subject"] for s in STUDENTS}
    by_subject = {
        subj: [s for s in enriched if s["subject"] == subj]
        for subj in sorted(subjects)
    }

    # Average per subject
    averages = {
        subj: sum(s["grade"] for s in students) / len(students)
        for subj, students in by_subject.items()
    }

    print(f"\nTotal students : {len(STUDENTS)}")
    print(f"Passed (>=60)  : {len(passed)} - {passed}")
    print(f"Failed (<60)   : {len(failed)} - {failed}")

    print("\nResults by subject:")
    for subj, students in by_subject.items():
        avg = averages[subj]
        names = [f"{s['name']} ({s['letter']})" for s in students]
        print(f"\n  {subj} (avg: {avg:.1f})")
        for name in names:
            print(f"    - {name}")

    top = max(STUDENTS, key=lambda s: s["grade"])
    print(f"\nTop student: {top['name']} with {top['grade']}%")

if __name__ == "__main__":
    main()
```

---

## Knowledge Check

Before moving on, make sure you can explain each concept without looking at the lesson.

---
