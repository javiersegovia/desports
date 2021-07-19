import { HTMLAttributes, ReactNode } from 'react'

export type FrameShadowColor = 'cyan' | 'yellow' | 'emerald'
export interface FrameProps extends HTMLAttributes<HTMLDivElement> {
  children?: ReactNode
  color?: FrameShadowColor
  shadowColor?: FrameShadowColor
  removePadding?: boolean
  shouldMorph?: boolean
  bgColor?: string
  isSquare?: boolean
}
