import { useClipboard } from '@lib/hooks/useClipboard'
import { useToggle } from '@lib/hooks/useToggle'
import React, { useEffect } from 'react'
import { RiFileCopyLine } from 'react-icons/ri'
import { ClipboardTooltip } from './ClipboardTooltip'
import useTranslation from 'next-translate/useTranslation'

interface ContractAddressProps {
  address: string
  title?: string
}

export const ContractAddress = ({
  address,
  title,
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
        tw="p-2 bg-gray-800 w-full md:w-auto flex flex-col md:flex-row md:items-center text-left md:text-center rounded-md relative text-xs sm:text-sm md:text-base"
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
        <span tw="lg:ml-2 block sm:inline-block font-mono">{address}</span>
        {clipboard && (
          <RiFileCopyLine tw="absolute top-2 right-2 md:top-auto md:right-auto md:relative ml-2 inline-block" />
        )}

        <ClipboardTooltip
          tw="top-full left-1/2 text-cyan-400 right-auto bottom-auto cursor-default whitespace-nowrap -translate-x-1/2"
          isOpen={isClipboardTooltipOpen}
          // isOpen={true}
        />
      </button>
    </div>
  )
}
