# Contributing to Python in 30 Days

Thank you for taking the time to contribute! Every improvement helps learners around the world.

## Ways to Contribute

- **Fix typos** in lessons or project descriptions
- **Improve explanations** that are unclear or could be more accurate
- **Add alternative solutions** to projects (different approaches are valuable)
- **Report bugs** in code examples (open an issue with the label `bug`)
- **Suggest new topics** for additional bonus days
- **Translate lessons** to other languages

## Before You Start

1. Check the [open issues](https://github.com/yourusername/python-30-days/issues) to avoid duplicating effort.
2. For large changes, open an issue first to discuss your approach.

## Contribution Process

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/python-30-days.git
cd python-30-days

# 3. Create a feature branch
git checkout -b fix/day-05-typo

# 4. Make your changes

# 5. Commit with a clear message
git commit -m "fix(day-05): correct type conversion example"

# 6. Push to your fork
git push origin fix/day-05-typo

# 7. Open a Pull Request on GitHub
```

## Code Style Guidelines

All Python code in this repository must follow these rules:

- **PEP 8** compliant (4-space indentation, 88-char line length)
- **Type hints** on all function signatures
- **Docstrings** on all functions and classes (PEP 257)
- **No bare `except:`** — always catch specific exceptions
- **f-strings** for string formatting (not `%` or `.format()`)

```python
# Good
def calculate_area(radius: float) -> float:
    """Return the area of a circle given its radius."""
    import math
    return math.pi * radius ** 2

# Bad
def calculate_area(r):
    import math
    return math.pi * r * r
```

## Commit Message Format

Use the conventional commit format:

```
type(scope): short description

types: fix, feat, docs, refactor, test
scope: day-XX, readme, assets, contributing
```

Examples:
- `fix(day-12): correct default parameter example`
- `docs(readme): add Windows setup instructions`
- `feat(day-17): add nested comprehension example`

## Reporting Issues

When reporting a bug in a code example, please include:

1. The day number and file path
2. What you expected to happen
3. What actually happened
4. Your Python version (`python3 --version`)
5. Your operating system

## Code of Conduct

Be kind. Be constructive. We are all here to learn.
