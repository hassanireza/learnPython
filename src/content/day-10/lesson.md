# Day 10 🔄 - for Loops

---

## Overview

The `for` loop is Python's workhorse for iteration. Learn to loop over any sequence, use `enumerate()` and `zip()`, and understand `range()`.

**What you will learn today:**

- `for` loop syntax and how it works
- Looping with `range(start, stop, step)`
- `enumerate()` for index + value pairs
- `zip()` to loop multiple sequences together
- `break` and `continue` for loop control
- Nested loops and their use cases

---

## Key Concepts

| Concept | Description |
|---|---|
| `for` | Iterates over any iterable: list, string, range, tuple, dict, file, and more. |
| `range()` | Generates a sequence of numbers. `range(5)` gives 0,1,2,3,4. `range(1,10,2)` gives 1,3,5,7,9. |
| `enumerate()` | Returns `(index, value)` pairs. Avoids the need for a manual counter variable. |
| `zip()` | Pairs elements from multiple iterables into tuples. Stops at the shortest one. |
| `break / continue` | `break` exits the loop entirely. `continue` skips the rest of the current iteration. |

---

## Code Examples

### range() and basic for loops

```python
# Loop a fixed number of times
for i in range(5):
    print(i)     # 0 1 2 3 4

# Loop with start and stop
for i in range(1, 6):
    print(i)     # 1 2 3 4 5

# Loop with step
for i in range(0, 20, 5):
    print(i)     # 0 5 10 15

# Countdown
for i in range(10, 0, -1):
    print(i, end=" ")  # 10 9 8 7 6 5 4 3 2 1

# Loop over a list
fruits = ["apple", "banana", "cherry"]
for fruit in fruits:
    print(fruit.upper())
```

### enumerate() and zip()

```python
students = ["Alice", "Bob", "Charlie"]
scores = [95, 82, 91]

# enumerate: get index and value together
for i, student in enumerate(students, start=1):
    print(f"{i}. {student}")
# 1. Alice
# 2. Bob
# 3. Charlie

# zip: iterate two lists at the same time
for student, score in zip(students, scores):
    print(f"{student}: {score}")
# Alice: 95
# Bob: 82

# break and continue
for i in range(10):
    if i == 3:
        continue     # skip 3
    if i == 7:
        break        # stop at 7
    print(i, end=" ")  # 0 1 2 4 5 6
```

---

## Today's Project: Multiplication Table

> Generate a formatted multiplication table for any number and size the user requests.

**View the full project code in the "Project Solution" panel below.**

```python
"""
Day 10 Project: Multiplication Table
======================================
Generate formatted multiplication tables.
"""

def print_multiplication_table(number: int, size: int = 10) -> None:
    """Print a multiplication table for the given number."""
    print(f"\n  Multiplication table for {number} (up to {size})")
    print("  " + "-" * 30)
    for i in range(1, size + 1):
        result = number * i
        print(f"  {number:>3} x {i:>3} = {result:>5}")
    print("  " + "-" * 30)

def print_full_grid(size: int = 10) -> None:
    """Print a full N x N multiplication grid."""
    print(f"\n  Full {size} x {size} Multiplication Grid")
    print()

    # Header row
    header = "    " + "".join(f"{i:>5}" for i in range(1, size + 1))
    print(header)
    print("    " + "-" * (size * 5))

    for row in range(1, size + 1):
        line = f"{row:>3} |"
        for col in range(1, size + 1):
            line += f"{row * col:>5}"
        print(line)

def main() -> None:
    print("=" * 45)
    print("        MULTIPLICATION TABLE GENERATOR")
    print("=" * 45)
    print("\nChoose mode:")
    print("  1. Table for one number")
    print("  2. Full multiplication grid")

    choice = input("\nYour choice (1/2): ").strip()

    if choice == "1":
        try:
            number = int(input("Enter the number: "))
            size = int(input("Table size (default 10): ") or "10")
            print_multiplication_table(number, size)
        except ValueError:
            print("Please enter valid integers.")

    elif choice == "2":
        try:
            size = int(input("Grid size (default 10): ") or "10")
            print_full_grid(size)
        except ValueError:
            print("Please enter a valid integer.")
    else:
        print("Invalid choice.")

if __name__ == "__main__":
    main()
```

---

## Knowledge Check

Before moving on, make sure you can explain:

1. What is the main concept covered today?
2. Write a short example from memory without looking at the lesson.
3. What is one common mistake with this concept, and how do you avoid it?
4. How will you use this in real projects?

---
