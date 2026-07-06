import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockProps {
  className?: string
  children?: React.ReactNode
  inline?: boolean
}

export default function CodeBlock({ className, children, inline }: CodeBlockProps) {
  const match = /language-(\w+)/.exec(className || '')
  const code = String(children ?? '').replace(/\n$/, '')

  if (inline || !match) {
    return <code className="inline-code">{code}</code>
  }

  return (
    <SyntaxHighlighter
      language={match[1] || 'python'}
      style={vscDarkPlus}
      customStyle={{
        borderRadius: 10,
        fontSize: '0.85rem',
        padding: '1rem',
        margin: '1rem 0',
      }}
      wrapLongLines
    >
      {code}
    </SyntaxHighlighter>
  )
}
