import { RefObject, useEffect, useRef } from 'react'
import { NavSpacer } from '@components/Nav/NavSpacer'
import { Container } from '@components/UI/Container'
import { FullScreen } from '@components/UI/FullScreen'
import { Title } from '@components/UI/Title'
import useTranslation from 'next-translate/useTranslation'
import { RoadmapNavItems, RoadmapNavItemsProps } from './RoadmapNavItems'
import { useAppDispatch, useAppSelector } from '@lib/redux/hooks'
import {
  selectAnimation,
  toggleShowRoadmapNav,
  toggleShowNavbar,
  toggleTransformedRoadmapNav,
} from '@lib/redux/slices/navSlice'
import { gsap } from 'gsap'

interface RoadmapProps {
  navRef: RefObject<HTMLDivElement>
  roadmapRef: RefObject<HTMLDivElement>
  stageRefs: RoadmapNavItemsProps['stageRefs']
  navigate: RoadmapNavItemsProps['navigate']
}

export const RoadmapNav = ({
  roadmapRef,
  navRef,
  navigate,
  stageRefs,
}: RoadmapProps) => {
  const { t } = useTranslation('home')
  const dispatch = useAppDispatch()
  const state = useAppSelector(selectAnimation)
  const tl = useRef(gsap.timeline())
  const roadmapNavRef = useRef<HTMLDivElement>(null)
  // const uiState = useRef({
  //   transformedRoadmapNav: false,
  //   hidedRoadmap: false,
  // })

  const {
    context: { showRoadmapNav, transformedRoadmapNav },
  } = state

  useEffect(() => {
    const timeline = tl.current

    // On enter animations (entering roadmap bridge)
    if (state.events.onEnter?.name === 'bridge' && !showRoadmapNav) {
      dispatch(toggleShowRoadmapNav())

      timeline.to(navRef.current, {
        delay: 0,
        duration: state.animationSpeed,
        ease: 'power2.inOut',
        yPercent: -100,
      })
    }

    // OnLeaveBack Roadmap Bridge

    if (state.events.onLeaveBack?.name === 'bridge' && showRoadmapNav) {
      dispatch(toggleShowRoadmapNav())

      timeline.to(navRef.current, {
        delay: 0,
        duration: state.animationSpeed * 0.5,
        ease: 'power2.inOut',
        yPercent: 0,
      })
    }

    // OnLeave Roadmap Bridge
    if (state.events.onLeave?.name === 'bridge' && showRoadmapNav) {
      gsap.to(roadmapRef.current, {
        xPercent: -100,
        autoAlpha: 0,
        ease: 'power2.inOut',

        duration: state.animationSpeed,
      })
    }

    // OnEnterBack Roadmap Bridge
    if (state.events.onEnterBack?.name === 'bridge' && showRoadmapNav) {
      gsap.to(roadmapRef.current, {
        xPercent: 0,
        autoAlpha: 1,
        ease: 'power2.inOut',
        // delay: state.animationSpeed * 0.5,
        duration: state.animationSpeed,
      })
    }

    // Entering Roadmap
    if (
      state.navPosition === 'roadmap' &&
      !state.context.transformedRoadmapNav
    ) {
      dispatch((d) => {
        d(toggleTransformedRoadmapNav())
        d(toggleShowNavbar())
      })

      timeline.to(roadmapNavRef.current, {
        marginTop: 'auto',
        ease: 'power2.inOut',
        delay: state.animationSpeed * 0.75,
        duration: state.animationSpeed * 0.25,
      })
    }

    // Leaving Roadmap
    if (
      state.navPosition !== 'roadmap' &&
      state.context.transformedRoadmapNav
    ) {
      dispatch((d) => {
        d(toggleTransformedRoadmapNav())
        d(toggleShowNavbar())
      })

      timeline.to(roadmapNavRef.current, {
        marginTop: 0,
        ease: 'power2.inOut',
        delay: state.animationSpeed * 0.5,
        duration: state.animationSpeed * 0.5,
      })
    }
  }, [state, dispatch, navRef, roadmapRef, showRoadmapNav])

  return (
    <>
      <FullScreen
        sectionRef={navRef}
        tw="absolute left-1/2 transform top-full -translate-x-1/2 m-auto w-full h-full"
      >
        <NavSpacer />
        <Container ref={roadmapRef} tw="mx-auto">
          {/* todo: move roadmap to left when we leave the Stage 0 */}
          <div tw="text-center mt-10">
            <Title>{t`roadmap.title`}</Title>
            <p tw="text-coolGray-300 mt-6 max-w-2xl mx-auto whitespace-pre-line">{t`roadmap.description`}</p>
          </div>
        </Container>
        <div ref={roadmapNavRef} tw="w-full">
          <RoadmapNavItems
            navigate={navigate}
            stageRefs={stageRefs}
            shouldMorph={transformedRoadmapNav}
          />
        </div>
      </FullScreen>
    </>
  )
}
