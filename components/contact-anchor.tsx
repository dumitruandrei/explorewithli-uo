'use client'

import type { MouseEvent, ReactNode } from 'react'

type ContactAnchorProps = {
  children: ReactNode
  className?: string
  onClick?: () => void
}

export function ContactAnchor({ children, className, onClick }: ContactAnchorProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()
    onClick?.()

    const contact = document.getElementById('contact')
    if (!contact) return

    contact.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.replaceState(null, '', '#contact')
  }

  return (
    <a href="#contact" onClick={handleClick} className={className}>
      {children}
    </a>
  )
}
