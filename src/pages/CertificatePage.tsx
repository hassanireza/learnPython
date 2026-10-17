import { useRef, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useProgress } from '../context/ProgressContext'
import Certificate, { CERT_HEIGHT, CERT_WIDTH } from '../components/Certificate'
import { Icon } from '../components/icons/Icon'
import './CertificatePage.css'

export default function CertificatePage() {
  const { user } = useAuth()
  const { completedCount, percentComplete } = useProgress()
  const [name, setName] = useState(user?.name ?? '')
  const [issuedAt] = useState(() => new Date())
  const svgRef = useRef<SVGSVGElement | null>(null)

  function downloadPng() {
    const svg = svgRef.current
    if (!svg) return

    const serializer = new XMLSerializer()
    const svgString = serializer.serializeToString(svg)
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    const url = URL.createObjectURL(svgBlob)

    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = CERT_WIDTH * 2
      canvas.height = CERT_HEIGHT * 2
      const ctx = canvas.getContext('2d')
      if (!ctx) return
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      URL.revokeObjectURL(url)

      canvas.toBlob((blob) => {
        if (!blob) return
        const link = document.createElement('a')
        link.href = URL.createObjectURL(blob)
        const fileName = (name.trim() || 'certificate').replace(/\s+/g, '_').toLowerCase()
        link.download = `python-30-days-${fileName}.png`
        link.click()
      }, 'image/png')
    }
    img.src = url
  }

  return (
    <div className="certificate-page">
      <div className="certificate-page__intro">
        <h1>Your certificate</h1>
        <p>
          Enter the name you would like printed on your certificate and download it. No account and no
          quiz score is required, this is yours whenever you feel ready to claim it.
        </p>
        {completedCount > 0 && (
          <p className="certificate-page__progress">
            For reference, you have personally marked {completedCount} of 30 days complete ({percentComplete}%).
          </p>
        )}
      </div>

      <div className="certificate-page__grid">
        <div className="card certificate-page__form">
          <label>
            Name for certificate
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </label>
          <button className="btn btn--primary btn--block" onClick={downloadPng}>
            <Icon name="download" size={16} />
            Download PNG certificate
          </button>
          <button className="btn btn--ghost btn--block" onClick={() => window.print()}>
            <Icon name="printer" size={16} />
            Print certificate
          </button>
          <p className="certificate-page__hint">
            The certificate updates live as you type. Download it as a PNG image you can print, share or
            attach to a resume or portfolio.
          </p>
        </div>

        <div className="card certificate-page__preview certificate-print-area">
          <Certificate ref={svgRef} name={name} issuedAt={issuedAt} />
        </div>
      </div>
    </div>
  )
}
