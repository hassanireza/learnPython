# Day 15 🛡️ - Error Handling

---

## Overview

Write programs that fail gracefully. Learn to catch exceptions, raise your own, and ensure cleanup code always runs - the hallmark of professional Python.

**What you will learn today:**

- `try`, `except`, `else`, `finally` blocks
- Common built-in exceptions
- Catching specific vs all exceptions
- `raise` to throw exceptions intentionally
- Creating custom exception classes
- Best practices: what to catch, what to let propagate

---

## Key Concepts

| Concept | Description |
|---|---|
| `try/except` | Wrap risky code in `try`. If an exception occurs, the matching `except` block runs instead of crashing. |
| `else` | The `else` block after `try/except` runs only if NO exception was raised. Good for code that should run on success. |
| `finally` | Always runs, whether or not an exception occurred. Use for cleanup (closing files, releasing resources). |
| `raise` | Intentionally raise an exception to signal that something went wrong: `raise ValueError('message')`. |
| `Custom exceptions` | Subclass `Exception` to create domain-specific exceptions that carry meaning in your codebase. |

---

## Code Examples

### try / except / else / finally

```python
def read_number(prompt: str) -> float:
    """Read a float from input, retrying on invalid input."""
    while True:
        try:
            value = float(input(prompt))
        except ValueError:
            print("Please enter a valid number.")
        else:
            # Runs only if no exception occurred
            return value
        finally:
            # Always runs (even after return!)
            print("(input attempt complete)")

# Multiple except clauses
try:
    result = 10 / 0
except ZeroDivisionError:
    print("Cannot divide by zero.")
except ValueError as e:
    print(f"Value error: {e}")
except (TypeError, AttributeError) as e:
    print(f"Type/attribute error: {e}")
```

### Custom exceptions

```python
class InsufficientFundsError(Exception):
    """Raised when a bank account has insufficient funds."""

    def __init__(self, amount: float, balance: float) -> None:
        self.amount = amount
        self.balance = balance
        super().__init__(
            f"Cannot withdraw ${amount:.2f}: balance is ${balance:.2f}"
        )

class BankAccount:
    def __init__(self, balance: float = 0.0) -> None:
        self.balance = balance

    def withdraw(self, amount: float) -> None:
        if amount > self.balance:
            raise InsufficientFundsError(amount, self.balance)
        self.balance -= amount

account = BankAccount(100.0)
try:
    account.withdraw(150.0)
except InsufficientFundsError as e:
    print(e)   # Cannot withdraw $150.00: balance is $100.00
```

---

## Today's Project: Safe Calculator

> Build a robust four-function calculator that catches every possible error gracefully and never crashes unexpectedly.

**View the full project code in the "Project Solution" panel below.**

```python
"""
Day 15 Project: Safe Calculator
=================================
A crash-proof calculator with full error handling.
"""

class CalculatorError(Exception):
    """Base exception for calculator errors."""

class DivisionByZeroError(CalculatorError):
    """Raised when attempting to divide by zero."""

class InvalidOperatorError(CalculatorError):
    """Raised for unsupported operators."""

OPERATORS = {
    "+": lambda a, b: a + b,
    "-": lambda a, b: a - b,
    "*": lambda a, b: a * b,
    "/": lambda a, b: a / b,
    "//": lambda a, b: a // b,
    "**": lambda a, b: a ** b,
    "%": lambda a, b: a % b,
}

def calculate(a: float, op: str, b: float) -> float:
    """Perform a calculation safely.

    Raises:
        InvalidOperatorError: If the operator is not supported.
        DivisionByZeroError: If dividing by zero.
    """
    if op not in OPERATORS:
        raise InvalidOperatorError(f"Unsupported operator: {op!r}")
    if op in ("/", "//", "%") and b == 0:
        raise DivisionByZeroError("Cannot divide by zero.")
    return OPERATORS[op](a, b)

def parse_number(text: str, label: str) -> float:
    """Parse a string to float, raising ValueError with a clear message."""
    try:
        return float(text.strip())
    except ValueError:
        raise ValueError(f"Invalid {label}: {text!r} is not a number.")

def main() -> None:
    print("=" * 45)
    print("           SAFE CALCULATOR")
    print(f"  Operators: {', '.join(OPERATORS)}")
    print("=" * 45)
    print("Type 'quit' as the first number to exit.\n")

    history: list[str] = []

    while True:
        try:
            raw_a = input("First number  : ").strip()
            if raw_a.lower() == "quit":
                break

            a = parse_number(raw_a, "first number")
            op = input("Operator      : ").strip()
            b = parse_number(input("Second number : "), "second number")

            result = calculate(a, op, b)
            line = f"  {a} {op} {b} = {result}"
            print(line)
            history.append(line.strip())

        except (CalculatorError, ValueError) as e:
            print(f"  Error: {e}")
        except KeyboardInterrupt:
            print("\n  Cancelled.")
            break

    if history:
        print("\n--- Calculation History ---")
        for entry in history:
            print(f"  {entry}")
    print("\nGoodbye!")

if __name__ == "__main__":
    main()
```

---

## Knowledge Check

Before moving on, make sure you can explain each concept without looking at the lesson.

---
