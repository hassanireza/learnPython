"""
Day 24 Project: Infinite Sequences Generator Library
======================================================
Memory-efficient infinite mathematical sequences.
"""
import itertools
from typing import Generator


def fibonacci() -> Generator[int, None, None]:
    """Yield the infinite Fibonacci sequence: 0, 1, 1, 2, 3, 5, ..."""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b


def primes() -> Generator[int, None, None]:
    """Yield all prime numbers: 2, 3, 5, 7, 11, ..."""
    sieve: dict[int, list[int]] = {}
    n = 2
    while True:
        if n not in sieve:
            yield n
            sieve[n * n] = [n]
        else:
            for p in sieve[n]:
                sieve.setdefault(n + p, []).append(p)
            del sieve[n]
        n += 1


def collatz(n: int) -> Generator[int, None, None]:
    """Yield the Collatz sequence starting at n."""
    while n != 1:
        yield n
        n = n // 2 if n % 2 == 0 else 3 * n + 1
    yield 1


def triangular() -> Generator[int, None, None]:
    """Yield triangular numbers: 1, 3, 6, 10, 15, ..."""
    n, total = 1, 0
    while True:
        total += n
        yield total
        n += 1


def running_average(iterable) -> Generator[float, None, None]:
    """Yield the running average of values from an iterable."""
    total = 0.0
    for count, value in enumerate(iterable, start=1):
        total += value
        yield total / count


def take(n: int, gen) -> list:
    """Return the first n values from a generator."""
    return list(itertools.islice(gen, n))


def main() -> None:
    print("=" * 55)
    print("        INFINITE SEQUENCES GENERATOR LIBRARY")
    print("=" * 55)

    print(f"\nFirst 10 Fibonacci  : {take(10, fibonacci())}")
    print(f"First 10 Primes     : {take(10, primes())}")
    print(f"First 10 Triangular : {take(10, triangular())}")

    n = 27
    col = take(100, collatz(n))
    print(f"\nCollatz({n}) - {len(col)} steps:")
    print(f"  {col[:15]}...")
    print(f"  Max value in sequence: {max(col)}")

    data = [4, 8, 15, 16, 23, 42]
    avgs = list(running_average(data))
    print(f"\nRunning average of {data}:")
    print(f"  {[round(a, 2) for a in avgs]}")

    print(f"\nPrimes between 50 and 100:")
    big_primes = list(itertools.takewhile(lambda x: x <= 100, itertools.dropwhile(lambda x: x < 50, primes())))
    print(f"  {big_primes}")


if __name__ == "__main__":
    main()
