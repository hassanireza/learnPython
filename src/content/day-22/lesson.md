# Day 22 🧙 - Dunder Methods

---

## Overview

Dunder methods (double underscore methods) let your classes behave like Python builtins. This is how Python's data model works under the hood.

**What you will learn today:**

- What dunder methods are and why they matter
- `__str__` and `__repr__` for string representation
- `__len__`, `__getitem__`, `__contains__` for container behavior
- `__eq__`, `__lt__`, `__add__` for operator overloading
- `__call__` to make objects callable
- The full Python data model

---

## Key Concepts

| Concept | Description |
|---|---|
| `__str__` | Called by `str(obj)` and `print(obj)`. Return a human-readable string. |
| `__repr__` | Called by `repr(obj)` and in the REPL. Return an unambiguous representation, ideally one that could recreate the object. |
| `__len__` | Called by `len(obj)`. Return an integer. |
| `__eq__` | Called by `==`. Define what equality means for your objects. |
| `__add__` | Called by `+`. Enables `obj1 + obj2`. |

---

## Code Examples

### Core dunder methods

```python
class Vector:
    """2D vector with operator support."""

    def __init__(self, x: float, y: float) -> None:
        self.x = x
        self.y = y

    def __repr__(self) -> str:
        return f"Vector({self.x}, {self.y})"

    def __str__(self) -> str:
        return f"({self.x}, {self.y})"

    def __add__(self, other: "Vector") -> "Vector":
        return Vector(self.x + other.x, self.y + other.y)

    def __mul__(self, scalar: float) -> "Vector":
        return Vector(self.x * scalar, self.y * scalar)

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Vector):
            return NotImplemented
        return self.x == other.x and self.y == other.y

    def __len__(self) -> int:
        import math
        return int(math.sqrt(self.x**2 + self.y**2))

v1 = Vector(1, 2)
v2 = Vector(3, 4)
print(v1 + v2)     # (4, 6)
print(v1 * 3)      # (3, 6)
print(v1 == Vector(1, 2))  # True
print(len(v2))     # 5
```

---

## Today's Project: Custom Stack Data Structure

> Build a `Stack` class with full dunder method support that behaves naturally with Python built-in operations.

**View the full project code in the "Project Solution" panel below.**

```python
"""
Day 22 Project: Custom Stack Data Structure
=============================================
A Stack class with complete dunder method support.
"""
from typing import Generic, TypeVar

T = TypeVar("T")

class EmptyStackError(Exception):
    """Raised when popping from an empty stack."""

class Stack(Generic[T]):
    """A LIFO stack data structure with full Python data model support.

    Supports:
        len(), bool(), in, iteration, indexing, ==, +, repr(), str()
    """

    def __init__(self, *items: T) -> None:
        self._data: list[T] = list(items)

    def push(self, item: T) -> None:
        """Push an item onto the top of the stack."""
        self._data.append(item)

    def pop(self) -> T:
        """Remove and return the top item."""
        if not self._data:
            raise EmptyStackError("Cannot pop from an empty stack.")
        return self._data.pop()

    def peek(self) -> T:
        """Return the top item without removing it."""
        if not self._data:
            raise EmptyStackError("Stack is empty.")
        return self._data[-1]

    # --- Dunder Methods ---

    def __len__(self) -> int:
        return len(self._data)

    def __bool__(self) -> bool:
        return bool(self._data)

    def __contains__(self, item: object) -> bool:
        return item in self._data

    def __iter__(self):
        """Iterate from top to bottom."""
        return reversed(self._data)

    def __getitem__(self, index: int) -> T:
        """Access by index from top (index 0 = top)."""
        return self._data[-(index + 1)]

    def __eq__(self, other: object) -> bool:
        if not isinstance(other, Stack):
            return NotImplemented
        return self._data == other._data

    def __add__(self, other: "Stack[T]") -> "Stack[T]":
        """Combine two stacks (other on top of self)."""
        new = Stack(*self._data)
        for item in other._data:
            new.push(item)
        return new

    def __repr__(self) -> str:
        return f"Stack({self._data!r})"

    def __str__(self) -> str:
        if not self._data:
            return "Stack: [empty]"
        items = " -> ".join(str(item) for item in reversed(self._data))
        return f"Stack: [{items}] (top ->)"

def main() -> None:
    print("=" * 50)
    print("         CUSTOM STACK DEMO")
    print("=" * 50)

    s: Stack[int] = Stack(1, 2, 3)
    s.push(4)
    s.push(5)

    print(f"\nStack: {s}")
    print(f"len(s): {len(s)}")
    print(f"bool(s): {bool(s)}")
    print(f"3 in s: {3 in s}")
    print(f"s[0] (top): {s[0]}")
    print(f"Peek: {s.peek()}")

    print("\nIterating (top to bottom):")
    for item in s:
        print(f"  {item}")

    s2: Stack[int] = Stack(10, 20)
    combined = s + s2
    print(f"\nCombined: {combined}")

    print(f"\nPopping: {s.pop()}, {s.pop()}")
    print(f"After pops: {s}")

if __name__ == "__main__":
    main()
```

---

## Knowledge Check

Before moving on, make sure you can explain each concept without looking at the lesson.

---
