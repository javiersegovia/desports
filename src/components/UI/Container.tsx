import React, { forwardRef } from 'react'
import tw, { styled } from 'twin.macro'
import { up } from 'styled-breakpoints'

interface ContainerProps {
  children: React.ReactNode
}

const StyledContainer = styled.section<ContainerProps>`
  max-width: 100%;

  ${tw`px-6 sm:px-4 mx-auto w-full`}

  ${up('sm')} {
    max-width: 90%;
  }

  ${up('lg')} {
    max-width: 1024px;
    ${tw`px-10`}
  }

  ${up('xl')} {
    max-width: 1200px;
  }

  ${up('3xl')} {
    max-width: 1400px;
  }
`

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ children, ...otherProps }, ref) => {
    return (
      <StyledContainer ref={ref} {...otherProps}>
        {children}
      </StyledContainer>
    )
  }
)
