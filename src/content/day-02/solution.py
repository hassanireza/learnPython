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
