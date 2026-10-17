import { useId } from 'react'

interface BrandMarkProps {
  size?: number
  className?: string
}

/** The Python in 30 Days shield monogram. */
export default function BrandMark({ size = 32, className }: BrandMarkProps) {
  const id = useId().replace(/:/g, '')
  const shield = 'M32 3.5 55 11.5v18.2C55 43.5 45.7 54.3 32 60.5 18.3 54.3 9 43.5 9 29.7V11.5z'
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      width={size}
      height={size}
      role="img"
      aria-label="Python in 30 Days"
    >
      <defs>
        <linearGradient id={`${id}-navy`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#18386A" />
          <stop offset="1" stopColor="#081833" />
        </linearGradient>
        <linearGradient id={`${id}-gold`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#EBD596" />
          <stop offset=".5" stopColor="#C9A24B" />
          <stop offset="1" stopColor="#A8832F" />
        </linearGradient>
      </defs>
      <path d={shield} fill={`url(#${id}-navy)`} stroke={`url(#${id}-gold)`} strokeWidth="2.2" strokeLinejoin="round" />
      <path
        d={shield}
        transform="translate(32 32) scale(.84) translate(-32 -32)"
        fill="none"
        stroke="#C9A24B"
        strokeOpacity=".45"
        strokeWidth="1"
      />
      <path
        d="M25 44V20h9.5a7 7 0 0 1 0 14H25"
        fill="none"
        stroke={`url(#${id}-gold)`}
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect x="36" y="41.6" width="9" height="3.6" rx="1.2" fill="#FAF5E9" />
    </svg>
  )
}
