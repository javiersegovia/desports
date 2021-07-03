import { memo, RefObject, useEffect } from 'react'
import { theme } from 'twin.macro'
import { gsap } from 'gsap'
import useTranslation from 'next-translate/useTranslation'
import { Container } from '@components/UI/Container'
import { StageItem } from './StageItem'
import { useAppSelector } from '@lib/redux/hooks'
import { squareClipPath } from '@components/UI/Frames/SquareFrame'
import { IStage } from './StageFullPage'
import {
  clipPathV1,
  clipPathV3,
  clipPathV4,
} from '@components/UI/Frames/MiniFrames'
import {
  selectAnimationSpeed,
  selectFooterSection,
  selectNavPosition,
  selectStage1Section,
  selectStage2Section,
  selectStage3Section,
} from '@lib/redux/slices/navSlice'

const navClipPaths = [clipPathV1, clipPathV3, clipPathV4]

export interface RoadmapNavItemsProps {
  navigate: (index: number) => void
  stageRefs: RefObject<HTMLDivElement>[]
}

export const RoadmapNavItems = memo(
  ({ navigate, stageRefs }: RoadmapNavItemsProps) => {
    const { t } = useTranslation('roadmap')

    const animationSpeed = useAppSelector(selectAnimationSpeed)
    const stage1Section = useAppSelector(selectStage1Section)
    const stage2Section = useAppSelector(selectStage2Section)
    const stage3Section = useAppSelector(selectStage3Section)
    const footerSection = useAppSelector(selectFooterSection)
    const navPosition = useAppSelector(selectNavPosition)

    useEffect(() => {
      const shouldMorph = navPosition === 'roadmap' || navPosition === 'footer'

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
    }, [navPosition, animationSpeed, stageRefs, footerSection.isActive])

    const i18nStage1: IStage = t('stage1', null, { returnObjects: true })
    const i18nStage2: IStage = t('stage2', null, { returnObjects: true })
    const i18nStage3: IStage = t('stage3', null, { returnObjects: true })

    return (
      <Container tw="mx-auto mt-auto">
        <div tw="flex items-center flex-1 justify-center">
          <StageItem
            innerRef={stageRefs[0]}
            item={i18nStage1}
            imagePath="/images/stage1_iso.jpg"
            number={1}
            titleColor={theme`colors.blue.300`}
            bgColor={theme`colors.blue.300`}
            navigate={navigate}
            isActive={stage1Section.isActive}
          />
          <StageItem
            innerRef={stageRefs[1]}
            item={i18nStage2}
            imagePath="/images/stage2_iso.jpg"
            number={2}
            titleColor={theme`colors.purple.400`}
            bgColor={theme`colors.purple.400`}
            navigate={navigate}
            isActive={stage2Section.isActive}
          />
          <StageItem
            innerRef={stageRefs[2]}
            item={i18nStage3}
            imagePath="/images/stage3_iso.jpg"
            number={3}
            navigate={navigate}
            titleColor={theme`colors.red.600`}
            bgColor={theme`colors.red.600`}
            isActive={stage3Section.isActive}
            isLocked
          />
        </div>
      </Container>
    )
  }
)
