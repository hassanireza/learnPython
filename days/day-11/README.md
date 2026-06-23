# Day 11 🔁 - while Loops

<div align="center">

| [← Day 10: Previous Lesson](../day-10/README.md) | [🏠 Home](../../README.md) | [Day 12: Next Lesson →](../day-12/README.md) |
|:---|:---:|---:|

</div>

---

## Overview

The `while` loop runs as long as a condition is true. Learn when to use `while` over `for`, and how to build interactive programs with loop control.

**What you will learn today:**

- `while` loop syntax
- Avoiding infinite loops
- `break` to exit, `continue` to skip
- The `while...else` clause
- Sentinel values for loop termination
- Building interactive menus with `while True`

---

## Key Concepts

| Concept | Description |
|---|---|
| `while` | Repeats a block of code as long as the condition is `True`. Check the condition before every iteration. |
| `Infinite loop` | A `while True:` loop runs forever unless a `break` is encountered. Useful for menus and event loops. |
| `while...else` | The `else` block after a `while` runs when the condition becomes `False`, but NOT if `break` was used. |
| `Sentinel value` | A special value that signals the loop should stop. For example, asking user to enter -1 to quit. |

---

## Code Examples

### Basic while loops

```python
# Count up
count = 0
while count < 5:
    print(count)
    count += 1        # IMPORTANT: must move toward termination!
# 0 1 2 3 4

# User-driven loop with sentinel
total = 0
print("Enter numbers to sum. Enter 0 to stop.")
while True:
    num = float(input("Number: "))
    if num == 0:
        break
    total += num
print(f"Total: {total}")
```

### while...else and menus

```python
# while...else: else runs if loop ends naturally (no break)
n = 10
while n > 0:
    n -= 3
else:
    print("Loop ended naturally. n =", n)  # n = -2

# Interactive menu pattern (extremely common in Python programs)
menu = """
1. Say hello
2. Print date
3. Quit
"""
while True:
    print(menu)
    choice = input("Choose (1-3): ").strip()
    if choice == "1":
        print("Hello!")
    elif choice == "2":
        from datetime import date
        print(date.today())
    elif choice == "3":
        print("Goodbye!")
        break
    else:
        print("Invalid choice. Try again.")
```

---

## Today's Project: Number Guessing Game

> Build a number guessing game where the computer picks a random number and the player has limited attempts, with hot/cold hints.

**View the full project:** [project/solution.py](./project/solution.py)

```python
"""
Day 11 Project: Number Guessing Game
======================================
Guess the number with hot/cold hints and limited attempts.
"""
import random


def get_hint(guess: int, target: int) -> str:
    """Return a directional and temperature hint."""
    diff = abs(guess - target)
    direction = "higher" if target > guess else "lower"

    if diff == 0:
        return "CORRECT!"
    elif diff <= 3:
        temperature = "Scorching hot"
    elif diff <= 10:
        temperature = "Very warm"
    elif diff <= 20:
        temperature = "Getting warm"
    elif diff <= 40:
        temperature = "Cold"
    else:
        temperature = "Freezing cold"

    return f"{temperature}. Go {direction}."


def play_game(low: int = 1, high: int = 100, max_attempts: int = 7) -> bool:
    """Run one round of the guessing game. Returns True if the player won."""
    target = random.randint(low, high)
    print(f"\nI am thinking of a number between {low} and {high}.")
    print(f"You have {max_attempts} attempts. Good luck!\n")

    for attempt in range(1, max_attempts + 1):
        remaining = max_attempts - attempt + 1
        try:
            guess = int(input(f"Attempt {attempt}/{max_attempts}: "))
        except ValueError:
            print("Please enter a whole number.")
            continue

        if guess < low or guess > high:
            print(f"Please guess between {low} and {high}.")
            continue

        hint = get_hint(guess, target)
        print(f"  Hint: {hint}")

        if guess == target:
            print(f"\nYou got it in {attempt} attempt(s)!")
            return True

        if remaining > 1:
            print(f"  ({remaining - 1} attempt(s) left)")

    print(f"\nGame over! The number was {target}.")
    return False


def main() -> None:
    print("=" * 45)
    print("         NUMBER GUESSING GAME")
    print("=" * 45)

    wins = 0
    games = 0

    while True:
        won = play_game()
        games += 1
        if won:
            wins += 1

        print(f"\nRecord: {wins}/{games} wins")
        again = input("Play again? (y/n): ").strip().lower()
        if again != "y":
            print("\nThanks for playing!")
            break


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

<div align="center">

| [← Day 10: Previous Lesson](../day-10/README.md) | [🏠 Home](../../README.md) | [Day 12: Next Lesson →](../day-12/README.md) |
|:---|:---:|---:|

</div>
