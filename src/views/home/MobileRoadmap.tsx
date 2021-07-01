import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { theme } from 'twin.macro'
import { RoadmapI18NResult } from './StageFullPage'
import { MobileStageItem } from './StageItem'
import stage1Img from '@public/images/stage1_iso.jpg'
import stage2Img from '@public/images/stage2_iso.jpg'
import stage3Img from '@public/images/stage3_iso.jpg'
import { Title } from '@components/UI/Title'
import { Container } from '@components/UI/Container'

export const MobileRoadmap = ({ ...props }) => {
  const { t } = useTranslation('home')

  const {
    stage1: i18nStage1,
    stage2: i18nStage2,
    stage3: i18nStage3,
  }: RoadmapI18NResult = t('roadmap', null, {
    returnObjects: true,
  })

  return (
    <>
      <Container tw="text-center lg:hidden" {...props}>
        <Title>{t`roadmap.title`}</Title>
        <p tw="text-coolGray-300 mt-6 max-w-2xl mx-auto whitespace-pre-line">{t`roadmap.description`}</p>
      </Container>
      <div tw="lg:hidden mt-20 mx-auto flex flex-col space-y-6">
        <MobileStageItem
          item={i18nStage1}
          imagePath={stage1Img}
          titleColor={theme`colors.blue.300`}
        />
        <MobileStageItem
          item={i18nStage2}
          imagePath={stage2Img}
          titleColor={theme`colors.purple.400`}
        />
        <MobileStageItem
          item={i18nStage3}
          imagePath={stage3Img}
          titleColor={theme`colors.red.600`}
          isLocked
        />
      </div>
    </>
  )
}
