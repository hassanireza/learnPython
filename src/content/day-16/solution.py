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
