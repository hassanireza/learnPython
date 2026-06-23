# Day 29 🧪 - Testing with pytest

<div align="center">

| [← Day 28: Previous Lesson](../day-28/README.md) | [🏠 Home](../../README.md) | [Day 30: Next Lesson →](../day-30/README.md) |
|:---|:---:|---:|

</div>

---

## Overview

Professional Python developers write tests. Learn pytest — the industry-standard testing framework — and adopt Test-Driven Development habits from day one.

**What you will learn today:**

- Why tests matter and what they catch
- Writing `assert` statements
- pytest test discovery conventions
- Fixtures with `@pytest.fixture`
- Parametrize with `@pytest.mark.parametrize`
- Testing exceptions with `pytest.raises`

---

## Key Concepts

| Concept | Description |
|---|---|
| `pytest` | A third-party testing framework. Install with `pip install pytest`. Run tests with `pytest` in the terminal. |
| `assert` | Verifies a condition is True. If False, the test fails and pytest shows a clear diff. |
| `fixture` | A function decorated with `@pytest.fixture` that sets up shared test data or state. |
| `parametrize` | Run the same test with multiple inputs. Reduces duplicated test code dramatically. |
| `pytest.raises` | Context manager that asserts a specific exception is raised inside the block. |

---

## Code Examples

### Your first pytest tests

```python
# test_calculator.py  (file must start with test_)

def add(a: int, b: int) -> int:
    return a + b

def divide(a: float, b: float) -> float:
    if b == 0:
        raise ValueError("Cannot divide by zero")
    return a / b

# Test functions must start with test_
def test_add_positive_numbers():
    assert add(2, 3) == 5

def test_add_negative():
    assert add(-1, -1) == -2

def test_add_zero():
    assert add(0, 100) == 100

# Run: pytest test_calculator.py -v
```

### Fixtures and parametrize

```python
import pytest

@pytest.fixture
def sample_list():
    """Provide a fresh list for each test."""
    return [1, 2, 3, 4, 5]

def test_list_length(sample_list):
    assert len(sample_list) == 5

def test_list_sum(sample_list):
    assert sum(sample_list) == 15

# Parametrize: run test with multiple inputs
@pytest.mark.parametrize("a, b, expected", [
    (2, 3, 5),
    (-1, 1, 0),
    (0, 0, 0),
    (100, 200, 300),
])
def test_add_parametrized(a, b, expected):
    assert add(a, b) == expected

# Test that exceptions are raised
def test_divide_by_zero():
    with pytest.raises(ValueError, match="Cannot divide by zero"):
        divide(10, 0)
```

---

## Today's Project: Full Test Suite

> Write a complete pytest test suite for a `BankAccount` class, covering happy paths, edge cases, and exception handling.

**View the full project:** [project/solution.py](./project/solution.py)

