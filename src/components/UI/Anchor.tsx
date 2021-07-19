import { AnchorHTMLAttributes } from 'react'

export const Anchor: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  ...props
}) => (
  <a target="_blank" rel="noopener noreferrer" tw="text-cyan-400" {...props}>
    {children}
  </a>
)
