import React from 'react'
import { BaseFooter } from './BaseFooter'

export const Footer = ({ ...props }) => {
  return (
    <div tw="mt-20 bg-gray-900 pt-10 pb-20 lg:py-10" {...props}>
      <BaseFooter />
    </div>
  )
}
