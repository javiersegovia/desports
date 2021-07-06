import Image from 'next/image'
import pancakeswapLogoImg from '@public/images/logo_pancakeswap.svg'
import useTranslation from 'next-translate/useTranslation'
import Trans from 'next-translate/Trans'
import { Title } from '@components/UI/Title'
import { Button } from '@components/UI/Button'
import tw, { styled } from 'twin.macro'
import { config } from '@lib/config/config'
import { AnchorHTMLAttributes, useEffect } from 'react'

import image1 from '@public/images/how_to_buy_pcs_1.png'
import image2 from '@public/images/how_to_buy_pcs_2.png'
import { useClipboard } from '@lib/hooks/useClipboard'
import { useToggle } from '@lib/hooks/useToggle'
import { ClipboardTooltip } from '../../components/Miscellaneous/ClipboardTooltip'
import { RiFileCopyLine } from 'react-icons/ri'

export const PancakeswapHeading = () => {
  const { t } = useTranslation('how-to-buy')

  return (
    <>
      <Title
        tw="text-left lg:text-4xl text-cyan-400 flex items-center space-x-4"
        as="h2"
      >
        <Image src={pancakeswapLogoImg} alt="Pancakeswap logo" />
        <span>Pancakeswap</span>
      </Title>

      <p tw="mt-4 max-w-4xl">{t`pancakeswap.description`}</p>

      <Button size="lg" tw="mt-6">{t`pancakeswap.buy_now`}</Button>
    </>
  )
}

const StyledStepTitle = styled.h4`
  ${tw`mt-10 font-bold text-xl font-mono uppercase sm:text-2xl letter-spacing[1px] text-left`}
`

const StyledStepContent = styled.div`
  ${tw`mt-4 whitespace-pre-wrap`}
`

const Anchor: React.FC<AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  children,
  ...props
}) => (
  <a target="_blank" rel="noopener noreferrer" tw="text-cyan-400" {...props}>
    {children}
  </a>
)

export const PancakeswapGuide = () => {
  const { t } = useTranslation('how-to-buy')

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

  const step2Bullets: string[] = t('pancakeswap.guide.step_2.bullets', null, {
    returnObjects: true,
  })

  return (
    <>
      <p tw="">{t`pancakeswap.guide.recommendation`}</p>
      <StyledStepTitle>{t`pancakeswap.guide.step_1.title`}</StyledStepTitle>
      <StyledStepContent>
        <Trans
          i18nKey="how-to-buy:pancakeswap.guide.step_1.description"
          components={[
            <Anchor key="trust" href={config.external.trust_wallet} />,
            <Anchor key="metamask" href={config.external.metamask} />,
          ]}
        />

        <div tw="mt-3" />

        {config.blockchain.contractAddress && (
          <div tw="relative block">
            <button
              type="button"
              tw="p-2 bg-gray-800 w-full md:w-auto flex flex-col md:flex-row md:items-center text-left md:text-center rounded-md relative text-xs sm:text-sm md:text-base"
              onClick={() => {
                if (clipboard) {
                  clipboard?.writeText(config.blockchain.contractAddress)
                  openClipboardTooltip()
                }
              }}
            >
              <span tw="block sm:inline-block font-bold">
                {t`pancakeswap.guide.step_1.contract_address`}:{' '}
              </span>
              <span tw="block sm:inline-block font-mono">
                {config.blockchain.contractAddress}
              </span>
              {clipboard && (
                <RiFileCopyLine tw="absolute top-2 right-2 md:top-auto md:right-auto md:relative ml-2 inline-block" />
              )}

              <ClipboardTooltip
                tw="top-full left-auto text-cyan-400 right-0 md:top-0 bottom-0 md:left-full md:right-auto cursor-default whitespace-nowrap translate-x-2 h-0"
                isOpen={isClipboardTooltipOpen}
              />
            </button>
          </div>
        )}
      </StyledStepContent>

      <StyledStepTitle>{t`pancakeswap.guide.step_2.title`}</StyledStepTitle>
      <ul tw="list-disc ml-5 mt-5 space-y-4">
        {step2Bullets.map((bullet) => (
          <li key={bullet}>{bullet}</li>
        ))}
      </ul>

      <StyledStepTitle>{t`pancakeswap.guide.step_3.title`}</StyledStepTitle>
      <StyledStepContent>
        {t`pancakeswap.guide.step_3.description`}
        <span key="warn" tw="block my-4 text-cyan-400">
          {t`pancakeswap.guide.step_3.warn`}
        </span>
      </StyledStepContent>

      <StyledStepTitle>{t`pancakeswap.guide.step_4.title`}</StyledStepTitle>
      <StyledStepContent>{t`pancakeswap.guide.step_4.description.a`}</StyledStepContent>

      <div tw="my-10 flex flex-col lg:flex-row items-center lg:space-x-10 justify-center">
        <Image src={image1} alt="Slippage" layout="intrinsic" />
        <Image src={image2} alt="Exchange" layout="intrinsic" />
      </div>

      <StyledStepContent>{t`pancakeswap.guide.step_4.description.b`}</StyledStepContent>
    </>
  )
}
