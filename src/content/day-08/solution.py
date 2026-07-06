"""
Day 08 Project: Contact Book
==============================
A contact manager using dictionaries.
"""


def display_contact(name: str, info: dict) -> None:
    """Pretty-print a single contact."""
    print(f"\n  Name  : {name}")
    print(f"  Phone : {info.get('phone', 'N/A')}")
    print(f"  Email : {info.get('email', 'N/A')}")


def main() -> None:
    contacts: dict[str, dict] = {}

    print("=" * 40)
    print("        CONTACT BOOK")
    print("=" * 40)
    print("Commands: add | search | list | delete | quit")

    while True:
        command = input("\n> ").strip().lower()

        if command == "add":
            name = input("  Name  : ").strip().title()
            if not name:
                print("  Name cannot be empty.")
                continue
            phone = input("  Phone : ").strip()
            email = input("  Email : ").strip()
            contacts[name] = {"phone": phone, "email": email}
            print(f"  Contact '{name}' saved.")

        elif command == "search":
            query = input("  Search name: ").strip().title()
            matches = {k: v for k, v in contacts.items() if query in k}
            if matches:
                for name, info in matches.items():
                    display_contact(name, info)
            else:
                print(f"  No contacts matching '{query}'.")

        elif command == "list":
            if not contacts:
                print("  No contacts saved yet.")
            else:
                print(f"\n  {len(contacts)} contact(s):")
                for name, info in sorted(contacts.items()):
                    display_contact(name, info)

        elif command == "delete":
            name = input("  Name to delete: ").strip().title()
            if name in contacts:
                del contacts[name]
                print(f"  Deleted: {name}")
            else:
                print(f"  Contact '{name}' not found.")

        elif command == "quit":
            print("\nGoodbye!")
            break

        else:
            print("  Unknown command.")


if __name__ == "__main__":
    main()
