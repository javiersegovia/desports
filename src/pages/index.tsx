import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { FullScreen } from '@components/UI/FullScreen'
import { Features, Landing, Roadmap, Tokenomics } from '@views/home'
import { useEffect, useRef } from 'react'

let flag = false

export const scrollToSectionY = (i: number) => {
  console.log({ flag })
  if (flag) return

  gsap.to(window, {
    scrollTo: { y: i * innerHeight, autoKill: false },
    duration: 0.65,
    onStart: () => {
      flag = true
    },
    onComplete: () => {
      flag = false
    },
  })

  // if (anim) {
  //   anim.restart()
  // }
}

// export const scrollToSectionX = (i: number) => {
//   gsap.to(window, {
//     scrollTo: { x: i * innerWidth, autoKill: false },
//     duration: 1,
//   })

//   // if (anim) {
//   //   anim.restart()
//   // }
// }

export default function Home() {
  const landingRef = useRef<HTMLDivElement>(null)
  const featuresRef = useRef<HTMLDivElement>(null)
  const tokenomicsRef = useRef<HTMLDivElement>(null)
  const roadmapRef = useRef<HTMLDivElement>(null)

  const r1Ref = useRef<HTMLDivElement>(null)
  const r2Ref = useRef<HTMLDivElement>(null)
  const r3Ref = useRef<HTMLDivElement>(null)

  const hWrapperRef = useRef<HTMLDivElement>(null)
  const hContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const verticalEls = [
      landingRef.current,
      featuresRef.current,
      tokenomicsRef.current,
      roadmapRef.current,
      hContainerRef.current,
    ]

    verticalEls.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        invalidateOnRefresh: true,
        onEnter: () => scrollToSectionY(i),
      })

      ScrollTrigger.create({
        trigger: section,
        start: 'bottom bottom',
        invalidateOnRefresh: true,
        onEnterBack: () => scrollToSectionY(i),
      })
    })

    const horizontalEls = [r1Ref.current, r2Ref.current, r3Ref.current]
    const hContainer = hContainerRef.current as HTMLDivElement

    const els = gsap.utils.toArray(horizontalEls)

    gsap.to(els, {
      xPercent: -100 * (els.length - 1),
      duration: 0.2,
      ease: 'none',
      scrollTrigger: {
        trigger: hContainer,
        pin: true,
        start: 'top',
        markers: true,
        scrub: 1,
        end: () => '+=' + hContainer.offsetWidth / (els.length - 1) / 3.5,
      },
    })

    // gsap.to(hContainer, {
    //   x: () =>
    //     -(hContainer.scrollWidth - document.documentElement.clientWidth) + 'px',
    //   ease: 'none',
    //   scrollTrigger: {
    //     trigger: hContainer,
    //     invalidateOnRefresh: true,
    //     pin: true,
    //     scrub: 1,
    //     end: () => '+=' + hContainer.offsetWidth,
    //   },
    // })
  }, [])

  return (
    <>
      <FullScreen
        sectionRef={landingRef}
        tw="bg-red-500 flex items-center justify-center sticky"
      >
        <Landing />
      </FullScreen>

      <FullScreen
        sectionRef={featuresRef}
        tw="bg-green-500 flex items-center justify-center sticky"
      >
        <Features />
      </FullScreen>

      <FullScreen
        sectionRef={tokenomicsRef}
        tw="bg-yellow-300 flex items-center justify-center sticky"
      >
        <Tokenomics />
      </FullScreen>

      <FullScreen
        isHorizontal
        sectionRef={roadmapRef}
        tw="bg-blue-500 flex items-center justify-center sticky"
      >
        roadmap
      </FullScreen>

      <FullScreen
        tw="width[400%] flex flex-row flex-nowrap sticky"
        sectionRef={hContainerRef}
      >
        <>
          <FullScreen
            sectionRef={r1Ref}
            tw="bg-red-300 min-width[100vw] w-screen flex items-center justify-center"
          >
            dasdasdas
          </FullScreen>
          <FullScreen
            sectionRef={r2Ref}
            tw="bg-green-300 min-width[100vw] w-screen flex items-center justify-center"
          >
            lalo
          </FullScreen>
          <FullScreen
            sectionRef={r3Ref}
            tw="bg-purple-300 min-width[100vw] w-screen flex items-center justify-center"
          >
            threee yes!!!
          </FullScreen>
        </>
      </FullScreen>
    </>
  )
}
