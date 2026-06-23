# Day 30 🏆 - Final Project: CLI Todo App

<div align="center">

| [← Day 29: Previous Lesson](../day-29/README.md) | [🏠 Home](../../README.md) | → 🎉 You finished the course! |
|:---|:---:|---:|

</div>

---

## Overview

Congratulations on reaching Day 30! Today you build a complete, production-quality command-line Todo application that brings together every concept you have learned.

**What you will learn today:**

- Combining OOP, file I/O, JSON, error handling, and type hints
- CLI argument parsing with `argparse`
- Persistent storage with JSON
- Professional project structure
- Writing a complete `README` for your project
- Next steps: what to learn after this course

---

## Key Concepts

| Concept | Description |
|---|---|
| `argparse` | Standard library module for building professional command-line interfaces with help text, flags, and subcommands. |
| `dataclass` | Decorator that auto-generates `__init__`, `__repr__`, and `__eq__` from class annotations. Perfect for data containers. |
| `json persistence` | Serialize your application state to a JSON file so data survives between program runs. |
| `sys.exit()` | Exit the program with a status code. `sys.exit(0)` = success, `sys.exit(1)` = error. |

---

## Code Examples

### argparse basics

```python
import argparse

parser = argparse.ArgumentParser(
    prog="todo",
    description="A command-line todo manager",
)
subparsers = parser.add_subparsers(dest="command")

# todo add "Buy groceries" --priority high
add_parser = subparsers.add_parser("add", help="Add a new task")
add_parser.add_argument("title", help="Task title")
add_parser.add_argument("--priority", choices=["low", "medium", "high"],
                        default="medium")

# todo list
subparsers.add_parser("list", help="List all tasks")

# todo done 3
done_parser = subparsers.add_parser("done", help="Mark task as done")
done_parser.add_argument("id", type=int, help="Task ID")

args = parser.parse_args()
print(args)
```

### dataclasses

```python
from dataclasses import dataclass, field
from datetime import datetime

@dataclass
class Task:
    title: str
    priority: str = "medium"
    done: bool = False
    id: int = 0
    created_at: str = field(default_factory=lambda: datetime.now().isoformat())

    def __str__(self) -> str:
        status = "DONE" if self.done else "TODO"
        return f"[{status}] #{self.id} {self.title} ({self.priority})"

t = Task("Buy groceries", priority="high")
print(t)  # [TODO] #0 Buy groceries (high)
```

---

## Today's Project: CLI Todo Manager

> A fully featured command-line Todo application with add, list, done, delete, filter, and export commands, persistent JSON storage, and a clean `--help` interface.

**View the full project:** [project/solution.py](./project/solution.py)

