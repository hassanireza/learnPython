# Day 05 ⌨️ - User Input

<div align="center">

| [← Day 04: Previous Lesson](../day-04/README.md) | [🏠 Home](../../README.md) | [Day 06: Next Lesson →](../day-06/README.md) |
|:---|:---:|---:|

</div>

---

## Overview

Learn to make your Python programs interactive by reading input from the user, and safely converting that input to the right data type.

**What you will learn today:**

- The `input()` function
- Reading strings from the terminal
- Converting input to `int` or `float`
- Building interactive CLI programs
- Handling invalid input gracefully

---

## Key Concepts

| Concept | Description |
|---|---|
| `input()` | Pauses the program and waits for the user to type something and press Enter. Always returns a `str`. |
| `Type casting` | Since `input()` always returns a string, use `int()` or `float()` to convert before doing math. |
| `prompt` | The optional string passed to `input()` is displayed before the cursor: `input('Your age: ')`. |

---

## Code Examples

### Basic input usage

```python
# input() returns a string - always
name = input("What is your name? ")
print(f"Hello, {name}!")

# Convert to a number before arithmetic
age_str = input("How old are you? ")
age = int(age_str)
print(f"In 10 years, you will be {age + 10}.")

# One-liner conversion
price = float(input("Enter price: "))
tax = price * 0.1
print(f"Tax: ${tax:.2f}   Total: ${price + tax:.2f}")
```

### Safe input with error handling

```python
def get_integer(prompt: str) -> int:
    """Ask for input until the user enters a valid integer."""
    while True:
        try:
            return int(input(prompt))
        except ValueError:
            print("Please enter a whole number.")

age = get_integer("Enter your age: ")
print(f"Age entered: {age}")
```

---

## Today's Project: Interactive Quiz

> Build a 5-question multiple-choice quiz that collects answers, checks them, and shows a final score.

**View the full project:** [project/solution.py](./project/solution.py)

```python
"""
Day 05 Project: Interactive Quiz
==================================
A multiple-choice quiz with scoring.
"""

QUESTIONS = [
    {
        "question": "What does CPU stand for?",
        "options": ["A) Central Processing Unit", "B) Computer Personal Unit", "C) Core Processing Utility"],
        "answer": "A",
    },
    {
        "question": "How many bits are in a byte?",
        "options": ["A) 4", "B) 8", "C) 16"],
        "answer": "B",
    },
    {
        "question": "Which language was Python named after?",
        "options": ["A) A snake", "B) A Greek god", "C) Monty Python (the comedy group)"],
        "answer": "C",
    },
    {
        "question": "What does HTML stand for?",
        "options": ["A) HyperText Markup Language", "B) High Transfer Markup Layer", "C) HyperText Main Language"],
        "answer": "A",
    },
    {
        "question": "Which symbol is used for comments in Python?",
        "options": ["A) //", "B) /*", "C) #"],
        "answer": "C",
    },
]


def run_quiz(questions: list[dict]) -> int:
    """Run through questions and return the number of correct answers."""
    score = 0
    total = len(questions)

    print("\n" + "=" * 50)
    print("         PYTHON KNOWLEDGE QUIZ")
    print("=" * 50)

    for i, q in enumerate(questions, start=1):
        print(f"\nQuestion {i}/{total}: {q['question']}")
        for option in q["options"]:
            print(f"  {option}")

        while True:
            answer = input("\nYour answer (A/B/C): ").strip().upper()
            if answer in ("A", "B", "C"):
                break
            print("Please enter A, B, or C.")

        if answer == q["answer"]:
            print("Correct!")
            score += 1
        else:
            print(f"Wrong. The answer was {q['answer']}.")

    return score


def main() -> None:
    score = run_quiz(QUESTIONS)
    total = len(QUESTIONS)
    percentage = (score / total) * 100

    print("\n" + "=" * 50)
    print(f"  QUIZ COMPLETE! Score: {score}/{total} ({percentage:.0f}%)")
    if percentage == 100:
        print("  Perfect score! You are a genius!")
    elif percentage >= 60:
        print("  Good work! Keep learning!")
    else:
        print("  Keep studying - you will get there!")
    print("=" * 50)


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

| [← Day 04: Previous Lesson](../day-04/README.md) | [🏠 Home](../../README.md) | [Day 06: Next Lesson →](../day-06/README.md) |
|:---|:---:|---:|

</div>
