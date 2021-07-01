/** @jsxImportSource @emotion/react */
import React, { RefObject } from 'react'
import { ForwardedRef } from 'react'
import tw from 'twin.macro'

interface FullScreenProps {
  children?: React.ReactNode
  minScreen?: boolean
  sectionRef?: RefObject<HTMLDivElement> | ForwardedRef<HTMLDivElement>
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