```python
"""
Day 30 Final Project: CLI Todo Manager
========================================
A complete command-line task manager combining:
  OOP  |  dataclasses  |  JSON persistence  |  argparse  |  type hints

Usage:
  python solution.py add "Buy groceries" --priority high
  python solution.py list
  python solution.py list --filter pending
  python solution.py done 1
  python solution.py delete 2
  python solution.py export tasks_backup.json
  python solution.py stats
"""
import argparse
import json
import sys
from dataclasses import asdict, dataclass, field
from datetime import datetime
from pathlib import Path


# ── Data Model ───────────────────────────────────────────────────────────

@dataclass
class Task:
    """A single todo task."""
    title: str
    priority: str = "medium"
    done: bool = False
    task_id: int = 0
    created_at: str = field(default_factory=lambda: datetime.now().strftime("%Y-%m-%d %H:%M"))
    completed_at: str = ""

    @property
    def status_icon(self) -> str:
        return "✓" if self.done else "○"

    @property
    def priority_icon(self) -> str:
        return {"high": "!!!", "medium": "! ", "low": "  "}.get(self.priority, "  ")

    def __str__(self) -> str:
        done_str = f" [done {self.completed_at}]" if self.done else ""
        return (f"  [{self.status_icon}] #{self.task_id:<3} "
                f"{self.priority_icon} {self.title}{done_str}")


# ── Storage ───────────────────────────────────────────────────────────────

class TaskStore:
    """Persist tasks to a JSON file."""

    def __init__(self, path: Path) -> None:
        self.path = path
        self._tasks: list[Task] = []
        self._next_id: int = 1
        self._load()

    def _load(self) -> None:
        if self.path.exists():
            try:
                raw = json.loads(self.path.read_text(encoding="utf-8"))
                self._tasks = [Task(**t) for t in raw.get("tasks", [])]
                self._next_id = raw.get("next_id", 1)
            except (json.JSONDecodeError, TypeError):
                self._tasks = []
                self._next_id = 1

    def _save(self) -> None:
        data = {
            "next_id": self._next_id,
            "tasks": [asdict(t) for t in self._tasks],
        }
        self.path.write_text(json.dumps(data, indent=2), encoding="utf-8")

    def add(self, title: str, priority: str) -> Task:
        task = Task(title=title, priority=priority, task_id=self._next_id)
        self._next_id += 1
        self._tasks.append(task)
        self._save()
        return task

    def get(self, task_id: int) -> Task | None:
        return next((t for t in self._tasks if t.task_id == task_id), None)

    def all_tasks(self) -> list[Task]:
        return list(self._tasks)

    def pending(self) -> list[Task]:
        return [t for t in self._tasks if not t.done]

    def completed(self) -> list[Task]:
        return [t for t in self._tasks if t.done]

    def mark_done(self, task_id: int) -> Task | None:
        task = self.get(task_id)
        if task and not task.done:
            task.done = True
            task.completed_at = datetime.now().strftime("%Y-%m-%d %H:%M")
            self._save()
        return task

    def delete(self, task_id: int) -> bool:
        original = len(self._tasks)
        self._tasks = [t for t in self._tasks if t.task_id != task_id]
        if len(self._tasks) < original:
            self._save()
            return True
        return False

    def export(self, dest: Path) -> None:
        dest.write_text(json.dumps([asdict(t) for t in self._tasks], indent=2))


# ── CLI Commands ──────────────────────────────────────────────────────────

def cmd_add(store: TaskStore, args: argparse.Namespace) -> int:
    task = store.add(args.title, args.priority)
    print(f"  Added task #{task.task_id}: {task.title!r} [{task.priority}]")
    return 0


def cmd_list(store: TaskStore, args: argparse.Namespace) -> int:
    filter_mode = getattr(args, "filter", "all")
    tasks = {
        "all":      store.all_tasks(),
        "pending":  store.pending(),
        "done":     store.completed(),
    }.get(filter_mode, store.all_tasks())

    if not tasks:
        print("  No tasks found.")
        return 0

    print(f"\n  {'='*50}")
    print(f"  TODO LIST  ({len(tasks)} task(s)  |  filter: {filter_mode})")
    print(f"  {'='*50}")

    by_priority = {"high": [], "medium": [], "low": []}
    for t in tasks:
        by_priority.setdefault(t.priority, []).append(t)

    for prio in ("high", "medium", "low"):
        group = by_priority[prio]
        if group:
            print(f"\n  -- {prio.upper()} --")
            for t in group:
                print(t)

    print()
    return 0


def cmd_done(store: TaskStore, args: argparse.Namespace) -> int:
    task = store.mark_done(args.id)
    if task:
        print(f"  Marked done: #{task.task_id} {task.title!r}")
    else:
        print(f"  Task #{args.id} not found or already done.")
        return 1
    return 0


def cmd_delete(store: TaskStore, args: argparse.Namespace) -> int:
    if store.delete(args.id):
        print(f"  Deleted task #{args.id}.")
    else:
        print(f"  Task #{args.id} not found.")
        return 1
    return 0


def cmd_stats(store: TaskStore, _: argparse.Namespace) -> int:
    all_t = store.all_tasks()
    done  = store.completed()
    pend  = store.pending()
    pct   = len(done) / len(all_t) * 100 if all_t else 0
    bar   = "#" * int(pct / 5) + "." * (20 - int(pct / 5))

    print(f"""
  {'='*45}
  TODO STATS
  {'='*45}
  Total tasks    : {len(all_t)}
  Completed      : {len(done)}
  Pending        : {len(pend)}
  Progress       : [{bar}] {pct:.0f}%
  {'='*45}""")
    if pend:
        high = [t for t in pend if t.priority == "high"]
        if high:
            print(f"  High-priority pending ({len(high)}):")
            for t in high:
                print(f"    #{t.task_id} {t.title}")
    return 0


def cmd_export(store: TaskStore, args: argparse.Namespace) -> int:
    dest = Path(args.file)
    store.export(dest)
    print(f"  Exported {len(store.all_tasks())} task(s) to {dest}")
    return 0


# ── Argument Parser ───────────────────────────────────────────────────────

def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(
        prog="todo",
        description="A professional CLI todo manager — Day 30 Final Project",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
examples:
  python solution.py add "Buy groceries" --priority high
  python solution.py list --filter pending
  python solution.py done 1
  python solution.py delete 2
  python solution.py stats
  python solution.py export backup.json
        """,
    )
    parser.add_argument(
        "--file", default="todos.json",
        help="Path to the JSON storage file (default: todos.json)"
    )
    sub = parser.add_subparsers(dest="command", metavar="COMMAND")
    sub.required = True

    # add
    p_add = sub.add_parser("add", help="Add a new task")
    p_add.add_argument("title", help="Task title")
    p_add.add_argument("--priority", choices=["low", "medium", "high"],
                       default="medium", help="Task priority (default: medium)")

    # list
    p_list = sub.add_parser("list", help="List tasks")
    p_list.add_argument("--filter", choices=["all", "pending", "done"],
                        default="all", help="Filter tasks (default: all)")

    # done
    p_done = sub.add_parser("done", help="Mark a task as done")
    p_done.add_argument("id", type=int, help="Task ID")

    # delete
    p_del = sub.add_parser("delete", help="Delete a task")
    p_del.add_argument("id", type=int, help="Task ID")

    # stats
    sub.add_parser("stats", help="Show completion statistics")

    # export
    p_exp = sub.add_parser("export", help="Export tasks to a JSON file")
    p_exp.add_argument("file", help="Destination JSON file path")

    return parser


# ── Main ──────────────────────────────────────────────────────────────────

COMMANDS = {
    "add":    cmd_add,
    "list":   cmd_list,
    "done":   cmd_done,
    "delete": cmd_delete,
    "stats":  cmd_stats,
    "export": cmd_export,
}


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    store = TaskStore(Path(args.file))
    handler = COMMANDS.get(args.command)
    if handler:
        sys.exit(handler(store, args))
    else:
        parser.print_help()
        sys.exit(1)


if __name__ == "__main__":
    main()
```

---

## Knowledge Check

Before moving on, make sure you can explain each concept without looking at the lesson.

---

<div align="center">

| [← Day 29: Previous Lesson](../day-29/README.md) | [🏠 Home](../../README.md) | → 🎉 You finished the course! |
|:---|:---:|---:|

</div>
