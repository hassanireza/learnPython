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
