# Day 06 📋 - Lists

<div align="center">

| [← Day 05: Previous Lesson](../day-05/README.md) | [🏠 Home](../../README.md) | [Day 07: Next Lesson →](../day-07/README.md) |
|:---|:---:|---:|

</div>

---

## Overview

Lists are Python's most versatile data structure. Learn to create, modify, and iterate over ordered collections of items.

**What you will learn today:**

- Creating lists with `[]`
- Indexing and slicing lists
- Adding items: `append()`, `insert()`, `extend()`
- Removing items: `remove()`, `pop()`, `del`
- Sorting with `sort()` and `sorted()`
- Common list methods and patterns

---

## Key Concepts

| Concept | Description |
|---|---|
| `list` | An ordered, mutable sequence that can hold items of any type, including other lists. |
| `append()` | Adds one item to the end of a list. Modifies the list in place. |
| `pop()` | Removes and returns an item by index. Without an index, removes the last item. |
| `sorted()` | Returns a new sorted list without modifying the original. Use `sort()` to sort in place. |
| `len()` | Returns the number of items in a list. |

---

## Code Examples

### Creating and accessing lists

```python
# Create a list with square brackets
fruits = ["apple", "banana", "cherry", "date"]

# Access by index (0-based)
print(fruits[0])     # apple
print(fruits[-1])    # date (last item)
print(fruits[1:3])   # ['banana', 'cherry'] (slice)

# Check if an item is in the list
print("banana" in fruits)    # True
print("mango" in fruits)     # False

# Get the length
print(len(fruits))           # 4
```

### Modifying lists

```python
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# Add items
numbers.append(5)          # Add to end: [3,1,4,1,5,9,2,6,5]
numbers.insert(0, 0)       # Insert at index 0: [0,3,1,4,...]
numbers.extend([7, 8])     # Add multiple items from another list

# Remove items
numbers.remove(1)          # Removes FIRST occurrence of 1
popped = numbers.pop()     # Remove and return last item
del numbers[0]             # Delete item at index 0

# Sort
numbers.sort()             # Sort in place (ascending)
numbers.sort(reverse=True) # Sort descending
new_sorted = sorted(numbers) # Returns new sorted list
```

### Iterating and transforming

```python
colors = ["red", "green", "blue", "yellow"]

# Iterate with a for loop
for color in colors:
    print(color.upper())

# Iterate with index using enumerate()
for i, color in enumerate(colors):
    print(f"{i}: {color}")

# List comprehension (preview of Day 17)
lengths = [len(color) for color in colors]
print(lengths)   # [3, 5, 4, 6]
```

---

## Today's Project: Shopping List Manager

> Build an interactive shopping list where you can add items, remove items, and view your list - all from the terminal.

**View the full project:** [project/solution.py](./project/solution.py)

```python
"""
Day 06 Project: Shopping List Manager
=======================================
Manage a shopping list with add, remove, and view commands.
"""


def display_list(items: list[str]) -> None:
    """Print the current shopping list."""
    print("\n--- Shopping List ---")
    if not items:
        print("  (empty)")
    else:
        for i, item in enumerate(items, start=1):
            print(f"  {i}. {item}")
    print("--------------------")


def main() -> None:
    shopping_list: list[str] = []

    print("=" * 40)
    print("     SHOPPING LIST MANAGER")
    print("=" * 40)
    print("Commands: add | remove | view | clear | quit")

    while True:
        command = input("\n> ").strip().lower()

        if command == "add":
            item = input("  Item to add: ").strip()
            if item:
                shopping_list.append(item.title())
                print(f"  Added: {item.title()}")
            else:
                print("  Item name cannot be empty.")

        elif command == "remove":
            display_list(shopping_list)
            if shopping_list:
                try:
                    idx = int(input("  Enter item number to remove: ")) - 1
                    removed = shopping_list.pop(idx)
                    print(f"  Removed: {removed}")
                except (ValueError, IndexError):
                    print("  Invalid number.")

        elif command == "view":
            display_list(shopping_list)

        elif command == "clear":
            shopping_list.clear()
            print("  List cleared.")

        elif command == "quit":
            print(f"\nFinal list has {len(shopping_list)} item(s). Goodbye!")
            break

        else:
            print("  Unknown command. Try: add, remove, view, clear, quit")


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

| [← Day 05: Previous Lesson](../day-05/README.md) | [🏠 Home](../../README.md) | [Day 07: Next Lesson →](../day-07/README.md) |
|:---|:---:|---:|

</div>
