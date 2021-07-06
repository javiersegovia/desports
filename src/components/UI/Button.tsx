/** @jsxImportSource @emotion/react */
import { ButtonHTMLAttributes, forwardRef } from 'react'
import tw, { theme } from 'twin.macro'
import { StyledButton, TButtonSize } from './Button.styles'
import Link from 'next/link'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
  targetBlank?: boolean
  size?: TButtonSize
  color?: string
  bgColor?: string
}

export const Button = ({ href, ...props }: ButtonProps) =>
  href ? (
    <Link href={href} passHref>
      <ButtonElement {...props} />
    </Link>
  ) : (
    <ButtonElement {...props} />
  )

export const ButtonElement = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      type = 'button',
      disabled = false,
      color = theme`colors.black`,
      bgColor = theme`colors.emerald.400`,
      size = 'md',
      children,
      href,
      targetBlank = false,
      ...otherProps
    },
    ref
  ) => {
    const tag = href ? 'a' : 'button'

    const targetProps =
      targetBlank && href
        ? {
            target: '_blank',
            rel: 'noopener noreferrer',
          }
        : {}

    return (
      <StyledButton
        ref={ref}
        href={href}
        type={type}
        disabled={disabled}
        css={[disabled && tw`opacity-60 cursor-not-allowed`]}
        as={tag}
        color={color as string}
        bgColor={bgColor as string}
        size={size}
        {...targetProps}
        {...otherProps}
      >
        {children}
        <span aria-hidden className="glitch">
          {children}
        </span>
      </StyledButton>
    )
  }
)
