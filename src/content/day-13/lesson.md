# Day 13 🎛️ - Function Arguments & Type Hints

---

## Overview

Go deeper into Python functions: positional, keyword, `*args`, `**kwargs`, type hints, and how to write functions that are both flexible and self-documenting.

**What you will learn today:**

- Positional vs keyword arguments
- `*args` for variable positional arguments
- `**kwargs` for variable keyword arguments
- Type hints with `->` and argument annotations
- The `typing` module for complex hints
- Argument ordering rules

---

## Key Concepts

| Concept | Description |
|---|---|
| `*args` | Collects all extra positional arguments into a tuple. The `*` is the syntax; `args` is the conventional name. |
| `**kwargs` | Collects all extra keyword arguments into a dictionary. Use `**` syntax. |
| `Type hints` | Annotations that tell readers (and tools) what types a function expects and returns. Not enforced at runtime. |
| `Keyword-only args` | Place `*` in the parameter list to force subsequent arguments to be passed by keyword only. |

---

## Code Examples

### *args and **kwargs

```python
# *args: collect extra positional arguments
def total(*args: float) -> float:
    """Sum any number of values."""
    return sum(args)

print(total(1, 2, 3))        # 6
print(total(10, 20, 30, 40)) # 100

# **kwargs: collect extra keyword arguments
def describe(**kwargs: str) -> None:
    """Print keyword descriptions."""
    for key, value in kwargs.items():
        print(f"  {key}: {value}")

describe(name="Alice", role="Developer", city="SF")

# Combining all argument types
def configure(host: str, port: int = 8080, *flags: str, **options: str) -> None:
    """Example of all argument types combined."""
    print(f"Host: {host}, Port: {port}")
    print(f"Flags: {flags}")
    print(f"Options: {options}")
```

### Type hints in practice

```python
from typing import Optional, Union

# Simple type hints
def add(a: int, b: int) -> int:
    return a + b

# Optional means the value can be None
def find_user(user_id: int) -> Optional[str]:
    users = {1: "Alice", 2: "Bob"}
    return users.get(user_id)

# Union (Python 3.9: use X | Y syntax instead)
def process(value: int | str) -> str:
    return str(value).upper()

# List, dict generics (Python 3.9+)
def average(nums: list[float]) -> float:
    return sum(nums) / len(nums) if nums else 0.0

def merge(a: dict[str, int], b: dict[str, int]) -> dict[str, int]:
    return {**a, **b}
```

---

## Today's Project: Currency Converter

> Build a currency converter using a dictionary of exchange rates, with support for listing all currencies and chaining conversions.

**View the full project code in the "Project Solution" panel below.**

```python
"""
Day 13 Project: Currency Converter
====================================
Convert between currencies using exchange rates.
"""

# Exchange rates relative to USD
RATES: dict[str, float] = {
    "USD": 1.00,
    "EUR": 0.92,
    "GBP": 0.79,
    "JPY": 149.50,
    "CAD": 1.36,
    "AUD": 1.53,
    "CHF": 0.89,
    "CNY": 7.24,
    "INR": 83.12,
    "BRL": 4.97,
}

def convert(
    amount: float,
    from_currency: str,
    to_currency: str,
    rates: dict[str, float] = RATES,
) -> float:
    """Convert amount from one currency to another.

    Args:
        amount: The amount to convert.
        from_currency: ISO 4217 currency code (e.g. "USD").
        to_currency: Target ISO 4217 currency code.
        rates: Exchange rate dictionary keyed by USD.

    Returns:
        Converted amount as a float.

    Raises:
        KeyError: If either currency code is not in rates.
    """
    from_rate = rates[from_currency.upper()]
    to_rate = rates[to_currency.upper()]
    usd_amount = amount / from_rate
    return usd_amount * to_rate

def list_currencies(*_, rates: dict[str, float] = RATES) -> None:
    """Print all available currencies."""
    print("\nAvailable currencies:")
    for code in sorted(rates):
        print(f"  {code}")

def main() -> None:
    print("=" * 45)
    print("          CURRENCY CONVERTER")
    print("=" * 45)
    print("Type 'list' to see available currencies, 'quit' to exit.\n")

    while True:
        cmd = input("> ").strip().lower()

        if cmd == "quit":
            break
        elif cmd == "list":
            list_currencies()
            continue

        try:
            amount = float(input("  Amount    : "))
            from_c = input("  From      : ").strip().upper()
            to_c = input("  To        : ").strip().upper()
            result = convert(amount, from_c, to_c)
            print(f"\n  {amount:.2f} {from_c} = {result:.2f} {to_c}\n")
        except KeyError as e:
            print(f"  Unknown currency: {e}. Type 'list' to see options.")
        except ValueError:
            print("  Please enter a valid number for the amount.")

if __name__ == "__main__":
    main()
```

---

## Knowledge Check

Before moving on, make sure you can explain each concept without looking at the lesson.

---
