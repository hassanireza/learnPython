"""
Day 17 Project: Data Filter Tool
==================================
Filter and transform student data using comprehensions.
"""

STUDENTS = [
    {"name": "Alice", "grade": 92, "subject": "Math"},
    {"name": "Bob", "grade": 71, "subject": "Science"},
    {"name": "Charlie", "grade": 88, "subject": "Math"},
    {"name": "Diana", "grade": 55, "subject": "History"},
    {"name": "Eve", "grade": 95, "subject": "Science"},
    {"name": "Frank", "grade": 63, "subject": "Math"},
    {"name": "Grace", "grade": 79, "subject": "History"},
    {"name": "Henry", "grade": 84, "subject": "Science"},
]


def letter_grade(score: int) -> str:
    """Convert a numeric score to a letter grade."""
    if score >= 90:
        return "A"
    elif score >= 80:
        return "B"
    elif score >= 70:
        return "C"
    elif score >= 60:
        return "D"
    return "F"


def main() -> None:
    print("=" * 55)
    print("              DATA FILTER TOOL")
    print("=" * 55)

    # Add letter grades using a comprehension
    enriched = [
        {**s, "letter": letter_grade(s["grade"])}
        for s in STUDENTS
    ]

    # Students who passed (grade >= 60)
    passed = [s["name"] for s in enriched if s["grade"] >= 60]
    failed = [s["name"] for s in enriched if s["grade"] < 60]

    # Group by subject
    subjects = {s["subject"] for s in STUDENTS}
    by_subject = {
        subj: [s for s in enriched if s["subject"] == subj]
        for subj in sorted(subjects)
    }

    # Average per subject
    averages = {
        subj: sum(s["grade"] for s in students) / len(students)
        for subj, students in by_subject.items()
    }

    print(f"\nTotal students : {len(STUDENTS)}")
    print(f"Passed (>=60)  : {len(passed)} - {passed}")
    print(f"Failed (<60)   : {len(failed)} - {failed}")

    print("\nResults by subject:")
    for subj, students in by_subject.items():
        avg = averages[subj]
        names = [f"{s['name']} ({s['letter']})" for s in students]
        print(f"\n  {subj} (avg: {avg:.1f})")
        for name in names:
            print(f"    - {name}")

    top = max(STUDENTS, key=lambda s: s["grade"])
    print(f"\nTop student: {top['name']} with {top['grade']}%")


if __name__ == "__main__":
    main()
