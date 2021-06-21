import React from 'react'
import tw, { styled } from 'twin.macro'
import { up } from 'styled-breakpoints'

interface ContainerProps {
  children: React.ReactNode
}

const StyledContainer = styled.section<ContainerProps>`
  max-width: 100%;

  ${up('sm')} {
    max-width: 90%;
  }
  ${up('lg')} {
    max-width: 1024px;
  }

  ${up('xl')} {
    max-width: 1200px;
  }

  ${tw`px-7 sm:px-4 mx-auto`}
`

export const Container = ({ children, ...otherProps }: ContainerProps) => {
  return <StyledContainer {...otherProps}>{children}</StyledContainer>
}
