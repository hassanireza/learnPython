"""
Day 18 Project: Functional Pipeline
=====================================
Process sales data using functional tools.
"""
from functools import reduce

SALES = [
    {"product": "Laptop", "price": 999.99, "qty": 3, "category": "Electronics"},
    {"product": "Phone", "price": 699.99, "qty": 7, "category": "Electronics"},
    {"product": "Desk", "price": 249.99, "qty": 2, "category": "Furniture"},
    {"product": "Chair", "price": 189.99, "qty": 5, "category": "Furniture"},
    {"product": "Headphones", "price": 149.99, "qty": 12, "category": "Electronics"},
    {"product": "Lamp", "price": 49.99, "qty": 8, "category": "Furniture"},
    {"product": "Keyboard", "price": 79.99, "qty": 15, "category": "Electronics"},
]


def add_revenue(sale: dict) -> dict:
    """Return sale record with revenue field added."""
    return {**sale, "revenue": sale["price"] * sale["qty"]}


def main() -> None:
    print("=" * 55)
    print("           SALES DATA PIPELINE")
    print("=" * 55)

    # Step 1: Calculate revenue for each item (map)
    with_revenue = list(map(add_revenue, SALES))

    # Step 2: Filter high-value items only (filter)
    high_value = list(filter(lambda s: s["revenue"] > 500, with_revenue))

    # Step 3: Sort by revenue descending (sorted)
    ranked = sorted(high_value, key=lambda s: s["revenue"], reverse=True)

    # Step 4: Total revenue of all items (reduce)
    total = reduce(lambda acc, s: acc + s["revenue"], with_revenue, 0.0)

    print("\nTop Revenue Items:")
    print(f"  {'Product':<15} {'Price':>8} {'Qty':>5} {'Revenue':>10}")
    print("  " + "-" * 42)
    for sale in ranked:
        print(f"  {sale['product']:<15} ${sale['price']:>7.2f} {sale['qty']:>5} ${sale['revenue']:>9.2f}")

    print(f"\n  Total Revenue (all items): ${total:,.2f}")

    # Bonus: Electronics vs Furniture totals
    categories = {s["category"] for s in SALES}
    for cat in sorted(categories):
        cat_total = sum(s["revenue"] for s in with_revenue if s["category"] == cat)
        print(f"  {cat} Revenue: ${cat_total:,.2f}")


if __name__ == "__main__":
    main()
