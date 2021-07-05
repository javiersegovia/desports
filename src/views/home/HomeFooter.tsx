import { NavSpacer } from '@components/Nav/NavSpacer'
import { Button } from '@components/UI/Button'
import { Container } from '@components/UI/Container'
import { Title } from '@components/UI/Title'
import useTranslation from 'next-translate/useTranslation'
import tw, { styled, theme } from 'twin.macro'

import { down } from 'styled-breakpoints'
import { config } from '@lib/config/config'
import { BaseFooter, DeSportsFooterLogo } from '@components/Footer/BaseFooter'
import { useTimeLeft } from '@lib/hooks/useTimeLeft'

const StyledBackgroundShape = styled.div`
  ${down('md')} {
    padding-bottom: 75%;
    clip-path: polygon(0% 0%, 100% 0%, 100% 100%, 0% 75%);
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

  background: url('/images/home_bg.jpg');

  ${tw`bg-right-bottom bg-no-repeat bg-cover absolute w-1/2 right-0 bottom-0 top-0 opacity-40`}
`

interface CountdownItem {
  color: string
  title: string
  date: Date // Todo: check the type of this date
}

const CountdownItem = ({ date, color, title, ...props }: CountdownItem) => {
  const { TimeComponent } = useTimeLeft(date)

  return (
    <div
      tw="font-mono letter-spacing[3px] uppercase font-bold space-y-2"
      {...props}
    >
      <p style={{ color }}>{title}</p>
      <TimeComponent />
    </div>
  )
}

const StyledMobileBackgroundBottom = styled.div`
  background: url('/images/home_bg.jpg');

  ${tw`opacity-20 lg:hidden absolute bg-right-bottom bottom-0 w-full h-1/2 bg-cover`}
`

interface HomeFooterProps {
  goToStart: () => void
}

export const HomeFooter = ({ goToStart }: HomeFooterProps) => {
  const { t } = useTranslation('common')

  return (
    <>
      <NavSpacer />
      {/* <StyledMobileBackgroundTop /> */}
      <StyledMobileBackgroundBottom />

      <StyledBackgroundShape tw="bg-gray-900">
        <Container tw="h-full flex flex-col justify-center relative">
          <Title tw="mt-32 lg:mt-20 text-left">{t`footer.title`}</Title>
          <div tw="flex flex-col items-start lg:flex-row space-y-8 lg:space-y-0 lg:space-x-20 mt-12">
            <CountdownItem
              color={theme`colors.emerald.400`}
              title={t`footer.pre-sale`}
              date={config.presale_date}
              tw="text-xl lg:min-w-[200px] xl:min-w-[330px] lg:text-xl xl:text-4xl text-left"
            />
            <CountdownItem
              color={theme`colors.yellow.400`}
              title={t`footer.launch`}
              date={config.launch_date}
              tw="text-xl lg:min-w-[200px] xl:min-w-[330px] lg:text-xl xl:text-4xl text-left"
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
            <Button tw="w-full sm:w-auto sm:flex-1 lg:flex-none" size="lg">
              {t`shared.buy-now`}
            </Button>
          </div>

          <p tw="text-right md:text-left mt-8 lg:mt-12">
            {t`footer.contact-us`}{' '}
            <a href={`mailto:${config.email.info}`}>
              <span tw="text-cyan-400">info@desports.network</span>
            </a>{' '}
            {/* todo: translate */}
            or{' '}
            <button type="button" onClick={goToStart} tw="underline">
              go back
            </button>
          </p>
        </Container>
      </StyledBackgroundShape>

      <div>
        <Container tw="relative">
          <button type="button" onClick={goToStart} tw="cursor-pointer">
            <DeSportsFooterLogo tw="lg:hidden absolute top-[-100px]" />
          </button>
        </Container>
      </div>

      <BaseFooter
        tw="pb-20"
        logoComponent={
          <button
            type="button"
            onClick={goToStart}
            tw="hidden lg:block mr-10 my-auto cursor-pointer"
          >
            <DeSportsFooterLogo tw="flex items-center lg:visible" />
          </button>
        }
      />

      <StyledGeometricBackground tw="hidden lg:block" />
    </>
  )
}
