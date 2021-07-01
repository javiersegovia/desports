import { NavSpacer } from '@components/Nav/NavSpacer'
import { Button } from '@components/UI/Button'
import { Container } from '@components/UI/Container'
import { Title } from '@components/UI/Title'
import useTranslation from 'next-translate/useTranslation'
import tw, { styled, theme } from 'twin.macro'
import logoImg from '@public/images/logo_white.png'
import Image from 'next/image'
import Link from 'next/link'
import { SocialIcons } from '@components/Nav/SocialBar'
import { down } from 'styled-breakpoints'
import { config } from '@lib/config/config'

const StyledBackgroundShape = styled.div`
  ${down('md')} {
    padding-top: 30%;
    padding-bottom: 75%;
    clip-path: polygon(0% 0%, 100% 25%, 100% 100%, 0% 75%);
  }
`

const StyledGeometricBackground = styled.div`
  clip-path: polygon(
    80% 0%,
    100% 0%,
    100% 100%,
    0% 100%,
    0% 70%,
    43% 45%,
    43% 20%
  );

  background: url('/images/background-final.jpg');

  ${tw`bg-right-bottom bg-no-repeat bg-cover absolute w-1/2 right-0 bottom-0 top-0`}
`

const DeSportsFooterLogo = ({ ...props }) => {
  return (
    <div tw="w-16 h-16 lg:w-10 lg:h-10 relative flex items-center" {...props}>
      <Image src={logoImg} alt="DeSports Logo" />
    </div>
  )
}

interface CountdownItem {
  color: string
  title: string
  date: Date // Todo: check the type of this date
}

const CountdownItem = ({
  /* date */
  color,
  title,
  ...props
}: CountdownItem) => {
  // todo: implement date library manipulation and countdown on this component
  return (
    <div
      tw="font-mono letter-spacing[3px] uppercase font-bold space-y-2"
      {...props}
    >
      <p style={{ color }}>{title}</p>
      <p>2d 17h 15m 06s</p>
    </div>
  )
}

const StyledMobileBackgroundTop = styled.div`
  background: url('/images/background-final.jpg');

  ${tw`opacity-30 lg:hidden absolute bg-left-top top-0 w-full h-1/2`}
`

const StyledMobileBackgroundBottom = styled.div`
  background: url('/images/background-final.jpg');

  ${tw`opacity-30 lg:hidden absolute bg-right-bottom bottom-0 w-full h-1/2`}
`

const presaleDate = new Date()
const launchDate = new Date()

export const HomeFooter = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <NavSpacer />
      <StyledMobileBackgroundTop />
      <StyledMobileBackgroundBottom />
      {/* <div
        style={{ background: "url('/images/background-final.jpg')" }}
        tw="lg:hidden absolute bg-left-top top-0 w-full h-1/2"
      />
      <div
        style={{ background: "url('/images/background-final.jpg')" }}
        tw="lg:hidden absolute bg-right-bottom bottom-0 w-full h-1/2"
      /> */}
      <StyledBackgroundShape tw="bg-gray-900">
        <Container tw="h-full flex flex-col justify-center relative">
          <Title tw="mt-40 sm:mt-28 lg:mt-20 text-left">{t`footer.title`}</Title>
          <div tw="flex flex-col items-start lg:flex-row space-y-8 lg:space-y-0 lg:space-x-20 mt-12">
            <CountdownItem
              color={theme`colors.emerald.400`}
              title={t`footer.pre-sale`}
              date={presaleDate}
              tw="text-xl lg:text-xl xl:text-3xl text-left"
            />
            <CountdownItem
              color={theme`colors.yellow.400`}
              title={t`footer.launch`}
              date={launchDate}
              tw="text-xl lg:text-xl xl:text-3xl text-left"
            />
          </div>
          <div tw="flex flex-row items-center justify-start space-y-0 space-x-6 sm:space-x-10 mt-12">
            <Button
              tw="w-full sm:w-auto sm:flex-1 lg:flex-none"
              size="lg"
              bgColor={theme`colors.cyan.400`}
            >
              {t`shared.telegram`}
            </Button>
            <Button
              tw="w-full sm:w-auto sm:flex-1 lg:flex-none"
              size="lg"
            >{t`shared.buy-now`}</Button>
          </div>
          <p tw="text-right md:text-left mt-8 lg:mt-12">
            {t`footer.contact-us`}{' '}
            <a href={`mailto:${config.email.info}`}>
              <span tw="text-cyan-400">info@desports.network</span>
            </a>
          </p>
        </Container>
      </StyledBackgroundShape>

      <Container tw="mt-auto text-sm lg:text-base relative">
        <footer tw="space-y-7 mb-20 text-coolGray-300 relative lg:w-1/2">
          <DeSportsFooterLogo tw="lg:hidden absolute top-[-80px]" />

          <div tw="flex justify-between sm:justify-around lg:justify-start lg:space-x-10 items-center">
            <DeSportsFooterLogo tw="hidden invisible lg:block lg:visible" />
            <ul>
              <li>
                <Link href="/whitepaper">{t`shared.whitepaper`}</Link>
              </li>
              <li>
                <Link href="/contract">{t`shared.contract`}</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link href="/team">{t`shared.team`}</Link>
              </li>
              <li>
                <Link href="/how-to-buy">{t`shared.how-to-buy`}</Link>
              </li>
            </ul>
            <ul>
              <li>
                <Link href="/blog">{t`shared.blog`}</Link>
              </li>
              <li>
                <Link href="/brand-guidelines">{t`footer.brand-guidelines`}</Link>
              </li>
            </ul>
          </div>
          <div tw="pt-6 lg:pt-0 text-center lg:text-left">
            <p>
              <span tw="font-bold">DeSports Network</span>{' '}
              {t`footer.dao-description`}
            </p>
            <p>
              <span tw="font-bold">$DESP</span> {t`footer.desp-description`}
            </p>
          </div>
          <div tw="text-center lg:text-left">
            <p>{t`footer.copyright`}</p>
            <p>{t`footer.trademarks`}</p>
          </div>
        </footer>

        <div tw="hidden lg:flex absolute bottom-20 right-0 text-coolGray-300 z-10 space-x-6 lg:text-3xl">
          <SocialIcons />
        </div>
      </Container>

      <StyledGeometricBackground tw="hidden lg:block" />
    </>
  )
}
