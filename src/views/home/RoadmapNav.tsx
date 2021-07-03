import { RefObject, useEffect, useRef } from 'react'
import { NavSpacer } from '@components/Nav/NavSpacer'
import { Container } from '@components/UI/Container'
import { FullScreen } from '@components/UI/FullScreen'
import { Title } from '@components/UI/Title'
import useTranslation from 'next-translate/useTranslation'
import { RoadmapNavItems, RoadmapNavItemsProps } from './RoadmapNavItems'
import { useAppDispatch, useAppSelector } from '@lib/redux/hooks'
import {
  selectAnimationContext,
  selectAnimationSpeed,
  selectBridgeSection,
  selectFooterSection,
  selectNavPosition,
  selectShowRoadmapNav,
  toggleShowRoadmapNav,
  toggleTransformedRoadmapNav,
  toggleTransformedRoadmapNavIsHided,
} from '@lib/redux/slices/navSlice'
import { gsap } from 'gsap'

interface RoadmapProps {
  roadmapWrapperRef: RefObject<HTMLDivElement>
  roadmapContentRef: RefObject<HTMLDivElement>
  stageRefs: RoadmapNavItemsProps['stageRefs']
  navigate: RoadmapNavItemsProps['navigate']
}

export const RoadmapNav = ({
  roadmapContentRef,
  roadmapWrapperRef,
  navigate,
  stageRefs,
}: RoadmapProps) => {
  const { t } = useTranslation('home')
  const dispatch = useAppDispatch()
  const roadmapNavRef = useRef<HTMLDivElement>(null)

  const animationSpeed = useAppSelector(selectAnimationSpeed)
  const animationContext = useAppSelector(selectAnimationContext)
  const showRoadmapNav = useAppSelector(selectShowRoadmapNav)
  const navPosition = useAppSelector(selectNavPosition)
  const bridgeSection = useAppSelector(selectBridgeSection)
  const footerSection = useAppSelector(selectFooterSection)

  useEffect(() => {
    // On enter animations (entering roadmap bridge)
    if (bridgeSection.events.onEnter && !showRoadmapNav) {
      dispatch(toggleShowRoadmapNav())

      gsap.to(roadmapWrapperRef.current, {
        delay: 0.1,
        duration: animationSpeed * 1,
        ease: 'power2.inOut',
        yPercent: -100,
      })
    }

    // OnLeaveBack Roadmap Bridge
    if (
      roadmapWrapperRef.current &&
      showRoadmapNav &&
      navPosition !== 'bridge' &&
      navPosition !== 'roadmap' &&
      navPosition !== 'footer'
    ) {
      dispatch(toggleShowRoadmapNav())

      gsap.to(roadmapWrapperRef.current, {
        duration: animationSpeed,
        ease: 'power2.inOut',
        yPercent: 0,
      })
    }

    // OnLeave Roadmap Bridge
    if (bridgeSection.events.onLeave && showRoadmapNav) {
      // Hides Roadmap title and text
      gsap.set(roadmapWrapperRef.current, {
        height: 'auto',
        minHeight: 'auto',
        delay: animationSpeed,
      })

      gsap.set(roadmapContentRef.current, {
        display: 'none',
        delay: animationSpeed,
      })

      gsap.to(roadmapContentRef.current, {
        xPercent: -100,
        autoAlpha: 0,
        ease: 'power2.inOut',
        duration: animationSpeed,
      })
    }

    // OnEnterBack Roadmap Bridge
    if (
      navPosition !== 'roadmap' &&
      navPosition !== 'footer' &&
      showRoadmapNav
    ) {
      gsap.set(roadmapWrapperRef.current, {
        height: '100%',
        minHeight: '100vh',
      })

      gsap.set(roadmapContentRef.current, {
        display: 'block',
        height: 'auto',
      })

      gsap.to(roadmapContentRef.current, {
        xPercent: 0,
        autoAlpha: 1,
        ease: 'power2.inOut',
        delay: animationSpeed * 0.5,
        duration: animationSpeed * 0.5,
      })
    }

    // Entering Footer
    if (footerSection.isActive && showRoadmapNav) {
      // Fix zIndex problem on footer
      gsap.set(roadmapWrapperRef.current, {
        delay: animationSpeed,
        height: 0,
        minHeight: 0,
      })
    }

    // Footer onLeaveBack (back to Roadmap)
    if (footerSection.events.onLeaveBack && showRoadmapNav) {
      gsap.set(roadmapWrapperRef.current, {
        height: 'auto',
        minHeight: 'auto',
      })
    }

    // Entering Roadmap from Bridge
    if (
      navPosition === 'roadmap' &&
      !animationContext.transformedRoadmapNav &&
      !animationContext.transformedRoadmapNavIsHided
    ) {
      dispatch(toggleTransformedRoadmapNav())
      gsap.to(roadmapNavRef.current, {
        marginTop: 'auto',
        ease: 'power2.inOut',
        delay: animationSpeed * 0.75,
        duration: animationSpeed * 0.25,
      })
    }

    // TransformedRoadmap should be hided only on footer,
    // this changes it back to normal
    if (
      animationContext.transformedRoadmapNav &&
      animationContext.transformedRoadmapNavIsHided &&
      navPosition !== 'footer'
    ) {
      dispatch(toggleTransformedRoadmapNavIsHided())
      gsap.to(roadmapNavRef.current, {
        yPercent: 0,
        autoAlpha: 1,
        ease: 'power2.inOut',
        delay: animationSpeed * 0.25,
        duration: animationSpeed * 0.5,
      })
    }

    // If "transformedRoadmapNav" is true and user is NOT inside Roadmap or footer,
    // set roadmapNav back to normal
    if (
      navPosition !== 'roadmap' &&
      navPosition !== 'footer' &&
      animationContext.transformedRoadmapNav
    ) {
      dispatch(toggleTransformedRoadmapNav())
      gsap.to(roadmapNavRef.current, {
        marginTop: 0,
        ease: 'power2.inOut',
        delay: animationSpeed * 0.5,
        duration: animationSpeed * 0.5,
      })
    }

    if (
      navPosition === 'footer' &&
      animationContext.transformedRoadmapNav &&
      !animationContext.transformedRoadmapNavIsHided
    ) {
      dispatch(toggleTransformedRoadmapNavIsHided())
      gsap.to(roadmapNavRef.current, {
        yPercent: 100,
        autoAlpha: 0,
        ease: 'power2.inOut',
        duration: animationSpeed * 0.75,
      })
    }
  }, [
    dispatch,
    animationSpeed,
    roadmapWrapperRef,
    roadmapContentRef,
    showRoadmapNav,
    bridgeSection,
    footerSection,
    animationContext,
    navPosition,
  ])

  return (
    <>
      <FullScreen
        sectionRef={roadmapWrapperRef}
        tw="hidden lg:flex flex-col absolute left-1/2 transform top-full -translate-x-1/2 m-auto w-full h-full"
      >
        <Container ref={roadmapContentRef} tw="mx-auto mb-20">
          <NavSpacer />
          <div tw="text-center mt-10">
            <Title>{t`roadmap.title`}</Title>
            <p tw="text-coolGray-300 mt-6 max-w-2xl mx-auto whitespace-pre-line">{t`roadmap.description`}</p>
          </div>
        </Container>
        <div ref={roadmapNavRef} tw="w-full">
          <RoadmapNavItems navigate={navigate} stageRefs={stageRefs} />
        </div>
      </FullScreen>
    </>
  )
}
