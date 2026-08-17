'use client'

import type { MouseEvent, ReactNode } from 'react'

type ContactAnchorProps = {
  children: ReactNode
  className?: string
}

export function ContactAnchor({ children, className }: ContactAnchorProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    event.preventDefault()

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
