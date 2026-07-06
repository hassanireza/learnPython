"""
Day 13 Project: Currency Converter
====================================
Convert between currencies using exchange rates.
"""

# Exchange rates relative to USD
RATES: dict[str, float] = {
    "USD": 1.00,
    "EUR": 0.92,
    "GBP": 0.79,
    "JPY": 149.50,
    "CAD": 1.36,
    "AUD": 1.53,
    "CHF": 0.89,
    "CNY": 7.24,
    "INR": 83.12,
    "BRL": 4.97,
}


def convert(
    amount: float,
    from_currency: str,
    to_currency: str,
    rates: dict[str, float] = RATES,
) -> float:
    """Convert amount from one currency to another.

    Args:
        amount: The amount to convert.
        from_currency: ISO 4217 currency code (e.g. "USD").
        to_currency: Target ISO 4217 currency code.
        rates: Exchange rate dictionary keyed by USD.

    Returns:
        Converted amount as a float.

    Raises:
        KeyError: If either currency code is not in rates.
    """
    from_rate = rates[from_currency.upper()]
    to_rate = rates[to_currency.upper()]
    usd_amount = amount / from_rate
    return usd_amount * to_rate


def list_currencies(*_, rates: dict[str, float] = RATES) -> None:
    """Print all available currencies."""
    print("\nAvailable currencies:")
    for code in sorted(rates):
        print(f"  {code}")


def main() -> None:
    print("=" * 45)
    print("          CURRENCY CONVERTER")
    print("=" * 45)
    print("Type 'list' to see available currencies, 'quit' to exit.\n")

    while True:
        cmd = input("> ").strip().lower()

        if cmd == "quit":
            break
        elif cmd == "list":
            list_currencies()
            continue

        try:
            amount = float(input("  Amount    : "))
            from_c = input("  From      : ").strip().upper()
            to_c = input("  To        : ").strip().upper()
            result = convert(amount, from_c, to_c)
            print(f"\n  {amount:.2f} {from_c} = {result:.2f} {to_c}\n")
        except KeyError as e:
            print(f"  Unknown currency: {e}. Type 'list' to see options.")
        except ValueError:
            print("  Please enter a valid number for the amount.")


if __name__ == "__main__":
    main()
