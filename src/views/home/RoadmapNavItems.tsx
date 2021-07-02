import { memo, RefObject, useEffect } from 'react'
import { theme } from 'twin.macro'
import { StageItem } from './StageItem'
import { Container } from '@components/UI/Container'
import useTranslation from 'next-translate/useTranslation'
import { useAppSelector } from '@lib/redux/hooks'
import { gsap } from 'gsap'

import {
  clipPathV1,
  clipPathV3,
  clipPathV4,
} from '@components/UI/Frames/MiniFrames'
import { squareClipPath } from '@components/UI/Frames/SquareFrame'
import { RoadmapI18NResult } from './StageFullPage'

const navClipPaths = [clipPathV1, clipPathV3, clipPathV4]

export interface RoadmapNavItemsProps {
  navigate: (index: number) => void
  stageRefs: RefObject<HTMLDivElement>[]
  shouldMorph?: boolean
}

export const RoadmapNavItems = memo(
  ({ navigate, stageRefs, shouldMorph = false }: RoadmapNavItemsProps) => {
    const { t } = useTranslation('home')

    const animationSpeed = useAppSelector(
      (state) => state.screenAnimation.animationSpeed
    )
    const activeSection = useAppSelector(
      (state) => state.screenAnimation.activeSection
    )

    useEffect(() => {
      if (activeSection?.name === 'footer') return

      // Entering Roadmap
      if (shouldMorph) {
        stageRefs.forEach((navItem, index) => {
          gsap.to(navItem.current, {
            ease: 'power2.inOut',
            delay: animationSpeed * 0.85,
            duration: animationSpeed * 0.3,
            height: 80,
          })

          gsap.to(navItem.current, {
            ease: 'linear',
            clipPath: navClipPaths[index],
            delay: animationSpeed,
            duration: animationSpeed * 0.1,
          })
        })
      } else {
        stageRefs.forEach((navItem) => {
          gsap.to(navItem.current, {
            ease: 'power2.inOut',
            delay: animationSpeed * 0.85,
            duration: animationSpeed * 0.3,
            height: 'auto',
          })
          gsap.to(navItem.current, {
            ease: 'linear',
            clipPath: squareClipPath,
            delay: animationSpeed * 0.85,
            duration: animationSpeed * 0.1,
          })
        })
      }
    }, [shouldMorph, animationSpeed, stageRefs])

    const {
      stage1: i18nStage1,
      stage2: i18nStage2,
      stage3: i18nStage3,
    }: RoadmapI18NResult = t('roadmap', null, {
      returnObjects: true,
    })

    return (
      <Container tw="mx-auto mt-auto">
        <div tw="flex items-center flex-1 justify-center">
          <StageItem
            shouldMorph={shouldMorph || activeSection?.name === 'footer'}
            innerRef={stageRefs[0]}
            item={i18nStage1}
            imagePath="/images/stage1_iso.jpg"
            number={1}
            titleColor={theme`colors.blue.300`}
            bgColor={theme`colors.blue.300`}
            navigate={navigate}
            isActive={activeSection?.name === 'stage1'}
          />
          <StageItem
            shouldMorph={shouldMorph || activeSection?.name === 'footer'}
            innerRef={stageRefs[1]}
            item={i18nStage2}
            imagePath="/images/stage2_iso.jpg"
            number={2}
            titleColor={theme`colors.purple.400`}
            bgColor={theme`colors.purple.400`}
            navigate={navigate}
            isActive={activeSection?.name === 'stage2'}
          />
          <StageItem
            shouldMorph={shouldMorph || activeSection?.name === 'footer'}
            innerRef={stageRefs[2]}
            item={i18nStage3}
            imagePath="/images/stage3_iso.jpg"
            number={3}
            navigate={navigate}
            titleColor={theme`colors.red.600`}
            bgColor={theme`colors.red.600`}
            isActive={activeSection?.name === 'stage3'}
            isLocked
          />
        </div>
      </Container>
    )
  }
)
