import { useClipboard } from '@lib/hooks/useClipboard'
import { useToggle } from '@lib/hooks/useToggle'
import React, { useEffect } from 'react'
import { RiFileCopyLine } from 'react-icons/ri'
import { ClipboardTooltip } from './ClipboardTooltip'
import useTranslation from 'next-translate/useTranslation'
import { theme } from 'twin.macro'

interface ContractAddressProps {
  address: string
  title?: string
  bgColor?: string
}

export const ContractAddress = ({
  address,
  title,
  bgColor,
  ...props
}: ContractAddressProps) => {
  const { t } = useTranslation('common')

  const [
    isClipboardTooltipOpen,
    { setTrue: openClipboardTooltip, setFalse: closeClipboardTooltip },
  ] = useToggle()
  const clipboard = useClipboard()

  useEffect(() => {
    let hideTimeout: NodeJS.Timeout
    if (isClipboardTooltipOpen) {
      hideTimeout = setTimeout(() => closeClipboardTooltip(), 1500)
    }
    return () => {
      clearTimeout(hideTimeout)
    }
  }, [closeClipboardTooltip, isClipboardTooltipOpen])

  return (
    <div tw="relative block" {...props}>
      <button
        type="button"
        tw="p-2 w-full md:w-auto flex flex-col md:flex-row md:items-center text-left md:text-center rounded-md relative text-xs sm:text-sm md:text-base"
        style={{ background: bgColor || theme`colors.gray.800` }}
        onClick={() => {
          if (clipboard) {
            clipboard?.writeText(address)
            openClipboardTooltip()
          }
        }}
      >
        <span tw="block sm:inline-block font-bold">
          {title || t`shared.contract_address`}:
        </span>

        <span tw="lg:ml-2 block sm:inline-block font-mono max-w-full overflow-x-auto">
          {address}
        </span>

        {clipboard && (
          <RiFileCopyLine tw="absolute top-2 right-2 md:top-auto md:right-auto md:relative ml-2 inline-block" />
        )}

        <ClipboardTooltip
          tw="top-full left-1/2 text-cyan-400 right-auto bottom-auto cursor-default whitespace-nowrap -translate-x-1/2"
          isOpen={isClipboardTooltipOpen}
        />
      </button>
    </div>
  )
}
