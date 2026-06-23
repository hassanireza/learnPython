"""
Day 10 Project: Multiplication Table
======================================
Generate formatted multiplication tables.
"""


def print_multiplication_table(number: int, size: int = 10) -> None:
    """Print a multiplication table for the given number."""
    print(f"\n  Multiplication table for {number} (up to {size})")
    print("  " + "-" * 30)
    for i in range(1, size + 1):
        result = number * i
        print(f"  {number:>3} x {i:>3} = {result:>5}")
    print("  " + "-" * 30)


def print_full_grid(size: int = 10) -> None:
    """Print a full N x N multiplication grid."""
    print(f"\n  Full {size} x {size} Multiplication Grid")
    print()

    # Header row
    header = "    " + "".join(f"{i:>5}" for i in range(1, size + 1))
    print(header)
    print("    " + "-" * (size * 5))

    for row in range(1, size + 1):
        line = f"{row:>3} |"
        for col in range(1, size + 1):
            line += f"{row * col:>5}"
        print(line)


def main() -> None:
    print("=" * 45)
    print("        MULTIPLICATION TABLE GENERATOR")
    print("=" * 45)
    print("\nChoose mode:")
    print("  1. Table for one number")
    print("  2. Full multiplication grid")

    choice = input("\nYour choice (1/2): ").strip()

    if choice == "1":
        try:
            number = int(input("Enter the number: "))
            size = int(input("Table size (default 10): ") or "10")
            print_multiplication_table(number, size)
        except ValueError:
            print("Please enter valid integers.")

    elif choice == "2":
        try:
            size = int(input("Grid size (default 10): ") or "10")
            print_full_grid(size)
        except ValueError:
            print("Please enter a valid integer.")
    else:
        print("Invalid choice.")


if __name__ == "__main__":
    main()
