# Day 16 📁 - File I/O

---

## Overview

Read and write files with Python - a core skill for data processing, logging, configuration, and storage.

**What you will learn today:**

- Opening files with `open()` and the `with` statement
- Reading: `read()`, `readline()`, `readlines()`
- Writing: `write()`, `writelines()`
- File modes: `r`, `w`, `a`, `x`, `b`
- The `pathlib.Path` module (modern approach)
- Working with directories

---

## Key Concepts

| Concept | Description |
|---|---|
| `with open()` | Context manager that automatically closes the file, even if an exception occurs. Always prefer this over `open()` + `close()`. |
| `pathlib.Path` | The modern, object-oriented way to work with file system paths. Replaces `os.path` for most use cases. |
| `mode 'r'` | Read mode (default). Raises `FileNotFoundError` if the file does not exist. |
| `mode 'w'` | Write mode. Creates the file if it does not exist. OVERWRITES if it does. |
| `mode 'a'` | Append mode. Creates the file if needed. Adds content to the end without overwriting. |

---

## Code Examples

### Reading files

```python
from pathlib import Path

# Write a sample file first
Path("sample.txt").write_text("Line 1\nLine 2\nLine 3\n")

# Read entire file at once
content = Path("sample.txt").read_text()
print(content)

# Read line by line (memory-efficient for large files)
with open("sample.txt", "r") as f:
    for line in f:
        print(line.strip())    # strip() removes the trailing newline

# Read all lines into a list
with open("sample.txt", "r") as f:
    lines = f.readlines()     # ['Line 1\n', 'Line 2\n', ...]
```

### Writing and pathlib

```python
from pathlib import Path

# Write a file (overwrites if exists)
Path("notes.txt").write_text("My notes\n")

# Append to a file
with open("notes.txt", "a") as f:
    f.write("Second line\n")
    f.write("Third line\n")

# pathlib - modern path operations
p = Path("notes.txt")
print(p.exists())       # True
print(p.name)           # notes.txt
print(p.suffix)         # .txt
print(p.stem)           # notes
print(p.stat().st_size) # file size in bytes

# List files in a directory
for file in Path(".").glob("*.txt"):
    print(file.name)
```

---

## Today's Project: Personal Diary

> Build a personal diary application that saves dated entries to a file, and lets you read back past entries.

**View the full project code in the "Project Solution" panel below.**

```python
"""
Day 16 Project: Personal Diary
================================
A file-based personal diary with dated entries.
"""
from datetime import datetime
from pathlib import Path

DIARY_FILE = Path("my_diary.txt")

def write_entry(text: str) -> None:
    """Append a timestamped entry to the diary file."""
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M")
    separator = "-" * 40
    entry = f"\n{separator}\n[{timestamp}]\n{separator}\n{text.strip()}\n"
    with open(DIARY_FILE, "a", encoding="utf-8") as f:
        f.write(entry)
    print(f"  Entry saved to {DIARY_FILE}")

def read_entries(last_n: int | None = None) -> None:
    """Read and display diary entries."""
    if not DIARY_FILE.exists():
        print("  No diary entries yet. Start writing!")
        return

    content = DIARY_FILE.read_text(encoding="utf-8")
    entries = [e.strip() for e in content.split("-" * 40) if e.strip()]

    if last_n:
        entries = entries[-last_n * 2:]

    if not entries:
        print("  Diary is empty.")
        return

    print(f"\n--- Diary ({len(entries) // 2} entry/entries) ---")
    print(content if not last_n else "\n" + ("-" * 40 + "\n").join(entries))

def main() -> None:
    print("=" * 45)
    print("          PERSONAL DIARY")
    print("=" * 45)
    print("Commands: write | read | recent | quit\n")

    while True:
        command = input("> ").strip().lower()

        if command == "write":
            print("  Write your entry (press Enter twice when done):")
            lines = []
            while True:
                line = input("  ")
                if line == "":
                    break
                lines.append(line)
            if lines:
                write_entry("\n".join(lines))
            else:
                print("  Empty entry not saved.")

        elif command == "read":
            read_entries()

        elif command == "recent":
            try:
                n = int(input("  Show last N entries: "))
                read_entries(last_n=n)
            except ValueError:
                print("  Please enter a number.")

        elif command == "quit":
            print("\nUntil next time!")
            break

        else:
            print("  Unknown command.")

if __name__ == "__main__":
    main()
```

---

## Knowledge Check

Before moving on, make sure you can explain each concept without looking at the lesson.

---
