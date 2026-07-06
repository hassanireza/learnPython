export interface DayMeta {
  id: number
  slug: string
  emoji: string
  title: string
  topic: string
}

// Static metadata for the 30 day curriculum. Kept separate from the raw
// markdown/python content so the navigation, sidebar and home page can
// render instantly without needing to parse every lesson file.
export const CURRICULUM: DayMeta[] = [
  { id: 1, slug: 'day-01', emoji: '🐍', title: 'Setup & Hello World', topic: 'Fundamentals' },
  { id: 2, slug: 'day-02', emoji: '📦', title: 'Variables & Data Types', topic: 'Fundamentals' },
  { id: 3, slug: 'day-03', emoji: '✍️', title: 'Strings & String Methods', topic: 'Fundamentals' },
  { id: 4, slug: 'day-04', emoji: '🔢', title: 'Numbers & Math Operations', topic: 'Fundamentals' },
  { id: 5, slug: 'day-05', emoji: '⌨️', title: 'User Input', topic: 'Fundamentals' },
  { id: 6, slug: 'day-06', emoji: '📋', title: 'Lists', topic: 'Data Structures' },
  { id: 7, slug: 'day-07', emoji: '🎯', title: 'Tuples, Sets & Booleans', topic: 'Data Structures' },
  { id: 8, slug: 'day-08', emoji: '📖', title: 'Dictionaries', topic: 'Data Structures' },
  { id: 9, slug: 'day-09', emoji: '🔀', title: 'Conditionals', topic: 'Control Flow' },
  { id: 10, slug: 'day-10', emoji: '🔄', title: 'for Loops', topic: 'Control Flow' },
  { id: 11, slug: 'day-11', emoji: '🔁', title: 'while Loops', topic: 'Control Flow' },
  { id: 12, slug: 'day-12', emoji: '⚙️', title: 'Functions Basics', topic: 'Functions' },
  { id: 13, slug: 'day-13', emoji: '🎛️', title: 'Function Arguments & Type Hints', topic: 'Functions' },
  { id: 14, slug: 'day-14', emoji: '🔭', title: 'Scope & Closures', topic: 'Functions' },
  { id: 15, slug: 'day-15', emoji: '🛡️', title: 'Error Handling', topic: 'Robust Code' },
  { id: 16, slug: 'day-16', emoji: '📁', title: 'File I/O', topic: 'Robust Code' },
  { id: 17, slug: 'day-17', emoji: '⚡', title: 'List Comprehensions', topic: 'Pythonic Code' },
  { id: 18, slug: 'day-18', emoji: '🗃️', title: 'Lambda, Map, Filter & Sorted', topic: 'Pythonic Code' },
  { id: 19, slug: 'day-19', emoji: '📦', title: 'Modules & Packages', topic: 'Pythonic Code' },
  { id: 20, slug: 'day-20', emoji: '🏗️', title: 'OOP: Classes & Objects', topic: 'Object Oriented Programming' },
  { id: 21, slug: 'day-21', emoji: '🧬', title: 'OOP: Inheritance & Polymorphism', topic: 'Object Oriented Programming' },
  { id: 22, slug: 'day-22', emoji: '🧙', title: 'Dunder Methods', topic: 'Object Oriented Programming' },
  { id: 23, slug: 'day-23', emoji: '🎀', title: 'Decorators', topic: 'Advanced Python' },
  { id: 24, slug: 'day-24', emoji: '♾️', title: 'Generators & Iterators', topic: 'Advanced Python' },
  { id: 25, slug: 'day-25', emoji: '🔒', title: 'Context Managers', topic: 'Advanced Python' },
  { id: 26, slug: 'day-26', emoji: '🔍', title: 'Regular Expressions', topic: 'Real World Data' },
  { id: 27, slug: 'day-27', emoji: '📊', title: 'JSON & CSV Data', topic: 'Real World Data' },
  { id: 28, slug: 'day-28', emoji: '🌐', title: 'Working with APIs', topic: 'Real World Data' },
  { id: 29, slug: 'day-29', emoji: '🧪', title: 'Testing with pytest', topic: 'Professional Practices' },
  { id: 30, slug: 'day-30', emoji: '🏆', title: 'Final Project: CLI Todo App', topic: 'Professional Practices' },
]

export const TOTAL_DAYS = CURRICULUM.length

export function getDayMeta(id: number): DayMeta | undefined {
  return CURRICULUM.find((d) => d.id === id)
}

export function getAdjacentDays(id: number) {
  return {
    prev: CURRICULUM.find((d) => d.id === id - 1) ?? null,
    next: CURRICULUM.find((d) => d.id === id + 1) ?? null,
  }
}

export const TOPICS = Array.from(new Set(CURRICULUM.map((d) => d.topic)))
