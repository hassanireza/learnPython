import { forwardRef } from 'react'

interface CertificateProps {
  name: string
  date: string
}

const Certificate = forwardRef<SVGSVGElement, CertificateProps>(({ name, date }, ref) => {
  const displayName = name.trim() || 'Your Name Here'

  return (
    <svg
      ref={ref}
      viewBox="0 0 1000 700"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: 'auto', borderRadius: 12 }}
    >
      <defs>
        <linearGradient id="cert-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#161923" />
          <stop offset="1" stopColor="#0f1115" />
        </linearGradient>
        <linearGradient id="cert-accent" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#4b8bbe" />
          <stop offset="1" stopColor="#ffd43b" />
        </linearGradient>
      </defs>

      <rect x="0" y="0" width="1000" height="700" fill="url(#cert-bg)" />
      <rect x="24" y="24" width="952" height="652" fill="none" stroke="url(#cert-accent)" strokeWidth="3" rx="16" />
      <rect x="40" y="40" width="920" height="620" fill="none" stroke="#262c3b" strokeWidth="1" rx="10" />

      <text x="500" y="140" textAnchor="middle" fontSize="22" fill="#a7adbb" fontFamily="Georgia, serif" letterSpacing="6">
        CERTIFICATE OF COMPLETION
      </text>

      <text x="500" y="200" textAnchor="middle" fontSize="46" fill="#eef1f6" fontFamily="Georgia, serif" fontWeight="bold">
        Python in 30 Days
      </text>

      <text x="500" y="260" textAnchor="middle" fontSize="16" fill="#6b7280" fontFamily="Georgia, serif">
        This certifies that
      </text>

      <text x="500" y="330" textAnchor="middle" fontSize="42" fill="#ffd43b" fontFamily="Georgia, serif" fontWeight="bold">
        {displayName}
      </text>

      <line x1="300" y1="350" x2="700" y2="350" stroke="#262c3b" strokeWidth="1" />

      <text x="500" y="400" textAnchor="middle" fontSize="17" fill="#a7adbb" fontFamily="Georgia, serif">
        has completed the 30 day Python programming curriculum, covering
      </text>
      <text x="500" y="428" textAnchor="middle" fontSize="17" fill="#a7adbb" fontFamily="Georgia, serif">
        fundamentals, data structures, object oriented programming and real world projects.
      </text>

      <text x="500" y="500" textAnchor="middle" fontSize="15" fill="#6b7280" fontFamily="Georgia, serif">
        Issued on {date}
      </text>

      <g transform="translate(500,560)">
        <circle r="34" fill="#161923" stroke="#4b8bbe" strokeWidth="2" />
        <text x="0" y="7" textAnchor="middle" fontSize="26" fontFamily="sans-serif">
          🐍
        </text>
      </g>

      <text x="120" y="640" fontSize="12" fill="#6b7280" fontFamily="Georgia, serif">
        python-30-days-react
      </text>
      <text x="880" y="640" textAnchor="end" fontSize="12" fill="#6b7280" fontFamily="Georgia, serif">
        No account required
      </text>
    </svg>
  )
})

Certificate.displayName = 'Certificate'

export default Certificate
