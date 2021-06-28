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
import { theme } from 'twin.macro'
import { HomeFooter } from '../views/home/HomeFooter'
import { NavSpacer } from '@components/Nav/NavSpacer'

export default function Home() {
  const {
    navigate,
    wrapperRef,
    containerRef,
    landingRef,
    featuresRef,
    tokenomicsRef,
    navRef,
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

  return (
    <div
      ref={wrapperRef}
      tw="relative overflow-visible overflow-x-hidden h-auto md:absolute md:overflow-hidden md:h-full w-full"
    >
      <div
        ref={containerRef}
        tw="w-full h-full min-h-screen max-h-screen max-w-full"
      >
        <FullScreen sectionRef={landingRef} tw="flex flex-col">
          <NavSpacer />
          <Landing />
        </FullScreen>

        <FullScreen sectionRef={tokenomicsRef}>
          <Tokenomics />
        </FullScreen>

        <FullScreen sectionRef={featuresRef}>
          <Features />
        </FullScreen>

        <FullScreen
          data-name="hContainer"
          tw="w-full flex-col md:width[420%] flex md:flex-row md:flex-nowrap relative"
          sectionRef={roadmapContainerRef}
        >
          <FullScreen sectionRef={s0Ref} tw="min-width[100vw] w-screen" />

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
            tw="min-width[100vw] w-screen bg-gray-900"
          >
            <HomeFooter />
          </FullScreen>
        </FullScreen>
      </div>

      {/* <RoadmapNav
        navRef={navRef}
        roadmapRef={roadmapRef}
        navigate={navigate}
        stageRefs={[stage1NavRef, stage2NavRef, stage3NavRef]}
      /> */}
    </div>
  )
}
