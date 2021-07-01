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
  toggleTransformedRoadmapNav,
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
  const state = useAppSelector(selectAnimation)
  const roadmapNavRef = useRef<HTMLDivElement>(null)

  const {
    context: { showRoadmapNav, transformedRoadmapNav },
  } = state

  useEffect(() => {
    // On enter animations (entering roadmap bridge)
    if (state.events.onEnter?.name === 'bridge' && !showRoadmapNav) {
      dispatch(toggleShowRoadmapNav())

      gsap.to(roadmapWrapperRef.current, {
        delay: 0.1,
        duration: state.animationSpeed * 1,
        ease: 'power2.inOut',
        yPercent: -100,
      })
    }

    // OnLeaveBack Roadmap Bridge
    if (
      roadmapWrapperRef.current &&
      showRoadmapNav &&
      state.navPosition !== 'bridge' &&
      state.navPosition !== 'roadmap' &&
      state.navPosition !== 'footer'
    ) {
      dispatch(toggleShowRoadmapNav())
      // dispatch(hideRoadmapNav({ element: roadmapWrapperRef.current }))

      gsap.to(roadmapWrapperRef.current, {
        duration: state.animationSpeed,
        ease: 'power2.inOut',
        yPercent: 0,
      })
    }

    // OnLeave Roadmap Bridge
    if (state.events.onLeave?.name === 'bridge' && showRoadmapNav) {
      // Hides Roadmap title and text
      gsap.set(roadmapWrapperRef.current, {
        height: 'auto',
        minHeight: 'auto',
        delay: state.animationSpeed,
      })

      gsap.set(roadmapContentRef.current, {
        display: 'none',
        delay: state.animationSpeed,
      })

      gsap.to(roadmapContentRef.current, {
        xPercent: -100,
        autoAlpha: 0,
        ease: 'power2.inOut',
        duration: state.animationSpeed,
      })
    }

    // OnEnterBack Roadmap Bridge
    if (state.events.onEnterBack?.name === 'bridge' && showRoadmapNav) {
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
        // !!!
        delay: state.animationSpeed * 0.5,
        duration: state.animationSpeed * 0.5,
      })
    }

    // Entering Footer
    if (state.activeSection?.name === 'footer' && showRoadmapNav) {
      // Fix zIndex problem on footer
      gsap.set(roadmapWrapperRef.current, {
        delay: state.animationSpeed,
        height: 0,
        minHeight: 0,
      })
    }

    // Leaving Footer
    if (state.oldSection?.name === 'footer' && showRoadmapNav) {
      gsap.set(roadmapWrapperRef.current, {
        height: 'auto',
        minHeight: 'auto',
      })
    }

    // Entering Roadmap
    if (
      state.navPosition === 'roadmap' &&
      !state.context.transformedRoadmapNav
    ) {
      dispatch(toggleTransformedRoadmapNav())

      if (state.oldSection?.name === 'footer') {
        gsap.to(roadmapNavRef.current, {
          yPercent: 0,
          autoAlpha: 1,
          ease: 'power2.inOut',
          delay: state.animationSpeed * 0.25,
          duration: state.animationSpeed * 0.5,
        })
      } else {
        gsap.to(roadmapNavRef.current, {
          marginTop: 'auto',
          ease: 'power2.inOut',
          delay: state.animationSpeed * 0.75,
          duration: state.animationSpeed * 0.25,
        })
      }
    }

    // Leaving Roadmap
    if (
      state.navPosition !== 'roadmap' &&
      state.context.transformedRoadmapNav
    ) {
      dispatch(toggleTransformedRoadmapNav())

      if (state.navPosition === 'footer') {
        gsap.to(roadmapNavRef.current, {
          yPercent: 100,
          autoAlpha: 0,
          ease: 'power2.inOut',
          duration: state.animationSpeed * 0.75,
        })
      } else {
        gsap.to(roadmapNavRef.current, {
          marginTop: 0,
          ease: 'power2.inOut',
          delay: state.animationSpeed * 0.5,
          duration: state.animationSpeed * 0.5,
        })
      }
    }
  }, [state, dispatch, roadmapWrapperRef, roadmapContentRef, showRoadmapNav])

  return (
    <>
      <FullScreen
        sectionRef={roadmapWrapperRef}
        tw="hidden lg:flex flex-col absolute left-1/2 transform top-full -translate-x-1/2 m-auto w-full h-full"
      >
        <Container ref={roadmapContentRef} tw="mx-auto mb-20">
          <NavSpacer />
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
