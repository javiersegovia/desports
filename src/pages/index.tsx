import { FullScreen } from '@components/UI/FullScreen'
import { Title } from '@components/UI/Title'
import { styled } from 'twin.macro'
import useTranslation from 'next-translate/useTranslation'

const StyledBackground = styled.div`
  background: url('/images/background-final.jpg');
`

export default function Home() {
  const { t } = useTranslation('home')
  return (
    <>
      <FullScreen>
        <StyledBackground tw="absolute z-index[-1] bg-center bg-cover bg-no-repeat opacity[.35] w-full h-full" />
        <Title tw="m-auto" as="h1">{t`coming-soon`}</Title>
      </FullScreen>
    </>
  )
}
