import { ButtonHTMLAttributes, forwardRef } from 'react'
import tw from 'twin.macro'
import { StyledButton } from './Button.styles'
import Link from 'next/link'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  href?: string
}

export const Button = ({ href, ...props }: ButtonProps) =>
  href ? (
    <Link href={href} passHref>
      <ButtonElement {...props} />
    </Link>
  ) : (
    <ButtonElement {...props} />
  )

// todo: add color variations to button

export const ButtonElement = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { type = 'button', disabled = false, children, href, ...otherProps },
    ref
  ) => {
    const tag = href ? 'a' : 'button'

    return (
      <StyledButton
        ref={ref}
        href={href}
        type={type}
        disabled={disabled}
        css={[disabled && tw`opacity-40 cursor-not-allowed`]}
        as={tag}
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
