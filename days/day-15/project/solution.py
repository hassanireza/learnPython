"""
Day 15 Project: Safe Calculator
=================================
A crash-proof calculator with full error handling.
"""


class CalculatorError(Exception):
    """Base exception for calculator errors."""


class DivisionByZeroError(CalculatorError):
    """Raised when attempting to divide by zero."""


class InvalidOperatorError(CalculatorError):
    """Raised for unsupported operators."""


OPERATORS = {
    "+": lambda a, b: a + b,
    "-": lambda a, b: a - b,
    "*": lambda a, b: a * b,
    "/": lambda a, b: a / b,
    "//": lambda a, b: a // b,
    "**": lambda a, b: a ** b,
    "%": lambda a, b: a % b,
}


def calculate(a: float, op: str, b: float) -> float:
    """Perform a calculation safely.

    Raises:
        InvalidOperatorError: If the operator is not supported.
        DivisionByZeroError: If dividing by zero.
    """
    if op not in OPERATORS:
        raise InvalidOperatorError(f"Unsupported operator: {op!r}")
    if op in ("/", "//", "%") and b == 0:
        raise DivisionByZeroError("Cannot divide by zero.")
    return OPERATORS[op](a, b)


def parse_number(text: str, label: str) -> float:
    """Parse a string to float, raising ValueError with a clear message."""
    try:
        return float(text.strip())
    except ValueError:
        raise ValueError(f"Invalid {label}: {text!r} is not a number.")


def main() -> None:
    print("=" * 45)
    print("           SAFE CALCULATOR")
    print(f"  Operators: {', '.join(OPERATORS)}")
    print("=" * 45)
    print("Type 'quit' as the first number to exit.\n")

    history: list[str] = []

    while True:
        try:
            raw_a = input("First number  : ").strip()
            if raw_a.lower() == "quit":
                break

            a = parse_number(raw_a, "first number")
            op = input("Operator      : ").strip()
            b = parse_number(input("Second number : "), "second number")

            result = calculate(a, op, b)
            line = f"  {a} {op} {b} = {result}"
            print(line)
            history.append(line.strip())

        except (CalculatorError, ValueError) as e:
            print(f"  Error: {e}")
        except KeyboardInterrupt:
            print("\n  Cancelled.")
            break

    if history:
        print("\n--- Calculation History ---")
        for entry in history:
            print(f"  {entry}")
    print("\nGoodbye!")


if __name__ == "__main__":
    main()
