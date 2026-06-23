"""
Day 05 Project: Interactive Quiz
==================================
A multiple-choice quiz with scoring.
"""

QUESTIONS = [
    {
        "question": "What does CPU stand for?",
        "options": ["A) Central Processing Unit", "B) Computer Personal Unit", "C) Core Processing Utility"],
        "answer": "A",
    },
    {
        "question": "How many bits are in a byte?",
        "options": ["A) 4", "B) 8", "C) 16"],
        "answer": "B",
    },
    {
        "question": "Which language was Python named after?",
        "options": ["A) A snake", "B) A Greek god", "C) Monty Python (the comedy group)"],
        "answer": "C",
    },
    {
        "question": "What does HTML stand for?",
        "options": ["A) HyperText Markup Language", "B) High Transfer Markup Layer", "C) HyperText Main Language"],
        "answer": "A",
    },
    {
        "question": "Which symbol is used for comments in Python?",
        "options": ["A) //", "B) /*", "C) #"],
        "answer": "C",
    },
]


def run_quiz(questions: list[dict]) -> int:
    """Run through questions and return the number of correct answers."""
    score = 0
    total = len(questions)

    print("\n" + "=" * 50)
    print("         PYTHON KNOWLEDGE QUIZ")
    print("=" * 50)

    for i, q in enumerate(questions, start=1):
        print(f"\nQuestion {i}/{total}: {q['question']}")
        for option in q["options"]:
            print(f"  {option}")

        while True:
            answer = input("\nYour answer (A/B/C): ").strip().upper()
            if answer in ("A", "B", "C"):
                break
            print("Please enter A, B, or C.")

        if answer == q["answer"]:
            print("Correct!")
            score += 1
        else:
            print(f"Wrong. The answer was {q['answer']}.")

    return score


def main() -> None:
    score = run_quiz(QUESTIONS)
    total = len(QUESTIONS)
    percentage = (score / total) * 100

    print("\n" + "=" * 50)
    print(f"  QUIZ COMPLETE! Score: {score}/{total} ({percentage:.0f}%)")
    if percentage == 100:
        print("  Perfect score! You are a genius!")
    elif percentage >= 60:
        print("  Good work! Keep learning!")
    else:
        print("  Keep studying - you will get there!")
    print("=" * 50)


if __name__ == "__main__":
    main()
