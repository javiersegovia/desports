import React, { RefObject } from 'react'
import tw from 'twin.macro'

interface FullScreenProps {
  children?: React.ReactNode
  minScreen?: boolean
  sectionRef?: RefObject<HTMLElement>
  isHorizontal?: boolean
  id?: string
}

export const FullScreen = ({
  children,
  sectionRef,
  isHorizontal,
  ...otherProps
}: FullScreenProps) => {
  return (
    <section
      ref={sectionRef}
      tw="w-full min-h-screen relative flex flex-col z-10"
      css={[isHorizontal && tw`flex-row`]}
      {...otherProps}
    >
      {children}
    </section>
  )
}
