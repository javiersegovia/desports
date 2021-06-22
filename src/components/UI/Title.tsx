import { HTMLAttributes, ReactNode } from 'react'

interface TitleProps extends HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  children?: ReactNode
}

export const Title = ({
  as: Element = 'h4',
  children,
  ...props
}: TitleProps) => (
  <Element
    tw="text-3xl lg:text-5xl font-bold font-mono uppercase text-white letter-spacing[3px]"
    {...props}
  >
    {children}
  </Element>
)
