# Day 18 🗃️ - Lambda, Map, Filter & Sorted

---

## Overview

Functional programming tools in Python: write anonymous functions with `lambda`, transform sequences with `map()` and `filter()`, and sort anything with `sorted()`.

**What you will learn today:**

- `lambda` anonymous functions
- `map(func, iterable)` to transform elements
- `filter(func, iterable)` to select elements
- `sorted()` with `key=` argument
- `functools.reduce()` for aggregation
- When to prefer comprehensions over functional tools

---

## Key Concepts

| Concept | Description |
|---|---|
| `lambda` | An anonymous single-expression function. `lambda x: x * 2` is equivalent to `def f(x): return x * 2`. Use for short, throwaway functions. |
| `map()` | Applies a function to every item in an iterable. Returns a `map` object (lazy); wrap in `list()` to see results. |
| `filter()` | Keeps items where the function returns `True`. Returns a `filter` object (lazy). |
| `sorted() key=` | The `key` argument accepts a function applied to each element before comparing. Very powerful for custom sorts. |

---

## Code Examples

### lambda and map

```python
# lambda: anonymous functions
double = lambda x: x * 2
print(double(5))       # 10

# More natural as an argument to another function
numbers = [1, 2, 3, 4, 5]
doubled = list(map(lambda x: x * 2, numbers))
print(doubled)         # [2, 4, 6, 8, 10]

# map with a named function
def celsius_to_fahrenheit(c: float) -> float:
    return c * 9/5 + 32

temps_c = [0, 20, 37, 100]
temps_f = list(map(celsius_to_fahrenheit, temps_c))
print(temps_f)  # [32.0, 68.0, 98.6, 212.0]
```

### filter and sorted

```python
numbers = [1, -2, 3, -4, 5, -6, 7]

# filter keeps items where function returns True
positives = list(filter(lambda x: x > 0, numbers))
print(positives)   # [1, 3, 5, 7]

# sorted() with key function
words = ["banana", "apple", "cherry", "fig", "elderberry"]
by_length = sorted(words, key=len)
print(by_length)   # ['fig', 'apple', 'banana', 'cherry', 'elderberry']

# Sort complex objects
people = [
    {"name": "Bob", "age": 30},
    {"name": "Alice", "age": 25},
    {"name": "Charlie", "age": 35},
]
by_age = sorted(people, key=lambda p: p["age"])
print([p["name"] for p in by_age])  # ['Alice', 'Bob', 'Charlie']
```

---

## Today's Project: Functional Data Pipeline

> Process a sales dataset using `map()`, `filter()`, `sorted()`, and `reduce()` to demonstrate functional data transformation.

**View the full project code in the "Project Solution" panel below.**

```python
"""
Day 18 Project: Functional Pipeline
=====================================
Process sales data using functional tools.
"""
from functools import reduce

SALES = [
    {"product": "Laptop", "price": 999.99, "qty": 3, "category": "Electronics"},
    {"product": "Phone", "price": 699.99, "qty": 7, "category": "Electronics"},
    {"product": "Desk", "price": 249.99, "qty": 2, "category": "Furniture"},
    {"product": "Chair", "price": 189.99, "qty": 5, "category": "Furniture"},
    {"product": "Headphones", "price": 149.99, "qty": 12, "category": "Electronics"},
    {"product": "Lamp", "price": 49.99, "qty": 8, "category": "Furniture"},
    {"product": "Keyboard", "price": 79.99, "qty": 15, "category": "Electronics"},
]

def add_revenue(sale: dict) -> dict:
    """Return sale record with revenue field added."""
    return {**sale, "revenue": sale["price"] * sale["qty"]}

def main() -> None:
    print("=" * 55)
    print("           SALES DATA PIPELINE")
    print("=" * 55)

    # Step 1: Calculate revenue for each item (map)
    with_revenue = list(map(add_revenue, SALES))

    # Step 2: Filter high-value items only (filter)
    high_value = list(filter(lambda s: s["revenue"] > 500, with_revenue))

    # Step 3: Sort by revenue descending (sorted)
    ranked = sorted(high_value, key=lambda s: s["revenue"], reverse=True)

    # Step 4: Total revenue of all items (reduce)
    total = reduce(lambda acc, s: acc + s["revenue"], with_revenue, 0.0)

    print("\nTop Revenue Items:")
    print(f"  {'Product':<15} {'Price':>8} {'Qty':>5} {'Revenue':>10}")
    print("  " + "-" * 42)
    for sale in ranked:
        print(f"  {sale['product']:<15} ${sale['price']:>7.2f} {sale['qty']:>5} ${sale['revenue']:>9.2f}")

    print(f"\n  Total Revenue (all items): ${total:,.2f}")

    # Bonus: Electronics vs Furniture totals
    categories = {s["category"] for s in SALES}
    for cat in sorted(categories):
        cat_total = sum(s["revenue"] for s in with_revenue if s["category"] == cat)
        print(f"  {cat} Revenue: ${cat_total:,.2f}")

if __name__ == "__main__":
    main()
```

---

## Knowledge Check

Before moving on, make sure you can explain each concept without looking at the lesson.

---
