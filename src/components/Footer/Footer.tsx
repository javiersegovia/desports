import React from 'react'
import { BaseFooter } from './BaseFooter'

export const Footer = ({ ...props }) => {
  return (
    <div tw="mt-20 bg-gray-900 py-10" {...props}>
      <BaseFooter />
    </div>
  )
}
