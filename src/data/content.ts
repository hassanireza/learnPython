// Loads the raw lesson markdown and solution source code for every day
// using Vite's built-in `?raw` import glob. This keeps each day's content
// as a plain text asset bundled at build time, no runtime fetch required
// which makes the app fully static and GitHub Pages friendly.

const lessonModules = import.meta.glob('../content/day-*/lesson.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const solutionModules = import.meta.glob('../content/day-*/solution.py', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function extract(modules: Record<string, string>, slug: string): string {
  const entry = Object.entries(modules).find(([path]) => path.includes(`/${slug}/`))
  return entry ? entry[1] : ''
}

export function getLessonMarkdown(slug: string): string {
  return extract(lessonModules, slug)
}

export function getSolutionCode(slug: string): string {
  return extract(solutionModules, slug)
}
