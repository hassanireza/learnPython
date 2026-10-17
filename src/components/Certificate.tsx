import { forwardRef } from 'react'
import { ROSETTE_PATHS, BORDER_WAVES, SEAL_SCALLOP } from './certificate/certificateArt'
import { CERTIFICATE_FONT_CSS } from './certificate/certificateFonts'

interface CertificateProps {
  name: string
  issuedAt: Date
}

export const CERT_WIDTH = 1414
export const CERT_HEIGHT = 1000

const NAVY = '#0B1F3F'
const NAVY_DEEP = '#081833'
const GOLD = '#B8913A'
const GOLD_LIGHT = '#E3C877'
const INK_SOFT = '#4A5873'
const SHIELD = 'M32 3.5 55 11.5v18.2C55 43.5 45.7 54.3 32 60.5 18.3 54.3 9 43.5 9 29.7V11.5z'
const CX = CERT_WIDTH / 2

function ordinal(n: number) {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

function certificateNumber(name: string, date: Date) {
  let h = 2166136261
  const seed = `${name.trim().toLowerCase()}|${date.toISOString().slice(0, 10)}`
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  const hex = (h >>> 0).toString(16).toUpperCase().padStart(8, '0')
  return `P30-${date.getFullYear()}-${hex.slice(0, 4)}-${hex.slice(4)}`
}

function Rosette({ x, y, scale, opacity = 1, stroke = NAVY, width = 0.5 }: { x: number; y: number; scale: number; opacity?: number; stroke?: string; width?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`} fill="none" stroke={stroke} strokeWidth={width / scale} opacity={opacity}>
      {ROSETTE_PATHS.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </g>
  )
}

const Certificate = forwardRef<SVGSVGElement, CertificateProps>(({ name, issuedAt }, ref) => {
  const displayName = name.trim() || 'Your Name Here'
  const nameSize = Math.max(40, Math.min(92, 880 / (displayName.length * 0.36)))
  const dateLine = `${ordinal(issuedAt.getDate())} day of ${issuedAt.toLocaleDateString('en-GB', { month: 'long' })}, ${issuedAt.getFullYear()}`
  const certNo = certificateNumber(displayName, issuedAt)
  const corners: [number, number][] = [
    [74, 74],
    [CERT_WIDTH - 74, 74],
    [74, CERT_HEIGHT - 74],
    [CERT_WIDTH - 74, CERT_HEIGHT - 74],
  ]

  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${CERT_WIDTH} ${CERT_HEIGHT}`}
      width={CERT_WIDTH}
      height={CERT_HEIGHT}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Certificate of Completion awarded to ${displayName}`}
      style={{ width: '100%', height: 'auto', display: 'block', fontVariantNumeric: 'lining-nums', fontFeatureSettings: "'lnum' 1" }}
    >
      <style>{CERTIFICATE_FONT_CSS}</style>
      <defs>
        <radialGradient id="c-paper" cx="50%" cy="45%" r="75%">
          <stop offset="0" stopColor="#FFFDF6" />
          <stop offset="1" stopColor="#F4EBD3" />
        </radialGradient>
        <linearGradient id="c-gold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={GOLD_LIGHT} />
          <stop offset=".5" stopColor={GOLD} />
          <stop offset="1" stopColor="#8E6D22" />
        </linearGradient>
        <radialGradient id="c-seal" cx="35%" cy="30%" r="80%">
          <stop offset="0" stopColor="#F4DE98" />
          <stop offset=".55" stopColor="#C9A24B" />
          <stop offset="1" stopColor="#8E6D22" />
        </radialGradient>
        <linearGradient id="c-navy" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#18386A" />
          <stop offset="1" stopColor={NAVY_DEEP} />
        </linearGradient>
        <filter id="c-grain" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" />
          <feColorMatrix values="0 0 0 0 0.45  0 0 0 0 0.36  0 0 0 0 0.15  0 0 0 0.07 0" />
        </filter>
        <path id="c-arc-top" d="M -49 0 A 49 49 0 0 1 49 0" />
        <clipPath id="c-micro"><rect x="132" y="76" width="1150" height="12" /></clipPath>
        <path id="c-arc-bot" d="M -57 0 A 57 57 0 0 0 57 0" />
      </defs>

      {/* Paper */}
      <rect width={CERT_WIDTH} height={CERT_HEIGHT} fill="url(#c-paper)" />
      <rect width={CERT_WIDTH} height={CERT_HEIGHT} filter="url(#c-grain)" />

      {/* Watermark rosette */}
      <Rosette x={CX} y={500} scale={7.4} opacity={0.07} width={0.8} />

      {/* Frames */}
      <rect x="22" y="22" width={CERT_WIDTH - 44} height={CERT_HEIGHT - 44} fill="none" stroke={NAVY} strokeWidth="6" />
      <rect x="34" y="34" width={CERT_WIDTH - 68} height={CERT_HEIGHT - 68} fill="none" stroke="url(#c-gold)" strokeWidth="2" />
      <rect x="88" y="88" width={CERT_WIDTH - 176} height={CERT_HEIGHT - 176} fill="none" stroke="url(#c-gold)" strokeWidth="2.2" />
      <rect x="95" y="95" width={CERT_WIDTH - 190} height={CERT_HEIGHT - 190} fill="none" stroke={NAVY} strokeWidth="1" />

      {/* Guilloche border band */}
      <g fill="none" strokeWidth="0.9" strokeLinejoin="round">
        {BORDER_WAVES.map((d, i) => (
          <path key={i} d={d} stroke={i % 3 === 1 ? GOLD : NAVY} opacity={i % 3 === 1 ? 0.85 : 0.7} />
        ))}
      </g>

      {/* Corner rosettes */}
      {corners.map(([x, y], i) => (
        <g key={i}>
          <rect x={x - 52} y={y - 52} width="104" height="104" fill="#FBF6E8" stroke="url(#c-gold)" strokeWidth="2" />
          <rect x={x - 46} y={y - 46} width="92" height="92" fill="none" stroke={NAVY} strokeWidth="0.8" />
          <Rosette x={x} y={y} scale={0.86} opacity={0.9} width={0.55} />
          <circle cx={x} cy={y} r="5" fill="url(#c-gold)" />
        </g>
      ))}

      {/* Microtext security line */}
      <text clipPath="url(#c-micro)" x={CX} y="84" textAnchor="middle" fontSize="5.2" letterSpacing="1.4" fill={NAVY} opacity="0.55" fontFamily="'Playfair Display', Georgia, serif">
        {'PYTHON IN 30 DAYS ACADEMY · CERTIFICATE OF COMPLETION · '.repeat(14)}
      </text>

      {/* Crest */}
      <g transform={`translate(${CX - 42} 112) scale(1.31)`}>
        <path d={SHIELD} fill="url(#c-navy)" stroke="url(#c-gold)" strokeWidth="2.2" strokeLinejoin="round" />
        <path d={SHIELD} transform="translate(32 32) scale(.84) translate(-32 -32)" fill="none" stroke={GOLD_LIGHT} strokeOpacity=".5" strokeWidth="1" />
        <path d="M25 44V20h9.5a7 7 0 0 1 0 14H25" fill="none" stroke={GOLD_LIGHT} strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="36" y="41.6" width="9" height="3.6" rx="1.2" fill="#FAF5E9" />
      </g>

      {/* Institution */}
      <text x={CX} y="238" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="600" fontSize="27" letterSpacing="9" fill={NAVY}>
        PYTHON IN 30 DAYS ACADEMY
      </text>
      <text x={CX} y="266" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontStyle="italic" fontSize="17" letterSpacing="2" fill={INK_SOFT}>
        Per codicem ad scientiam
      </text>
      <g transform={`translate(${CX} 292)`}>
        <line x1="-150" y1="0" x2="-14" y2="0" stroke="url(#c-gold)" strokeWidth="1.4" />
        <line x1="14" y1="0" x2="150" y2="0" stroke="url(#c-gold)" strokeWidth="1.4" />
        <path d="M0 -6 6 0 0 6-6 0z" fill="url(#c-gold)" />
      </g>

      {/* Title */}
      <text x={CX} y="372" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="700" fontSize="64" letterSpacing="4" fill={NAVY}>
        Certificate of Completion
      </text>
      <text x={CX} y="420" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontStyle="italic" fontSize="22" fill={INK_SOFT}>
        This is to certify that
      </text>

      {/* Recipient */}
      <text x={CX} y="508" textAnchor="middle" fontFamily="'Pinyon Script', 'Playfair Display', Georgia, serif" fontStyle="normal" fontSize={nameSize} fill={NAVY}>
        {displayName}
      </text>
      <line x1={CX - 400} y1="532" x2={CX + 400} y2="532" stroke="url(#c-gold)" strokeWidth="1.6" />
      <line x1={CX - 400} y1="538" x2={CX + 400} y2="538" stroke={NAVY} strokeWidth="0.6" />

      {/* Citation */}
      <g fontFamily="'Playfair Display', Georgia, serif" fontStyle="italic" fontSize="21" fill={INK_SOFT} textAnchor="middle">
        <text x={CX} y="584">has successfully completed the thirty-day programme of study in Python programming,</text>
        <text x={CX} y="614">comprising thirty lessons and thirty practical projects across fundamentals, data structures,</text>
        <text x={CX} y="644">control flow, functions, object-oriented programming and professional practice.</text>
      </g>
      <text x={CX} y="694" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="600" fontSize="20" letterSpacing="1.5" fill={NAVY}>
        Awarded this {dateLine}
      </text>

      {/* Signatures */}
      <g>
        <g transform="translate(250 790)" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
          <path d="M0 6C14-22 26-30 34-6S52 22 66-8C74-26 84-18 80-2S108 12 132-14c8-8 16-6 18 4l40-12" />
        </g>
        <line x1="210" y1="802" x2="470" y2="802" stroke={NAVY} strokeWidth="1" />
        <text x="340" y="826" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="600" fontSize="14" letterSpacing="3.5" fill={NAVY}>COURSE DIRECTOR</text>

        <g transform="translate(950 790)" fill="none" stroke={NAVY} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" opacity="0.85">
          <path d="M0-2C10-26 20-24 22-6S34 14 46-10c6-14 14-8 12 4s14 12 30-6c10-10 20-2 14 6s20 6 44-10" />
        </g>
        <line x1="944" y1="802" x2="1204" y2="802" stroke={NAVY} strokeWidth="1" />
        <text x="1074" y="826" textAnchor="middle" fontFamily="'Playfair Display', Georgia, serif" fontWeight="600" fontSize="14" letterSpacing="3.5" fill={NAVY}>HEAD OF CURRICULUM</text>
      </g>

      {/* Seal */}
      <g transform={`translate(${CX} 780)`}>
        <path d="M-34 40 -52 112 -22 98 -4 118 4 46z" fill="url(#c-navy)" stroke="url(#c-gold)" strokeWidth="1.5" />
        <path d="M34 40 52 112 22 98 4 118-4 46z" fill="url(#c-navy)" stroke="url(#c-gold)" strokeWidth="1.5" />
        <path d={SEAL_SCALLOP} fill="url(#c-seal)" stroke="#8E6D22" strokeWidth="1" />
        <circle r="63" fill="none" stroke="#F7E7B0" strokeOpacity=".8" strokeWidth="1.2" />
        <circle r="38" fill="none" stroke="#8E6D22" strokeOpacity=".75" strokeWidth="1" />
        <text fontFamily="'Playfair Display', Georgia, serif" fontWeight="700" fontSize="8.4" letterSpacing="2" fill="#5B4311" textAnchor="middle">
          <textPath href="#c-arc-top" startOffset="50%">PYTHON IN 30 DAYS</textPath>
        </text>
        <text fontFamily="'Playfair Display', Georgia, serif" fontWeight="700" fontSize="8.4" letterSpacing="2.6" fill="#5B4311" textAnchor="middle">
          <textPath href="#c-arc-bot" startOffset="50%" >COMPLETION</textPath>
        </text>
        <g transform="translate(-23 -24) scale(.72)">
          <path d={SHIELD} fill="url(#c-navy)" stroke="#5B4311" strokeWidth="1.6" strokeLinejoin="round" />
          <path d="M25 44V20h9.5a7 7 0 0 1 0 14H25" fill="none" stroke={GOLD_LIGHT} strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="36" y="41.6" width="9" height="3.6" rx="1.2" fill="#FAF5E9" />
        </g>
      </g>

      {/* Footer */}
      <g fontFamily="'Playfair Display', Georgia, serif" fontSize="13" letterSpacing="2" fill={NAVY} opacity="0.85">
        <text x="130" y="880">CERTIFICATE NO. {certNo}</text>
        <text x={CERT_WIDTH - 130} y="880" textAnchor="end">SELF-PACED OPEN CURRICULUM</text>
      </g>
    </svg>
  )
})

Certificate.displayName = 'Certificate'

export default Certificate
