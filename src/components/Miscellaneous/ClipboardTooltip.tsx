import { Transition } from '@headlessui/react'
import React, { Fragment } from 'react'

interface ClipboardTooltipProps {
  isOpen: boolean
}

export const ClipboardTooltip = ({
  isOpen,
  ...props
}: ClipboardTooltipProps) => {
  return (
    <Transition
      as={Fragment}
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0"
    >
      <div
        aria-hidden="true"
        tw="absolute font-mono z-20 top-full mt-1 left-1/2 transform -translate-x-1/2 rounded bg-gray-900 font-medium py-1 px-2 text-sm whitespace-nowrap"
        {...props}
      >
        {/* todo: translate!! */}
        Copied to the clipboard!
      </div>
    </Transition>
  )
}
