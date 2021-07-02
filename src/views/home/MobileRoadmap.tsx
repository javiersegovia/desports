import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { Title } from '@components/UI/Title'
import { Container } from '@components/UI/Container'

export const MobileRoadmap = ({ ...props }) => {
  const { t } = useTranslation('home')

  return (
    <>
      <Container tw="text-center lg:hidden" {...props}>
        <Title>{t`roadmap.title`}</Title>
        <p tw="text-coolGray-300 mt-6 max-w-3xl mx-auto whitespace-pre-line">{t`roadmap.description`}</p>
      </Container>
    </>
  )
}
