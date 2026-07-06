# Day 02 📦 - Variables & Data Types

---

## Overview

Learn how Python stores information using variables and explore the four core data types.

**What you will learn today:**

- What variables are and why we need them
- The four core types: `int`, `float`, `str`, `bool`
- The `type()` function
- Type conversion (casting)
- Variable naming rules and conventions
- Multiple assignment

---

## Key Concepts

| Concept | Description |
|---|---|
| `Variables` | Names that point to values stored in memory. Python is dynamically typed - you do not declare the type. |
| `int` | Whole numbers with no decimal point. Example: `42`, `-7`, `0` |
| `float` | Numbers with a decimal point. Example: `3.14`, `-0.5`, `2.0` |
| `str` | Text, enclosed in single or double quotes. Example: `'hello'`, `"world"` |
| `bool` | Either `True` or `False`. Used for logic and conditions. |

---

## Code Examples

### Creating and using variables

```python
# Create variables by simply assigning a value
name = "Alice"
age = 28
height = 5.6
is_student = False

# Use the variable anywhere after it is defined
print(name)      # Alice
print(age + 2)   # 30
print(height)    # 5.6
print(is_student)# False
```

### Checking and converting types

```python
# Check the type of any variable with type()
x = 42
print(type(x))          # <class 'int'>

price = 9.99
print(type(price))      # <class 'float'>

label = "sale"
print(type(label))      # <class 'str'>

# Convert between types
num_str = "100"
num_int = int(num_str)  # "100" -> 100
print(type(num_int))    # <class 'int'>

ratio = float(num_int)  # 100 -> 100.0
print(ratio)            # 100.0

# Convert number to string
code = str(42)          # 42 -> "42"
print("Your code is: " + code)
```

### Multiple assignment

```python
# Assign multiple variables on one line
x, y, z = 1, 2, 3
print(x, y, z)   # 1 2 3

# Assign the same value to multiple variables
a = b = c = 0
print(a, b, c)   # 0 0 0

# Swap values without a temporary variable
x, y = y, x
print(x, y)      # 2 1
```

---

## Today's Project: Type Explorer

> Build a program that accepts a value from the user, identifies its type, and converts it to all compatible types.

**View the full project code in the "Project Solution" panel below.**

```python
"""
Day 02 Project: Type Explorer
==============================
Accept user input and explore data type conversions.
"""

print("=== TYPE EXPLORER ===")
print("Enter a value and we'll explore its type.\n")

user_input = input("Enter any value: ")

print(f"\nYou entered : {user_input!r}")
print(f"Type        : {type(user_input).__name__}")
print()
print("--- Conversion Attempts ---")

# Try converting to int
try:
    as_int = int(user_input)
    print(f"As int      : {as_int}")
except ValueError:
    print("As int      : Not possible")

# Try converting to float
try:
    as_float = float(user_input)
    print(f"As float    : {as_float}")
except ValueError:
    print("As float    : Not possible")

# Always possible - every value has a string form
as_str = str(user_input)
print(f"As string   : {as_str!r}")

# Boolean interpretation
as_bool = bool(user_input)
print(f"As bool     : {as_bool}")
print()
print(f"Length (chars): {len(user_input)}")
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
