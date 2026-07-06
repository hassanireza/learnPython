"""
Day 03 Project: Mad Libs Generator
====================================
Collect words from the user and build a funny story.
"""

print("=" * 50)
print("     MAD LIBS STORY GENERATOR")
print("=" * 50)
print("\nAnswer the prompts below to build your story!\n")

# Collect words from the user
adjective1 = input("Enter an adjective (e.g. fluffy): ").strip()
noun1 = input("Enter a noun (e.g. elephant): ").strip()
verb_past = input("Enter a verb in past tense (e.g. jumped): ").strip()
place = input("Enter a place (e.g. the library): ").strip()
adjective2 = input("Enter another adjective (e.g. mysterious): ").strip()
noun2 = input("Enter another noun (e.g. sandwich): ").strip()
number = input("Enter a number: ").strip()
verb_ing = input("Enter a verb ending in -ing (e.g. dancing): ").strip()

# Normalize capitalization
adjective1 = adjective1.lower()
noun1 = noun1.lower()
verb_past = verb_past.lower()
place = place.lower()
adjective2 = adjective2.lower()
noun2 = noun2.lower()
verb_ing = verb_ing.lower()

# Build the story using an f-string template
story = f"""
{"=" * 50}
           YOUR MAD LIBS STORY
{"=" * 50}

Once upon a time, a {adjective1} {noun1} {verb_past} all the
way to {place}. Nobody expected to find a {adjective2}
{noun2} there, but there it was - all {number} of them!

The crowd began {verb_ing} immediately. It was the most
extraordinary sight anyone in {place} had ever seen.
The {noun1} smiled, took a bow, and disappeared forever.

THE END.
{"=" * 50}
"""

print(story)
