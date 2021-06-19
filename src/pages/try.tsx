// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { FullScreen } from '@components/UI/FullScreen'
import { Features, Landing, Tokenomics } from '@views/home'
// import { useEffect, useRef } from 'react'
import { useAnimations } from '../views/home/useAnimationsTry'

export default function Test() {
  const {
    // isScrolling,
    // parentRef,
    containerRef,
    // activeNav,
    checkRef,
    landingRef,
    featuresRef,
    tokenomicsRef,
    handleNav,
    navRef,
    hContainerRef,
    s0Ref,
    s1Ref,
    s2Ref,
    s3Ref,
    s4Ref,
  } = useAnimations()

  return (
    <>
      <div className="section">1</div>
      <div className="section">2</div>
      <div className="section">3</div>
      <div className="section">4</div>
    </>
  )

  return (
    <>
      {/* <FullScreen tw="bg-indigo-200 w-full h-full">1</FullScreen> */}

      <div ref={containerRef} tw="w-full h-full">
        <FullScreen
          sectionRef={landingRef}
          tw="bg-red-500 flex items-center justify-center"
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
      </div>

      <div ref={checkRef} />

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

      <div
        tw="fixed bottom-4 left-1/2 transform -translate-x-1/2 mx-auto z-50"
        ref={navRef}
      >
        <div tw="flex items-center justify-center space-x-4">
          <button
            type="button"
            onClick={() => handleNav(1)}
            tw="bg-gray-400 font-medium"
          >
            Stage 1
          </button>
          <button
            type="button"
            onClick={() => handleNav(2)}
            tw="bg-gray-400 font-medium"
          >
            Stage 2
          </button>
          <button
            type="button"
            onClick={() => handleNav(3)}
            tw="bg-gray-400 font-medium"
          >
            Stage 3
          </button>
          <button
            type="button"
            onClick={() => handleNav(4)}
            tw="bg-gray-400 font-medium"
          >
            Stage 4
          </button>
        </div>
      </div>

      <FullScreen
        tw="width[500%] flex flex-row flex-nowrap sticky"
        sectionRef={hContainerRef}
      >
        <>
          <FullScreen
            sectionRef={s0Ref}
            tw="bg-blue-500 min-width[100vw] w-screen flex items-center justify-center relative"
            data-tag="roadmap"
          >
            RoadMap
          </FullScreen>

          <FullScreen
            sectionRef={s1Ref}
            tw="width[200vw] h-full bg-indigo-500 flex flex-row flex-nowrap"
          >
            <FullScreen
              tw="min-width[100vw] flex items-center justify-center"
              data-tag="stage1"
            >
              Stage 1
            </FullScreen>
            <FullScreen
              tw="min-width[100vw] flex items-center justify-center"
              data-tag="stage12"
            >
              Stage 1.5
            </FullScreen>
          </FullScreen>

          <FullScreen
            sectionRef={s2Ref}
            tw="bg-green-300 min-width[100vw] flex items-center justify-center"
            data-tag="stage2"
          >
            Stage 2
          </FullScreen>

          <FullScreen
            sectionRef={s3Ref}
            tw="bg-purple-300 min-width[100vw] flex items-center justify-center"
            data-tag="stage3"
          >
            Stage 3
          </FullScreen>

          <FullScreen
            sectionRef={s4Ref}
            tw="bg-indigo-600 min-width[100vw] flex items-center justify-center"
            data-tag="stage3"
          >
            Stage 4
          </FullScreen>
        </>
      </FullScreen>
    </>
  )
}
