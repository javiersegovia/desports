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

  ${tw`bg-black absolute w-1/2 right-0 bottom-0 top-0`}
`

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

const presaleDate = new Date()
const launchDate = new Date()

export const HomeFooter = () => {
  const { t } = useTranslation('common')
  return (
    <>
      <NavSpacer />
      <Container tw="h-full flex flex-col justify-center relative">
        <Title tw="mt-20">{t`footer.title`}</Title>
        <div tw="flex space-x-20 mt-12">
          <CountdownItem
            color={theme`colors.emerald.400`}
            title={t`footer.pre-sale`}
            date={presaleDate}
            tw="text-3xl"
          />
          <CountdownItem
            color={theme`colors.yellow.400`}
            title={t`footer.launch`}
            date={launchDate}
            tw="text-3xl"
          />
        </div>
        <div tw="flex items-center space-x-10 mt-12">
          <Button
            size="lg"
            bgColor={theme`colors.cyan.400`}
          >{t`shared.telegram`}</Button>

          <Button size="lg">{t`shared.buy-now`}</Button>
        </div>
        <p tw="mt-12">
          {t`footer.contact-us`}{' '}
          <span tw="text-cyan-400">info@desports.network</span>
        </p>

        <footer tw="mt-auto space-y-7 mb-20 text-coolGray-300">
          <div tw="flex space-x-10 items-center">
            <div tw="w-10 h-10 relative flex items-center">
              <Image src={logoImg} alt="DeSports Logo" />
            </div>
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

          <div>
            <p>
              <span tw="font-bold">DeSports Network</span>{' '}
              {t`footer.dao-description`}
            </p>
            <p>
              <span tw="font-bold">$DESP</span> {t`footer.desp-description`}
            </p>
          </div>

          <div>
            <p>{t`footer.copyright`}</p>
            <p>{t`footer.trademarks`}</p>
          </div>
        </footer>

        <div tw="absolute bottom-20 right-0 text-coolGray-300 z-10 space-x-6 lg:text-3xl flex">
          <SocialIcons />
        </div>
      </Container>
      <StyledGeometricBackground />
    </>
  )
}
