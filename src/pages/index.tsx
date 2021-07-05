import { FullScreen } from '@components/UI/FullScreen'
import { Features, Landing, Tokenomics } from '@views/home'
import { useAnimations } from '@views/home/useAnimations'
import { RoadmapNav } from '@views/home/RoadmapNav'
import { StageFullPage } from '@views/home/StageFullPage'
import stage1BG from '@public/images/stage1.jpg'
import stage2BG from '@public/images/stage2.jpg'
import stage3BG from '@public/images/stage3.jpg'
import stage1Img from '@public/images/stage1_iso.jpg'
import stage2Img from '@public/images/stage2_iso.jpg'
import stage3Img from '@public/images/stage3_iso.jpg'
import tw, { theme } from 'twin.macro'
import { HomeFooter } from '../views/home/HomeFooter'
import { NavSpacer } from '@components/Nav/NavSpacer'
import { MobileRoadmap } from '../views/home/MobileRoadmap'
import { up } from 'styled-breakpoints'
import { Global, css } from '@emotion/react'
import { useEffect } from 'react'
import { Nav } from '@components/Nav'

const styles = css`
  body.home {
    ${tw`overflow-visible lg:overflow-hidden`}

    ${up('lg')} {
      -webkit-overflow-scrolling: auto;
      overscroll-behavior-y: contain;
    }
  }
`

export default function Home() {
  const {
    goToStart,
    navigate,
    wrapperRef,
    containerRef,
    landingRef,
    featuresRef,
    tokenomicsRef,
    roadmapNavWrapperRef,
    roadmapContainerRef,
    roadmapRef,
    s0Ref,
    s1Ref,
    s2Ref,
    s3Ref,
    footerRef,
    stage1NavRef,
    stage2NavRef,
    stage3NavRef,
  } = useAnimations()

  useEffect(() => {
    document.querySelector('body')?.classList.add('home')

    return () => {
      document.querySelector('body')?.classList.remove('home')
    }
  }, [])

  return (
    <>
      <Nav />

      <Global styles={styles} />
      <div
        ref={wrapperRef}
        tw="relative overflow-visible overflow-x-hidden h-auto lg:absolute lg:overflow-hidden lg:h-full w-full"
      >
        <div
          ref={containerRef}
          tw="w-full h-auto min-h-0 lg:min-h-screen max-w-full"
        >
          <FullScreen
            sectionRef={landingRef}
            tw="min-h-0 lg:min-h-screen flex flex-col"
          >
            <NavSpacer />
            <Landing />
          </FullScreen>
          <FullScreen
            sectionRef={tokenomicsRef}
            tw="lg:min-h-screen lg:max-h-screen overflow-hidden lg:overflow-visible"
          >
            <Tokenomics />
          </FullScreen>
          <FullScreen
            sectionRef={featuresRef}
            tw="lg:min-h-screen lg:max-h-screen"
          >
            <Features />
          </FullScreen>
          <FullScreen
            data-name="hContainer"
            tw="mt-20 lg:mt-0 w-full flex-col lg:width[400%] flex lg:flex-row lg:flex-nowrap relative"
            sectionRef={roadmapContainerRef}
          >
            <FullScreen
              sectionRef={s0Ref}
              tw="min-h-0 lg:min-h-screen min-width[100vw] w-screen"
            >
              <MobileRoadmap />
            </FullScreen>
            <div tw="mt-20 lg:hidden" />
            <StageFullPage
              innerRef={s1Ref}
              color={theme`colors.blue.300`}
              stageKey="stage1"
              image={stage1Img}
              bgImage={stage1BG}
            />
            <StageFullPage
              innerRef={s2Ref}
              color={theme`colors.purple.300`}
              stageKey="stage2"
              image={stage2Img}
              bgImage={stage2BG}
            />
            <StageFullPage
              innerRef={s3Ref}
              color={theme`colors.red.500`}
              stageKey="stage3"
              image={stage3Img}
              bgImage={stage3BG}
              isLocked
            />
            <FullScreen
              sectionRef={footerRef}
              tw="min-width[100vw] lg:max-h-screen w-screen bg-gray-900"
            >
              <HomeFooter goToStart={goToStart} />
            </FullScreen>
          </FullScreen>
        </div>
        <RoadmapNav
          roadmapWrapperRef={roadmapNavWrapperRef}
          roadmapContentRef={roadmapRef}
          navigate={navigate}
          stageRefs={[stage1NavRef, stage2NavRef, stage3NavRef]}
        />
      </div>
    </>
  )
}
