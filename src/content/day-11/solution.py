"""
Day 11 Project: Number Guessing Game
======================================
Guess the number with hot/cold hints and limited attempts.
"""
import random


def get_hint(guess: int, target: int) -> str:
    """Return a directional and temperature hint."""
    diff = abs(guess - target)
    direction = "higher" if target > guess else "lower"

    if diff == 0:
        return "CORRECT!"
    elif diff <= 3:
        temperature = "Scorching hot"
    elif diff <= 10:
        temperature = "Very warm"
    elif diff <= 20:
        temperature = "Getting warm"
    elif diff <= 40:
        temperature = "Cold"
    else:
        temperature = "Freezing cold"

    return f"{temperature}. Go {direction}."


def play_game(low: int = 1, high: int = 100, max_attempts: int = 7) -> bool:
    """Run one round of the guessing game. Returns True if the player won."""
    target = random.randint(low, high)
    print(f"\nI am thinking of a number between {low} and {high}.")
    print(f"You have {max_attempts} attempts. Good luck!\n")

    for attempt in range(1, max_attempts + 1):
        remaining = max_attempts - attempt + 1
        try:
            guess = int(input(f"Attempt {attempt}/{max_attempts}: "))
        except ValueError:
            print("Please enter a whole number.")
            continue

        if guess < low or guess > high:
            print(f"Please guess between {low} and {high}.")
            continue

        hint = get_hint(guess, target)
        print(f"  Hint: {hint}")

        if guess == target:
            print(f"\nYou got it in {attempt} attempt(s)!")
            return True

        if remaining > 1:
            print(f"  ({remaining - 1} attempt(s) left)")

    print(f"\nGame over! The number was {target}.")
    return False


def main() -> None:
    print("=" * 45)
    print("         NUMBER GUESSING GAME")
    print("=" * 45)

    wins = 0
    games = 0

    while True:
        won = play_game()
        games += 1
        if won:
            wins += 1

        print(f"\nRecord: {wins}/{games} wins")
        again = input("Play again? (y/n): ").strip().lower()
        if again != "y":
            print("\nThanks for playing!")
            break


if __name__ == "__main__":
    main()
