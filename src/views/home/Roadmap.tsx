import { NavSpacer } from '@components/Nav/NavSpacer'
import { Container } from '@components/UI/Container'
import { Title } from '@components/UI/Title'
import useTranslation from 'next-translate/useTranslation'

export const Roadmap = () => {
  const { t } = useTranslation('home')

  return (
    <>
      <div tw="text-center mt-10">
        <Title>{t`roadmap.title`}</Title>
        <p tw="text-coolGray-300 mt-6 max-w-2xl mx-auto whitespace-pre-line">{t`roadmap.description`}</p>
      </div>
    </>
  )
}
