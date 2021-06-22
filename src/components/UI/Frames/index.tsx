import { HTMLAttributes, ReactNode } from 'react'

export interface FrameProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  color?: 'cyan' | 'yellow'
}