```python
"""
Day 29 Project: Full Test Suite
================================
Complete pytest tests for a BankAccount class.

Run with:  pytest solution.py -v
"""
import pytest


# ── Code Under Test ──────────────────────────────────────────────────────

class InsufficientFundsError(Exception):
    """Raised when a withdrawal exceeds the balance."""


class BankAccount:
    """A simple bank account."""

    def __init__(self, owner: str, balance: float = 0.0) -> None:
        if balance < 0:
            raise ValueError("Initial balance cannot be negative.")
        self.owner = owner
        self._balance = balance
        self._transactions: list[dict] = []

    @property
    def balance(self) -> float:
        return self._balance

    def deposit(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self._balance += amount
        self._transactions.append({"type": "deposit", "amount": amount})

    def withdraw(self, amount: float) -> None:
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if amount > self._balance:
            raise InsufficientFundsError(
                f"Cannot withdraw {amount}: balance is {self._balance}"
            )
        self._balance -= amount
        self._transactions.append({"type": "withdraw", "amount": amount})

    def transfer(self, amount: float, target: "BankAccount") -> None:
        self.withdraw(amount)
        target.deposit(amount)

    @property
    def transaction_count(self) -> int:
        return len(self._transactions)


# ── Fixtures ─────────────────────────────────────────────────────────────

@pytest.fixture
def empty_account():
    """A brand-new account with zero balance."""
    return BankAccount("Alice")


@pytest.fixture
def funded_account():
    """An account with $1000 balance."""
    return BankAccount("Bob", balance=1000.0)


@pytest.fixture
def two_accounts():
    """Two accounts for transfer tests."""
    return BankAccount("Alice", 500.0), BankAccount("Bob", 200.0)


# ── Tests: Initialization ─────────────────────────────────────────────────

class TestInit:
    def test_default_balance_is_zero(self, empty_account):
        assert empty_account.balance == 0.0

    def test_initial_balance_set(self, funded_account):
        assert funded_account.balance == 1000.0

    def test_owner_stored(self, funded_account):
        assert funded_account.owner == "Bob"

    def test_negative_initial_balance_raises(self):
        with pytest.raises(ValueError, match="cannot be negative"):
            BankAccount("X", balance=-100.0)


# ── Tests: Deposit ────────────────────────────────────────────────────────

class TestDeposit:
    def test_deposit_increases_balance(self, empty_account):
        empty_account.deposit(100.0)
        assert empty_account.balance == 100.0

    def test_multiple_deposits(self, empty_account):
        empty_account.deposit(50.0)
        empty_account.deposit(75.0)
        assert empty_account.balance == 125.0

    @pytest.mark.parametrize("amount", [0.01, 1.0, 999.99, 1_000_000.0])
    def test_valid_deposit_amounts(self, empty_account, amount):
        empty_account.deposit(amount)
        assert empty_account.balance == pytest.approx(amount)

    def test_zero_deposit_raises(self, empty_account):
        with pytest.raises(ValueError, match="must be positive"):
            empty_account.deposit(0)

    def test_negative_deposit_raises(self, empty_account):
        with pytest.raises(ValueError):
            empty_account.deposit(-50.0)

    def test_deposit_records_transaction(self, empty_account):
        empty_account.deposit(100.0)
        assert empty_account.transaction_count == 1


# ── Tests: Withdrawal ─────────────────────────────────────────────────────

class TestWithdraw:
    def test_withdraw_decreases_balance(self, funded_account):
        funded_account.withdraw(200.0)
        assert funded_account.balance == 800.0

    def test_withdraw_entire_balance(self, funded_account):
        funded_account.withdraw(1000.0)
        assert funded_account.balance == 0.0

    def test_overdraft_raises(self, funded_account):
        with pytest.raises(InsufficientFundsError):
            funded_account.withdraw(1001.0)

    def test_zero_withdrawal_raises(self, funded_account):
        with pytest.raises(ValueError):
            funded_account.withdraw(0)

    def test_negative_withdrawal_raises(self, funded_account):
        with pytest.raises(ValueError):
            funded_account.withdraw(-100.0)

    def test_balance_unchanged_after_failed_withdraw(self, funded_account):
        try:
            funded_account.withdraw(9999.0)
        except InsufficientFundsError:
            pass
        assert funded_account.balance == 1000.0


# ── Tests: Transfer ───────────────────────────────────────────────────────

class TestTransfer:
    def test_transfer_moves_funds(self, two_accounts):
        alice, bob = two_accounts
        alice.transfer(100.0, bob)
        assert alice.balance == 400.0
        assert bob.balance == 300.0

    def test_transfer_insufficient_funds_raises(self, two_accounts):
        alice, bob = two_accounts
        with pytest.raises(InsufficientFundsError):
            alice.transfer(9999.0, bob)

    def test_failed_transfer_leaves_balances_unchanged(self, two_accounts):
        alice, bob = two_accounts
        try:
            alice.transfer(9999.0, bob)
        except InsufficientFundsError:
            pass
        assert alice.balance == 500.0
        assert bob.balance == 200.0
```

---

## Knowledge Check

Before moving on, make sure you can explain each concept without looking at the lesson.

---

<div align="center">

| [← Day 28: Previous Lesson](../day-28/README.md) | [🏠 Home](../../README.md) | [Day 30: Next Lesson →](../day-30/README.md) |
|:---|:---:|---:|

</div>
