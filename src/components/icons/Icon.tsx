import { DAY_ICONS, UI_ICONS, type UiIconName } from './iconData'

interface BaseProps {
  size?: number
  className?: string
  title?: string
}

function Glyph({ p, a, size = 20, className, title }: BaseProps & { p: string; a: string }) {
  return (
    <svg
      className={`icon ${className ?? ''}`.trim()}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      role={title ? 'img' : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <g stroke="currentColor" dangerouslySetInnerHTML={{ __html: p }} />
      {a && <g stroke="var(--icon-accent, var(--gold-400))" dangerouslySetInnerHTML={{ __html: a }} />}
    </svg>
  )
}

/** Brand UI icon (stroke + gold accent). */
export function Icon({ name, ...rest }: BaseProps & { name: UiIconName }) {
  const def = UI_ICONS[name]
  return <Glyph p={def.p} a={def.a} {...rest} />
}

/** Lesson icon for one of the 30 days. */
export function DayIcon({ day, ...rest }: BaseProps & { day: number }) {
  const def = DAY_ICONS[day] ?? DAY_ICONS[1]
  return <Glyph p={def.p} a={def.a} {...rest} />
}

/** Navy tile with gold hairline that holds a lesson icon. */
export function DayTile({ day, size = 40, className }: { day: number; size?: number; className?: string }) {
  return (
    <span className={`day-tile ${className ?? ''}`.trim()} style={{ width: size, height: size }}>
      <DayIcon day={day} size={Math.round(size * 0.58)} />
    </span>
  )
}
