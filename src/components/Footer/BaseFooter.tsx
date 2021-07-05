import Link from 'next/link'
import { SocialIcons } from '@components/Nav/SocialBar'
import { routes } from '@lib/config/routes'
import useTranslation from 'next-translate/useTranslation'
import logoImg from '@public/images/logo_white.png'
import Image from 'next/image'
import { Container } from '@components/UI/Container'
import tw, { styled } from 'twin.macro'
import { config } from '@lib/config/config'
import { ReactElement } from 'react'

const StyledContainer = styled(Container)`
  li {
    ${tw`hover:text-yellow-400`}
  }
`

export const DeSportsFooterLogo = ({ ...props }) => {
  return (
    <div tw="w-16 h-16 lg:w-10 lg:h-10 relative flex items-center" {...props}>
      <Image src={logoImg} alt="DeSports Logo" />
    </div>
  )
}

interface FooterProps {
  logoComponent?: ReactElement
}

export const BaseFooter = ({ logoComponent, ...props }: FooterProps) => {
  const { t } = useTranslation('common')

  return (
    <StyledContainer
      tw="mt-auto text-sm lg:text-base relative flex justify-between items-center lg:items-end"
      {...props}
    >
      <footer tw="space-y-7 text-coolGray-300 relative w-full lg:w-1/2">
        {/* <DeSportsFooterLogo tw="lg:hidden absolute top-[-100px]" /> */}
        <nav tw="flex items-center">
          {logoComponent || (
            <Link href={routes.home}>
              <a tw="mr-10 my-auto cursor-pointer">
                <DeSportsFooterLogo tw="lg:flex items-center" />
              </a>
            </Link>
          )}

          <ul tw="flex justify-start space-x-10 items-end">
            {/* {onClickLogo ? (
              <button
                type="button"
                onClick={onClickLogo}
                tw="my-auto cursor-pointer"
              >
                <DeSportsFooterLogo tw="hidden invisible lg:flex items-center lg:visible" />
              </button>
            ) : (
              <Link href={routes.home}>
                <a tw="my-auto cursor-pointer">
                  <DeSportsFooterLogo tw="hidden invisible lg:flex items-center lg:visible" />
                </a>
              </Link>
            )} */}

            <div className="space-y-3 lg:space-y-0">
              <li>
                <Link href={routes.whitepaper}>{t`shared.whitepaper`}</Link>
              </li>
              <li>
                <Link href={config.blockchain.contractUrl}>
                  {t`shared.contract`}
                </Link>
              </li>
            </div>

            <div className="space-y-3 lg:space-y-0">
              <li>
                <Link href={routes.team}>{t`shared.team`}</Link>
              </li>
              <li>
                <Link href={routes.how_to_buy}>{t`shared.how-to-buy`}</Link>
              </li>
            </div>

            <div className="space-y-3 lg:space-y-0">
              {/* <li>
                <Link href={routes.blog}>{t`shared.blog`}</Link>
              </li> */}
              <li>
                <Link href={config.brand_guidelines_pdf}>
                  {t`footer.brand-guidelines`}
                </Link>
              </li>
            </div>
          </ul>
        </nav>

        <div tw="pt-3 lg:pt-0 text-left">
          <p>
            <span tw="font-bold">DeSports Network</span>{' '}
            {t`footer.dao-description`}
          </p>
          <p>
            <span tw="font-bold">$DESP</span> {t`footer.desp-description`}
          </p>
        </div>
        <div tw="text-left">
          <p>{t`footer.copyright`}</p>
          <p>{t`footer.trademarks`}</p>
        </div>
      </footer>

      <div tw="hidden lg:flex w-1/2 justify-end text-coolGray-300 z-10 space-x-6 lg:text-4xl">
        <SocialIcons tw="hover:text-cyan-400" />
      </div>
    </StyledContainer>
  )
}
