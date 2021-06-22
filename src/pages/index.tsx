import { FullScreen } from '@components/UI/FullScreen'
import { Features, Landing, Tokenomics } from '@views/home'
import { useAnimations } from '@views/home/useAnimations'

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
    s0Ref,
    s1Ref,
    s12Ref,
    s2Ref,
    s3Ref,
    s4Ref,
  } = useAnimations()

  return (
    <>
      <div ref={wrapperRef} tw="absolute overflow-hidden w-full h-full">
        <div ref={containerRef} tw="w-full h-full">
          <FullScreen sectionRef={landingRef}>
            <Landing />
          </FullScreen>

          <FullScreen sectionRef={tokenomicsRef}>
            <Tokenomics />
          </FullScreen>

          <FullScreen
            sectionRef={featuresRef}
            tw="bg-green-500 flex items-center justify-center"
          >
            <Features />
          </FullScreen>

          <FullScreen
            data-name="hContainer"
            tw="width[500%] flex flex-row flex-nowrap relative"
            sectionRef={roadmapContainerRef}
          >
            <FullScreen
              data-name="s0"
              sectionRef={s0Ref}
              tw="bg-purple-300 min-width[100vw] w-screen flex items-center justify-center"
            >
              Stage 0
            </FullScreen>
            <FullScreen
              data-name="s1 container"
              tw="bg-pink-400 flex items-center justify-center min-width[200vw] flex-row"
            >
              <FullScreen
                data-name="s1.1"
                sectionRef={s1Ref}
                tw="flex items-center justify-center w-screen"
              >
                STAGE1
              </FullScreen>
              <FullScreen
                data-name="s1.2"
                sectionRef={s12Ref}
                tw="flex items-center justify-center w-screen"
              >
                STAGE1.5
              </FullScreen>
            </FullScreen>
            <FullScreen
              data-name="s2"
              sectionRef={s2Ref}
              tw="bg-green-300 min-width[100vw] w-screen flex items-center justify-center"
              data-tag="stage2"
            >
              Stage 2
            </FullScreen>
            <FullScreen
              data-name="s3"
              sectionRef={s3Ref}
              tw="bg-purple-300 min-width[100vw] w-screen flex items-center justify-center"
              data-tag="stage3"
            >
              Stage 3
            </FullScreen>
            <FullScreen
              data-name="s4"
              sectionRef={s4Ref}
              tw="bg-indigo-400 min-width[100vw] w-screen flex items-center justify-center"
              data-tag="stage4"
            >
              Stage 4
            </FullScreen>
          </FullScreen>
        </div>
        <div
          tw="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-10 mx-auto z-50"
          ref={navRef}
        >
          <div tw="flex items-center justify-center space-x-4">
            <button
              type="button"
              onClick={() => navigate(1)}
              tw="bg-gray-400 font-medium"
            >
              Stage 1
            </button>
            <button
              type="button"
              onClick={() => navigate(3)}
              tw="bg-gray-400 font-medium"
            >
              Stage 2
            </button>
            <button
              type="button"
              onClick={() => navigate(4)}
              tw="bg-gray-400 font-medium"
            >
              Stage 3
            </button>
            <button
              type="button"
              onClick={() => navigate(5)}
              tw="bg-gray-400 font-medium"
            >
              Stage 4
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
