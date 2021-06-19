// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { FullScreen } from '@components/UI/FullScreen'
import { Features, Landing, Tokenomics } from '@views/home'
// import { useEffect, useRef } from 'react'
import { useAnimations } from '../views/home/useAnimations'

export default function Home() {
  const {
    // isScrolling,
    // parentRef,
    containerRef,
    // activeNav,
    landingRef,
    featuresRef,
    tokenomicsRef,
    roadmapContainerRef,
    // navCheckpointRef,
    // navRef,
    s0Ref,
    s1Ref,
    s12Ref,
    s2Ref,
    s3Ref,
  } = useAnimations()

  return (
    <>
      {/* <FullScreen tw="bg-indigo-200 w-full h-full">1</FullScreen> */}

      <div tw="absolute overflow-hidden w-full h-full z-50">
        <div ref={containerRef} tw="w-full h-full">
          <FullScreen
            sectionRef={landingRef}
            tw="bg-blue-500 flex items-center justify-center"
          >
            <Landing />
          </FullScreen>
          <FullScreen
            sectionRef={featuresRef}
            tw="bg-green-500 flex items-center justify-center"
          >
            <Features />
          </FullScreen>
          <FullScreen
            sectionRef={tokenomicsRef}
            tw="bg-yellow-300 flex items-center justify-center"
          >
            <Tokenomics />
          </FullScreen>

          <FullScreen
            tw="width[500%] flex flex-row flex-nowrap sticky"
            sectionRef={roadmapContainerRef}
          >
            <FullScreen
              sectionRef={s0Ref}
              tw="bg-purple-300 flex items-center justify-center"
            >
              Stage 0
            </FullScreen>
            <FullScreen tw="bg-pink-400 flex items-center justify-center width[200%] flex-row">
              <FullScreen
                sectionRef={s1Ref}
                tw="flex items-center justify-center"
              >
                STAGE1
              </FullScreen>
              <FullScreen
                sectionRef={s12Ref}
                tw="flex items-center justify-center"
              >
                STAGE1.5
              </FullScreen>
            </FullScreen>
            <FullScreen
              sectionRef={s2Ref}
              tw="bg-green-300 min-width[100vw] w-screen flex items-center justify-center"
              data-tag="stage2"
            >
              Stage 2
            </FullScreen>
            <FullScreen
              sectionRef={s3Ref}
              tw="bg-purple-300 min-width[100vw] w-screen flex items-center justify-center"
              data-tag="stage3"
            >
              Stage 3
            </FullScreen>
          </FullScreen>
        </div>
      </div>

      {/* <FullScreen
        sectionRef={parentRef}
        tw="relative bg-black w-full h-full z-30"
      >
        <div>dsadads</div>
      </FullScreen> */}

      {/* <FullScreen
        isHorizontal
        sectionRef={roadmapRef}
        tw="bg-blue-500 flex items-center justify-center sticky"
      >
        roadmap
      </FullScreen> */}

      {/* <FullScreen tw="bg-blue-200 w-full h-full" /> */}
      {/* <FullScreen tw="bg-red-200 w-full h-full" /> */}

      {/* <div
        tw="fixed bottom-4 left-1/2 transform -translate-x-1/2 translate-y-40 mx-auto z-50"
        ref={navRef}
      >
        <div tw="flex items-center justify-center space-x-4">
          <div tw="bg-gray-400 font-medium">Stage 1</div>
          <div tw="bg-gray-400 font-medium">Stage 2</div>
          <div tw="bg-gray-400 font-medium">Stage 3</div>
          <div tw="bg-gray-400 font-medium">Stage 4</div>
        </div>
      </div>
      <FullScreen
        tw="width[400%] flex flex-row flex-nowrap sticky"
        sectionRef={roadmapContainerRef}
      >
        <>
          <div ref={navCheckpointRef} tw="overflow-hidden" />
          <FullScreen
            sectionRef={s0Ref}
            tw="bg-blue-500 min-width[100vw] w-screen flex items-center justify-center relative"
            data-tag="roadmap"
          >
            <div css={[activeNav === 'roadmap' && tw`text-4xl font-bold`]}>
              RoadMap
              {activeNav}
            </div>
          </FullScreen>
          <FullScreen
            sectionRef={s1Ref}
            tw="bg-red-300 min-width[100vw] w-screen flex items-center justify-center"
            data-tag="stage1"
          >
            <div css={[activeNav === 'stage1' && tw`text-4xl font-bold`]}>
              {activeNav}
              Stage 1
            </div>
          </FullScreen>
          <FullScreen
            sectionRef={s2Ref}
            tw="bg-green-300 min-width[100vw] w-screen flex items-center justify-center"
            data-tag="stage2"
          >
            <div css={[activeNav === 'stage2' && tw`text-4xl font-bold`]}>
              {activeNav}
              Stage 2
            </div>
          </FullScreen>
          <FullScreen
            sectionRef={s3Ref}
            tw="bg-purple-300 min-width[100vw] w-screen flex items-center justify-center"
            data-tag="stage3"
          >
            <div css={[activeNav === 'stage3' && tw`text-4xl font-bold`]}>
              {activeNav}
              Stage 3
            </div>
          </FullScreen>
        </>
      </FullScreen> */}
    </>
  )
}
