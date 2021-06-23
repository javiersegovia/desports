import { FullScreen } from '@components/UI/FullScreen'
import { Features, Landing, Roadmap, Tokenomics } from '@views/home'
import { useAnimations } from '@views/home/useAnimations'
import stage1Img from '@public/images/stage1_iso.jpg'
import stage2Img from '@public/images/stage2_iso.jpg'
import stage3Img from '@public/images/stage3_iso.jpg'
import stage4Img from '@public/images/stage4_iso.jpg'
import { StageItem } from '../views/home/StageItem'
import { theme } from 'twin.macro'
import useTranslation from 'next-translate/useTranslation'
import { Container } from '@components/UI/Container'
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
    s0Ref,
    s1Ref,
    s12Ref,
    s2Ref,
    s3Ref,
    s4Ref,
  } = useAnimations()

  const { t } = useTranslation('home')

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

          <FullScreen sectionRef={featuresRef}>
            <Features />
          </FullScreen>

          <FullScreen
            data-name="hContainer"
            tw="width[500%] flex flex-row flex-nowrap relative"
            sectionRef={roadmapContainerRef}
          >
            <FullScreen
              sectionRef={s0Ref}
              tw="min-width[100vw] w-screen"
            ></FullScreen>
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

        <FullScreen
          sectionRef={navRef}
          tw="absolute top-0 left-1/2 transform -translate-x-1/2 m-auto z-50 w-full h-full"
        >
          <NavSpacer />
          <Container tw="mx-auto">
            {/* todo: move roadmap to left when we leave the Stage 0 */}
            <Roadmap />
            <div tw="mt-20 flex space-x-8 items-center flex-1 flex-basis[25%] justify-center">
              <StageItem
                tw="flex-1"
                item={t('roadmap.stage1', null, { returnObjects: true })}
                image={stage1Img}
                number={1}
                color={theme`colors.blue.300`}
                onClick={() => navigate(1)}
              />
              <StageItem
                tw="flex-1"
                item={t('roadmap.stage2', null, { returnObjects: true })}
                image={stage2Img}
                number={2}
                color={theme`colors.purple.400`}
                onClick={() => navigate(3)}
              />
              <StageItem
                tw="flex-1"
                item={t('roadmap.stage3', null, { returnObjects: true })}
                image={stage3Img}
                number={3}
                color={theme`colors.red.600`}
                onClick={() => navigate(4)}
                isLocked
              />
              <StageItem
                tw="flex-1"
                item={t('roadmap.stage4', null, { returnObjects: true })}
                image={stage4Img}
                number={4}
                color={theme`colors.yellow.400`}
                onClick={() => navigate(5)}
                isLocked
              />
            </div>
          </Container>
        </FullScreen>
        {/* <div tw="flex items-center justify-center space-x-4">
            <button
              type="button"
              tw="bg-gray-400 font-medium"
            >
              Stage 1
            </button>
            <button
              type="button"
              tw="bg-gray-400 font-medium"
            >
              Stage 2
            </button>
            <button
              type="button"
              tw="bg-gray-400 font-medium"
            >
              Stage 3
            </button>
            <button
              type="button"
              tw="bg-gray-400 font-medium"
            >
              Stage 4
            </button>
          </div>
         */}
      </div>
    </>
  )
}
