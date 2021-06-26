import { FullScreen } from '@components/UI/FullScreen'
import { Features, Landing, Tokenomics } from '@views/home'
import { useAnimations } from '@views/home/useAnimations'
import { RoadmapNav } from '@views/home/RoadmapNav'
import { StageFullPage } from '@views/home/StageFullPage'

import stage1Img from '@public/images/stage1.jpg'
import stage2Img from '@public/images/stage2.jpg'
import stage3Img from '@public/images/stage3.jpg'
import { theme } from 'twin.macro'

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
    stage1NavRef,
    stage2NavRef,
    stage3NavRef,
    stage4NavRef,
  } = useAnimations()

  return (
    <div ref={wrapperRef} tw="absolute overflow-hidden w-full h-full">
      <div ref={containerRef} tw="w-full h-full">
        <FullScreen sectionRef={landingRef}>
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
          tw="width[400%] flex flex-row flex-nowrap relative"
          sectionRef={roadmapContainerRef}
        >
          <FullScreen sectionRef={s0Ref} tw="min-width[100vw] w-screen" />

          <StageFullPage
            innerRef={s1Ref}
            color={theme`colors.blue.300`}
            stageKey="stage1"
            image={stage1Img}
          />
          <StageFullPage
            innerRef={s2Ref}
            color={theme`colors.purple.300`}
            stageKey="stage2"
            image={stage2Img}
          />
          <StageFullPage
            innerRef={s3Ref}
            color={theme`colors.red.500`}
            stageKey="stage3"
            image={stage3Img}
          />

          {/* <FullScreen
            sectionRef={s2Ref}
            tw="min-width[100vw] w-screen flex items-center justify-center"
            style={{
              background: 'url(/images/stage2.jpg)',
            }}
          >
            Stage 2
          </FullScreen>
          <FullScreen
            sectionRef={s3Ref}
            tw="min-width[100vw] w-screen flex items-center justify-center"
            style={{
              background: 'url(/images/stage3.jpg)',
            }}
          >
            Stage 3
          </FullScreen> */}
          {/* <FullScreen
            sectionRef={s4Ref}
            tw="min-width[100vw] w-screen flex items-center justify-center"
            style={{
              background: 'url(/images/stage4.jpg)',
            }}
          >
            Stage 4
          </FullScreen> */}
        </FullScreen>
      </div>

      <RoadmapNav
        navRef={navRef}
        roadmapRef={roadmapRef}
        navigate={navigate}
        stageRefs={[stage1NavRef, stage2NavRef, stage3NavRef, stage4NavRef]}
      />
    </div>
  )
}
